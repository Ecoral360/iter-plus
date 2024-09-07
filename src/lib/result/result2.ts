import { None, Option, Some } from '../option';

type OkResult<T> = { __ok: T };
type ErrResult<E> = { __err: E };

type ResultVal<T, E> = OkResult<T> | ErrResult<E>;

type OptionVal<O> = O extends Option<infer T> ? T : never;

type FlattenResult<R, E> = R extends Result<infer T, infer F>
  ? F extends E
    ? Result<T, F>
    : never
  : never;

interface ResultImpl<T, E> {
  isOk(): this is OkResult<T>;
  isOkAnd(pred: (ok: T) => boolean): boolean;

  isErr(): this is ErrResult<E>;
  isErrAnd(pred: (err: E) => boolean): boolean;

  ok(): Option<T>;
  err(): Option<E>;

  unwrap(): T;
  unwrapErr(): E;
  unwrapOr(fallbackValue: T): T;
  unwrapOrElse(fallbackFn: (err: E) => T): T;
  unwrapUnchecked(): T;
  unwrapErrUnchecked(): E;

  map<U>(fn: (ok: T) => U): Result<U, E>;
  mapOr<U>(fallbackValue: U, fn: (ok: T) => U): U;
  mapOrElse<U>(fallbackFn: (err: E) => U, fn: (ok: T) => U): U;
  mapErr<F>(fn: (err: E) => F): Result<T, F>;

  inspect(fn: (ok: T) => void): Result<T, E>;
  inspectErr(fn: (err: E) => void): Result<T, E>;

  or<F>(res: Result<T, F>): Result<T, F>;
  orElse<F>(fn: (err: E) => Result<T, F>): Result<T, F>;

  and<U>(res: Result<U, E>): Result<U, E>;
  andThen<U>(fn: (ok: T) => Result<U, E>): Result<U, E>;

  into<F>(this: OkResult<T>): Result<T, F>;
  intoErr<U>(this: ErrResult<E>): Result<U, E>;

  transpose(
    this: Result<Option<OptionVal<T>>, E>
  ): Option<Result<OptionVal<T>, E>>;

  flatten(this: Result<FlattenResult<T, E>, E>): FlattenResult<T, E>;
}

export type Result<T, E> =
  | (OkResult<T> & ResultImpl<T, E>)
  | (ErrResult<E> & ResultImpl<T, E>);

function _isOk<T, E>(val: ResultVal<T, E>): val is OkResult<T> {
  return '__ok' in val;
}
function _isErr<T, E>(val: ResultVal<T, E>): val is ErrResult<E> {
  return '__err' in val;
}

