export class Option<T> {
  public readonly val: T;

  constructor(val: T) {
    this.val = val;
  }

  static _new(): Option<never>;
  static _new<T>(val: T): Option<T>;
  static _new<T>(val?: T): Option<T> | Option<never> {
    if (arguments.length === 0) {
      return new Option(undefined as never);
    } else {
      return new Option(val as T);
    }
  }

  isSome = (): this is SomeType<T> => !this.isNone();

  isNone = (): this is NoneClass => this.val instanceof NoneClass;

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

  unwrapOr<U>(this: Option<never>, fallback: U): NoInfer<U>;
  unwrapOr(this: SomeType<T>, fallback: T): T;
  unwrapOr(fallback: T): T {
    if (this.isNone()) return fallback;
    return this.val;
  }

  unwrapOrElse<U>(
    this: Option<never>,
    fallback: () => U
  ): NoInfer<U>;
  unwrapOrElse(this: SomeType<T>, fallback: () => T): T;
  unwrapOrElse(fallback: () => T): T {
    if (this.isNone()) return fallback();
    return this.val;
  }
}

export class SomeClass<T> extends Option<T> {}

export class NoneClass extends Option<never> {
  constructor() {
    super(undefined as never);
  }
}

export type SomeType<T> = T extends never ? never : Option<T>;

export const None = (): Option<never> => Option._new();


export const Some = <T>(val: T): Option<T> =>
  new Option(val) as SomeType<T>;

// -------------------- Pipeable versions of option functions --------------------
export namespace opt {
  export const unwrap = <T>(opt: Option<T>): T => {
    return opt.unwrap() as T;
  };

  export const unwrapOr = <T>(fallback: T): ((opt: Option<T>) => T) => {
    return (opt) => (opt.isSome() ? opt.val : fallback);
  };

  export const unwrapOrElse = <T>(
    fallback: () => T
  ): ((opt: Option<T>) => T) => {
    return (opt) => (opt.isSome() ? opt.val : fallback());
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
