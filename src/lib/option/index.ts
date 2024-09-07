export class Option<T> {
  private constructor(
    private readonly val: T,
    private readonly _isNone: boolean
  ) {}

  static _new(): Option<never>;
  static _new<T>(val: T): Option<T>;
  static _new<T>(val?: T): Option<T> | Option<never> {
    if (arguments.length === 0) {
      return new Option(undefined as never, true);
    } else {
      return new Option(val as T, false);
    }
  }

  isSome = (): this is SomeType<T> => !this._isNone;

  isNone = (): this is NoneType => this._isNone;

  map<U>(fn: (val: T) => U): Option<U> {
    if (this.isSome()) return Some(fn(this.val));
    return None();
  }

  /**
   * Returns the inner value without checking if the value is None.
   * **Only do this if you already checked the value was Some<T>**
   */
  unsafeUnwrap(): T {
    return this.val;
  }

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

  unwrapOrElse<U>(this: Option<never>, fallback: () => U): NoInfer<U>;
  unwrapOrElse(this: SomeType<T>, fallback: () => T): T;
  unwrapOrElse(fallback: () => T): T {
    if (this.isNone()) return fallback();
    return this.val;
  }
}

export type NoneType = Option<never>;
export type SomeType<T> = T extends never ? never : Option<T>;

export const None = (): NoneType => Option._new();

export const Some = <T>(val: T): Option<T> => Option._new(val) as SomeType<T>;

// -------------------- Pipeable versions of option functions --------------------
export const unwrap = <T>(opt: Option<T>): T => {
  return opt.unwrap() as T;
};

export const unwrapOr = <T>(fallback: T): ((opt: Option<T>) => T) => {
  return (opt) => (opt.isSome() ? opt.unsafeUnwrap() : fallback);
};

export const unwrapOrElse = <T>(fallback: () => T): ((opt: Option<T>) => T) => {
  return (opt) => (opt.isSome() ? opt.unsafeUnwrap() : fallback());
};

export const mapSome = <T, T2>(
  fn: (ok: T) => T2
): ((opt: Option<T>) => Option<T2>) => {
  return (opt) => {
    if (opt.isSome()) return Some(fn(opt.unsafeUnwrap()));
    return None();
  };
};
