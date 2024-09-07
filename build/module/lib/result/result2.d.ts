import { Option } from '../option';
type OkResult<T> = {
    __ok: T;
};
type ErrResult<E> = {
    __err: E;
};
type OptionVal<O> = O extends Option<infer T> ? T : never;
type FlattenResult<R, E> = R extends Result<infer T, infer F> ? F extends E ? Result<T, F> : never : never;
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
    transpose(this: Result<Option<OptionVal<T>>, E>): Option<Result<OptionVal<T>, E>>;
    flatten(this: Result<FlattenResult<T, E>, E>): FlattenResult<T, E>;
}
export type Result<T, E> = (OkResult<T> & ResultImpl<T, E>) | (ErrResult<E> & ResultImpl<T, E>);
export declare const Ok: <T, E>(ok: T) => Result<T, E>;
export declare const Err: <T, E>(err: E) => Result<T, E>;
export declare const unwrap: <T, E>(res: Result<T, E>) => T;
export declare const unwrapOr: <T, E>(fallback: T) => ((res: Result<T, E>) => T);
export declare const unwrapOrElse: <T, E>(fallback: () => T) => ((res: Result<T, E>) => T);
export declare const isOk: <T, E>(result: Result<T, E>) => result is OkResult<T> & ResultImpl<T, E>;
export declare const isErr: <T, E>(result: Result<T, E>) => result is ErrResult<E> & ResultImpl<T, E>;
export declare const mapResults: <T, E, U>(arr: T[], fn: (el: T) => Result<U, E>) => Result<U[], E>;
export declare const flatMapResults: <T, E, U>(arr: T[], fn: (el: T) => Result<U[], E>) => Result<U[], E>;
export declare const map: <T, E, U>(result: Result<T, E>, fn: (ok: T) => U) => Result<U, E>;
export {};
