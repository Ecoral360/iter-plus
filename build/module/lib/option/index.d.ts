export declare class Option<T> {
    readonly val: T;
    constructor(val: T);
    static _new(): Option<never>;
    static _new<T>(val: T): Option<T>;
    isSome: () => this is SomeType<T>;
    isNone: () => this is NoneClass;
    mapSome: <T2>(fn: (ok: T) => T2) => Option<T2>;
    /**
     * @throws Error if called on {@link None}
     */
    unwrap(): T;
    unwrapOr<U>(this: Option<never>, fallback: U): NoInfer<U>;
    unwrapOr(this: SomeType<T>, fallback: T): T;
    unwrapOrElse<U>(this: Option<never>, fallback: () => U): NoInfer<U>;
    unwrapOrElse(this: SomeType<T>, fallback: () => T): T;
}
export declare class SomeClass<T> extends Option<T> {
}
export declare class NoneClass extends Option<never> {
    constructor();
}
export type SomeType<T> = T extends never ? never : Option<T>;
export declare const None: () => Option<never>;
export declare const Some: <T>(val: T) => Option<T>;
export declare namespace opt {
    const unwrap: <T>(opt: Option<T>) => T;
    const unwrapOr: <T>(fallback: T) => ((opt: Option<T>) => T);
    const unwrapOrElse: <T>(fallback: () => T) => ((opt: Option<T>) => T);
    const mapSome: <T, T2>(fn: (ok: T) => T2) => ((opt: Option<T>) => Option<T2>);
}
