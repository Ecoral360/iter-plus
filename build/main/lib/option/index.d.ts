export declare class Option<T> {
    private readonly val;
    private readonly _isNone;
    private constructor();
    static _new(): Option<never>;
    static _new<T>(val: T): Option<T>;
    isSome: () => this is SomeType<T>;
    isNone: () => this is NoneType;
    map<U>(fn: (val: T) => U): Option<U>;
    /**
     * Returns the inner value without checking if the value is None.
     * **Only do this if you already checked the value was Some<T>**
     */
    unsafeUnwrap(): T;
    /**
     * @throws Error if called on {@link None}
     */
    unwrap(): T;
    unwrapOr<U>(this: Option<never>, fallback: U): NoInfer<U>;
    unwrapOr(this: SomeType<T>, fallback: T): T;
    unwrapOrElse<U>(this: Option<never>, fallback: () => U): NoInfer<U>;
    unwrapOrElse(this: SomeType<T>, fallback: () => T): T;
}
export type NoneType = Option<never>;
export type SomeType<T> = T extends never ? never : Option<T>;
export declare const None: () => NoneType;
export declare const Some: <T>(val: T) => Option<T>;
export declare const unwrap: <T>(opt: Option<T>) => T;
export declare const unwrapOr: <T>(fallback: T) => ((opt: Option<T>) => T);
export declare const unwrapOrElse: <T>(fallback: () => T) => ((opt: Option<T>) => T);
export declare const mapSome: <T, T2>(fn: (ok: T) => T2) => ((opt: Option<T>) => Option<T2>);
