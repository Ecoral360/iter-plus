class OptionClass<T> {
  constructor(public readonly val: T) {}

  isSome = (): this is SomeType<T> => !this.isNone();

  isNone = (): this is typeof None => this.val === _none;

  mapSome = <T2>(fn: (ok: T) => T2): Option<T2> => {
    if (this.isSome()) return Some(fn(this.val));
    return None();
  };

  /**
   * @throws Error if called on {@link None}
   */
  unwrap(): T {
    if (this.isNone()) throw new Error('Attempted to unwrap a None value');
    return this.val;
  }

  unwrapOr<U>(this: OptionClass<typeof _none>, fallback: U): NoInfer<U>;
  unwrapOr(this: SomeType<T>, fallback: T): T;
  unwrapOr(fallback: T): T {
    if (this.isNone()) return fallback;
    return this.val;
  }
}

const _none: unique symbol = Symbol('None value');

export type SomeType<T> = T extends typeof _none ? never : OptionClass<T>;

export const None = <T = typeof _none>() => new OptionClass<T>(_none as any);

export type Option<T> = OptionClass<T>

export const Some = <T>(val: T): SomeType<T> =>
  new OptionClass(val) as SomeType<T>;

// -------------------- Pipeable versions of option functions --------------------
export namespace option {
  export const unwrap = <T>(opt: Option<T>): T => {
    return opt.unwrap() as T;
  };

  export const unwrapOr = <T>(fallback: T): ((opt: Option<T>) => T) => {
    return (opt) => (opt.isSome() ? opt.val : fallback);
  };

  export const mapSome = <T, T2>(
    fn: (ok: T) => T2
  ): ((opt: Option<T>) => Option<T2>) => {
    return (opt) => {
      if (opt.isSome()) return Some(fn(opt.val));
      return None();
    };
  };
}
