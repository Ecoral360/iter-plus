type OkResult<T> = Result<T, never>;
type ErrResult<E> = Result<never, E>;
export declare class Result<T, E> {
    readonly ok: T | never;
    readonly err: E | never;
    private _isErr;
    constructor(ok: T, err: never, _isErr: false);
    constructor(ok: never, err: E, _isErr: true);
    isOk(): this is OkResult<T>;
    isErr(): this is ErrResult<E>;
    map<U>(fn: (val: T) => U): Result<U, E>;
    /**
     * Returns the inner value without checking if the value is None.
     * **Only do this if you already checked the value was Some<T>**
     */
    unsafeUnwrap(): T;
    /**
     * @throws Error if called on {@link None}
     */
    unwrap(): T;
    unwrapOr<U>(this: Result<T, E> & {
        _isErr: true;
    }, fallback: U): NoInfer<U>;
    unwrapOr(this: Result<T, E> & {
        _isErr: false;
    }, fallback: T): T;
    unwrapOrElse<U>(this: Result<T, E> & {
        _isErr: true;
    }, fallback: () => U): NoInfer<U>;
    unwrapOrElse(this: Result<T, E> & {
        _isErr: false;
    }, fallback: () => T): T;
}
export declare const Ok: <T, E>(ok: T) => Result<T, E>;
export declare const Err: <T, E>(err: E) => Result<T, E>;
export declare const unwrap: <T, E>(opt: Result<T, E>) => T;
export declare const unwrapOr: <T, E>(fallback: T) => ((opt: Result<T, E>) => T);
export declare const unwrapOrElse: <T, E>(fallback: () => T) => ((opt: Result<T, E>) => T);
export declare const isOk: <T, E>(result: Result<T, E>) => result is OkResult<T>;
export declare const isErr: <T, E>(result: Result<T, E>) => result is ErrResult<E>;
export declare const mapResults: <T, E, U>(arr: T[], fn: (el: T) => Result<U, E>) => Result<U[], E>;
export declare const flatMapResults: <T, E, U>(arr: T[], fn: (el: T) => Result<U[], E>) => Result<U[], E>;
export {};
