type OkResult<T> = Result<T, never>;
type ErrResult<E> = Result<never, E>;

export class Result<T, E> {
  constructor(ok: T, err: never, _isErr: false);
  constructor(ok: never, err: E, _isErr: true);
  constructor(readonly ok: T | never, readonly err: E | never, private _isErr: boolean) {}

  isOk(): this is OkResult<T> {
    return !this._isErr
  }

  isErr(): this is ErrResult<E> {
    return this._isErr;
  }

  map<U>(fn: (val: T) => U): Result<U, E> {
    if (this.isOk()) return Ok(fn(this.ok));
    return Err(this.err);
  }

  /**
   * Returns the inner value without checking if the value is None.
   * **Only do this if you already checked the value was Some<T>**
   */
  unsafeUnwrap(): T {
    return this.ok;
  }

  /**
   * @throws Error if called on {@link None}
   */
  unwrap(): T {
    if (this.isErr())
      throw new Error(`Attempted to unwrap an Err value: ${this.err}`);
    return this.ok;
  }

  unwrapOr<U>(this: Result<T, E> & { _isErr: true }, fallback: U): NoInfer<U>;
  unwrapOr(this: Result<T, E> & { _isErr: false }, fallback: T): T;
  unwrapOr(fallback: T): T {
    if (this.isErr()) return fallback;
    return this.ok;
  }

  unwrapOrElse<U>(
    this: Result<T, E> & { _isErr: true },
    fallback: () => U
  ): NoInfer<U>;
  unwrapOrElse(this: Result<T, E> & { _isErr: false }, fallback: () => T): T;
  unwrapOrElse(fallback: () => T): T {
    if (this.isErr()) return fallback();
    return this.ok;
  }
}

export const Ok = <T, E>(ok: T): Result<T, E> =>
  new Result(ok, undefined as never, false);
export const Err = <T, E>(err: E): Result<T, E> =>
  new Result(undefined as never, err, true);

// -------------------- Pipeable versions of option functions --------------------
export const unwrap = <T, E>(opt: Result<T, E>): T => {
  return opt.unwrap() as T;
};

export const unwrapOr = <T, E>(fallback: T): ((opt: Result<T, E>) => T) => {
  return (opt) => (opt.isOk() ? opt.unsafeUnwrap() : fallback);
};

export const unwrapOrElse = <T, E>(
  fallback: () => T
): ((opt: Result<T, E>) => T) => {
  return (opt) => (opt.isOk() ? opt.unsafeUnwrap() : fallback());
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
    if (val.isErr()) return val as Result<U[], E>;
    oks.push(val.unsafeUnwrap());
  }
  return Ok(oks);
};

export const flatMapResults = <T, E, U>(
  arr: T[],
  fn: (el: T) => Result<U[], E>
): Result<U[], E> => {
  return mapResults(arr, fn).map((r) => r.flat());
};

// export const map = <T, E, T2>(
//   result: Result<T, E>,
//   fn: (ok: T) => T2
// ): Result<T2, E> => {
//   if (result.isOk()) return Ok(fn(result.unsafeUnwrap()));
//   return result;
// };

// export const mapErr = <T, E, E2>(
//   result: Result<T, E>,
//   fn: (err: E) => E2
// ): Result<T, E2> => {
//   if (isErr(result)) return Err(fn(result.err));
//   return result;
// };