function _newResult<T, E>(val: ResultVal<T, E>): Result<T, E> {
  const result = class implements ResultImpl<T, E> {
    isOk(): this is OkResult<T> {
      return _isOk(val);
    }
    isOkAnd(pred: (ok: T) => boolean): boolean {
      return _isOk(val) && pred(val.__ok);
    }
    isErr(): this is ErrResult<E> {
      return _isErr(val);
    }
    isErrAnd(pred: (err: E) => boolean): boolean {
      return _isErr(val) && pred(val.__err);
    }

    ok(): Option<T> {
      return _isOk(val) ? Some(val.__ok) : None();
    }
    err(): Option<E> {
      return _isErr(val) ? Some(val.__err) : None();
    }

    map<U>(fn: (ok: T) => U): Result<U, E> {
      if (_isOk(val)) return Ok(fn(val.__ok));
      return this as unknown as Result<U, E>;
    }
    mapOr<U>(fallbackValue: U, fn: (ok: T) => U): U {
      if (_isOk(val)) return fn(val.__ok);
      return fallbackValue;
    }
    mapOrElse<U>(fallbackFn: (err: E) => U, fn: (ok: T) => U): U {
      if (_isOk(val)) return fn(val.__ok);
      return fallbackFn(val.__err);
    }
    mapErr<F>(fn: (err: E) => F): Result<T, F> {
      if (_isErr(val)) return Err(fn(val.__err));
      return this as unknown as Result<T, F>;
    }

    inspect(fn: (ok: T) => void): Result<T, E> {
      if (_isOk(val)) void fn(val.__ok);
      return this as unknown as Result<T, E>;
    }
    inspectErr(fn: (err: E) => void): Result<T, E> {
      if (_isErr(val)) void fn(val.__err);
      return this as unknown as Result<T, E>;
    }

    unwrap(): T {
      if (_isOk(val)) return val.__ok;
      throw new Error('Called `unwrap()` on an `Err` value.');
    }
    unwrapOr(fallbackValue: T): T {
      if (_isOk(val)) return val.__ok;
      return fallbackValue;
    }
    unwrapOrElse(fallbackFn: (err: E) => T): T {
      if (_isOk(val)) return val.__ok;
      return fallbackFn(val.__err);
    }
    unwrapErr(): E {
      if (_isErr(val)) return val.__err;
      throw new Error('Called `unwrapErr()` on an `Ok` value.');
    }
    unwrapUnchecked(): T {
      return (val as OkResult<T>).__ok;
    }
    unwrapErrUnchecked(): E {
      return (val as ErrResult<E>).__err;
    }

    and<U>(res: Result<U, E>): Result<U, E> {
      if (_isOk(val)) return res;
      return this as unknown as Result<U, E>;
    }
    andThen<U>(fn: (ok: T) => Result<U, E>): Result<U, E> {
      if (_isOk(val)) return fn(val.__ok);
      return this as unknown as Result<U, E>;
    }
    or<F>(res: Result<T, F>): Result<T, F> {
      if (_isErr(val)) return res;
      return this as unknown as Result<T, F>;
    }
    orElse<F>(fn: (err: E) => Result<T, F>): Result<T, F> {
      if (_isErr(val)) return fn(val.__err);
      return this as unknown as Result<T, F>;
    }

    into<F>(this: OkResult<T>): Result<T, F> {
      return this as unknown as Result<T, F>;
    }
    intoErr<U>(this: ErrResult<E>): Result<U, E> {
      return this as unknown as Result<U, E>;
    }

    transpose(
      this: Result<Option<OptionVal<T>>, E>
    ): Option<Result<OptionVal<T>, E>> {
      if (_isErr(val)) return Some(this as unknown as Result<OptionVal<T>, E>);
      return (val.__ok as Option<OptionVal<T>>).map((v) => Ok(v));
    }

    flatten(this: Result<FlattenResult<T, E>, E>): FlattenResult<T, E> {
      if (_isOk(val)) return val.__ok as unknown as FlattenResult<T, E>;
      return this as unknown as FlattenResult<T, E>;
    }
  };

  return new result() as unknown as Result<T, E>;
}

export const Ok = <T, E>(ok: T): Result<T, E> => _newResult({ __ok: ok });
export const Err = <T, E>(err: E): Result<T, E> => _newResult({ __err: err });

// -------------------- Pipeable versions of resion functions --------------------
export const unwrap = <T, E>(res: Result<T, E>): T => {
  return res.unwrap() as T;
};

export const unwrapOr = <T, E>(fallback: T): ((res: Result<T, E>) => T) => {
  return (res) => (res.isOk() ? res.unwrapUnchecked() : fallback);
};

export const unwrapOrElse = <T, E>(
  fallback: () => T
): ((res: Result<T, E>) => T) => {
  return (res) => (res.isOk() ? res.unwrapUnchecked() : fallback());
};

export const isOk = <T, E>(result: Result<T, E>) => result.isOk();

export const isErr = <T, E>(result: Result<T, E>) => result.isErr();

export const mapResults = <T, E, U>(
  arr: T[],
  fn: (el: T) => Result<U, E>
): Result<U[], E> => {
  const oks = [];
  for (const el of arr) {
    const val = fn(el);
    if (val.isErr()) return val.intoErr();
    oks.push(val.unwrapUnchecked());
  }
  return Ok(oks);
};

export const flatMapResults = <T, E, U>(
  arr: T[],
  fn: (el: T) => Result<U[], E>
): Result<U[], E> => {
  return mapResults(arr, fn).map((r) => r.flat());
};

export const map = <T, E, U>(
  result: Result<T, E>,
  fn: (ok: T) => U
): Result<U, E> => {
  if (result.isOk()) return Ok(fn(result.unwrapUnchecked()));
  return result.intoErr();
};

// export const mapErr = <T, E, E2>(
//   result: Result<T, E>,
//   fn: (err: E) => E2
// ): Result<T, E2> => {
//   if (isErr(result)) return Err(fn(result.err));
//   return result;
// };
