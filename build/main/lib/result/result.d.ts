export type OkType<T> = {
    ok: T;
};
export type ErrType<E> = {
    err: E;
};
export type Result<T, E> = OkType<T> | ErrType<E>;
export declare const Ok: <T, E>(ok: T) => Result<T, E>;
export declare const Err: <T, E>(err: E) => Result<T, E>;
export declare const isOk: <T, E>(result: Result<T, E>) => result is OkType<T>;
export declare const isErr: <T, E>(result: Result<T, E>) => result is ErrType<E>;
export declare const mapResults: <T, E, U>(arr: T[], fn: (el: T) => Result<U, E>) => Result<U[], E>;
export declare const flatMapResults: <T, E, U>(arr: T[], fn: (el: T) => Result<U[], E>) => Result<U[], E>;
export declare const mapOk: <T, E, T2>(result: Result<T, E>, fn: (ok: T) => T2) => Result<T2, E>;
export declare const mapErr: <T, E, E2>(result: Result<T, E>, fn: (err: E) => E2) => Result<T, E2>;
