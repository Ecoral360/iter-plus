declare class OptionClass<T> {
    readonly val: T;
    constructor(val: T);
    isSome: () => this is SomeType<T>;
    isNone: () => this is typeof None;
    mapSome: <T2>(fn: (ok: T) => T2) => Option<T2>;
    /**
     * @throws Error if called on {@link None}
     */
    unwrap(): T;
    unwrapOr<U>(this: OptionClass<typeof _none>, fallback: U): NoInfer<U>;
    unwrapOr(this: SomeType<T>, fallback: T): T;
    unwrapOrElse<U>(this: OptionClass<typeof _none>, fallback: () => U): NoInfer<U>;
    unwrapOrElse(this: SomeType<T>, fallback: () => T): T;
}
declare const _none: unique symbol;
export type SomeType<T> = T extends typeof _none ? never : OptionClass<T>;
export declare const None: <T = typeof _none>() => OptionClass<T>;
export type Option<T> = OptionClass<T>;
export declare const Some: <T>(val: T) => SomeType<T>;
export declare namespace opt {
    const unwrap: <T>(opt: Option<T>) => T;
    const unwrapOr: <T>(fallback: T) => ((opt: Option<T>) => T);
    const unwrapOrElse: <T>(fallback: () => T) => ((opt: Option<T>) => T);
    const mapSome: <T, T2>(fn: (ok: T) => T2) => ((opt: Option<T>) => Option<T2>);
}
export {};
