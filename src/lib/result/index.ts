export type OkType<T> = { ok: T };
export type ErrType<E> = { err: E };

export type Result<T, E> = OkType<T> | ErrType<E>;

export const Ok = <T, E>(ok: T): Result<T, E> => ({ ok });
export const Err = <T, E>(err: E): Result<T, E> => ({ err });

export const isOk = <T, E>(result: Result<T, E>): result is OkType<T> =>
  'ok' in result;

export const isErr = <T, E>(result: Result<T, E>): result is ErrType<E> =>
  'err' in result;

export const mapResults = <T, E, U>(
  arr: T[],
  fn: (el: T) => Result<U, E>
): Result<U[], E> => {
  const oks = [];
  for (const el of arr) {
    const val = fn(el);
    if ('err' in val) return val;
    oks.push(val.ok);
  }
  return Ok(oks);
};

export const flatMapResults = <T, E, U>(
  arr: T[],
  fn: (el: T) => Result<U[], E>
): Result<U[], E> => {
  const oks = [];
  for (const el of arr) {
    const val = fn(el);
    if ('err' in val) return val;
    oks.push(val.ok);
  }
  return Ok(oks.flat());
};

export const mapOk = <T, E, T2>(
  result: Result<T, E>,
  fn: (ok: T) => T2
): Result<T2, E> => {
  if (isOk(result)) return Ok(fn(result.ok));
  return result;
};

export const mapErr = <T, E, E2>(
  result: Result<T, E>,
  fn: (err: E) => E2
): Result<T, E2> => {
  if (isErr(result)) return Err(fn(result.err));
  return result;
};
