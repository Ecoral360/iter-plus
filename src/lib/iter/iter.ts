import { None, Option, Some } from '../option/option';

export class Iter<T> {
  constructor(private iterator: Iterator<T, undefined>) {}

  [Symbol.iterator]() {
    return this;
  }

  next() {
    return this.iterator.next();
  }

  forEach(func: (el: T) => void): void {
    for (const el of this) {
      func(el);
    }
  }

  take(n: number): Iter<T> {
    const previousIter = this.iterator;
    let taken = 0;
    return new Iter({
      next() {
        return taken++ >= n
          ? { value: undefined, done: true }
          : previousIter.next();
      },
    });
  }

  skip(n: number): Iter<T> {
    const previousIter = this.iterator;
    return new Iter({
      next() {
        let nextEl = previousIter.next();
        for (let skipped = 0; skipped < n; skipped++) {
          nextEl = previousIter.next();
        }
        return nextEl;
      },
    });
  }

  inspect(func: (el: T) => void): Iter<T> {
    const previousIter = this.iterator;
    return new Iter({
      next() {
        const nextEl = previousIter.next();
        if (nextEl.done) return { value: undefined, done: true };

        func(nextEl.value);
        return { value: nextEl.value, done: false };
      },
    });
  }

  map<U>(func: (el: T) => U): Iter<U> {
    const previousIter = this.iterator;
    return new Iter({
      next() {
        const nextEl = previousIter.next();
        if (nextEl.done) return { value: undefined, done: true };

        return { value: func(nextEl.value), done: false };
      },
    });
  }

  filter(func: (el: T) => boolean): Iter<T> {
    const previousIter = this.iterator;
    return new Iter({
      next() {
        let nextEl: IteratorResult<T, undefined>;
        do {
          nextEl = previousIter.next();
          if (nextEl.done) return { value: undefined, done: true };
        } while (!func(nextEl.value));

        return { value: nextEl.value, done: false };
      },
    });
  }

  filterMap<U>(func: (el: T) => Option<U>): Iter<U> {
    const previousIter = this.iterator;

    return new Iter({
      next() {
        let nextEl: IteratorResult<T, undefined>;
        let result: Option<U>;
        do {
          nextEl = previousIter.next();
          if (nextEl.done) return { value: undefined, done: true };
          result = func(nextEl.value);
        } while (result.isNone());

        return { value: result.val, done: false };
      },
    });
  }

  flatten<E>(this: Iter<Iterable<E>>) {
    const previousIter = this.iterator;
    let currIter: Iterator<E> | undefined;

    return new Iter<E>({
      next() {
        let currIterNext = currIter?.next();
        if (currIterNext === undefined || currIterNext?.done) {
          const maybeCurrIter = previousIter.next();
          if (maybeCurrIter.done) return { value: undefined, done: true };
          currIter = maybeCurrIter.value[Symbol.iterator]();
          currIterNext = currIter?.next();
        }

        return { value: currIterNext.value, done: false };
      },
    });
  }

  reduce(func: (prev: T, curr: T) => T): Option<T>;
  reduce(func: (prev: T, curr: T) => T, initial: T): Option<T>;
  reduce<U>(func: (prev: U, curr: T) => U, initial: U): Option<U>;
  reduce<U>(func: (prev: U, curr: T) => U, initial?: U): Option<U> {
    let current: any;
    if (initial !== undefined) {
      current = initial;
    } else {
      const next = this.next();
      if (next.done) return None();
      current = next.value;
    }

    for (const el of this) {
      current = func(current, el);
    }

    return Some(current as U);
  }

  collect(): T[] {
    return [...this];
  }
}

export function iter<T>(it: Iterable<T>): Iter<T> {
  if (it instanceof Iter) return it;
  return new Iter(it[Symbol.iterator]());
}

// -------------------- Pipeable versions of iter functions --------------------

type IterCB<T, U> = (it: Iterable<T>) => Iter<U>;

iter.take = <T>(n: number): IterCB<T, T> => {
  return (it) => iter(it).take(n);
};

iter.skip = <T>(n: number): IterCB<T, T> => {
  return (it) => iter(it).skip(n);
};

iter.map = <T, U>(func: (el: T) => U): IterCB<T, U> => {
  return (it) => iter(it).map(func);
};

iter.flatMap = <T, U>(
  func: (el: T) => Iterable<U>
): ((it: Iterable<T>) => Iter<U>) => {
  return (it) => iter(it).map(func).flatten();
};

iter.mapFlat = <T, U>(
  func: (el: T) => U
): ((it: Iter<Iterable<T>> | Iterable<Iterable<T>>) => Iter<U>) => {
  return (it) => iter(it).flatten().map(func);
};

iter.inspect = <T>(func: (el: T) => void): IterCB<T, T> => {
  return (it) => iter(it).inspect(func);
};

iter.flatten = <E>(it: Iter<Iterable<E>> | Iterable<Iterable<E>>): Iter<E> => {
  return iter(it).flatten();
};

iter.reduce = <T, U = T>(
  func: (prev: U, curr: T) => U,
  initial?: U
): ((it: Iterable<T>) => Option<U>) => {
  return (it) => iter(it).reduce<U>(func, initial as unknown as U);
};
