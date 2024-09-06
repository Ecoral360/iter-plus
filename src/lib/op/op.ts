import { Iter, iter } from '../iter';

export const op = {
  not<T extends (...arg: any) => boolean>(f: T): T {
    return ((...arg: any) => !f(...arg)) as T;
  },

  eq<T>(val: T) {
    return (other: T) => val === other;
  },

  count<T>(it: Iterable<T>): number {
    return iter(it).reduce((prev) => prev + 1, 0);
  },

  sum(it: Iterable<number>): number {
    return iter(it).reduce((prev, curr) => prev + curr, 0);
  },

  square(it: Iterable<number>): Iter<number> {
    return iter(it).map((n) => n * n);
  },

  pow(n: number) {},

  /**
   * Greater Than predicate
   */
  gt(n: number) {
    return (x: number) => x > n;
  },

  /**
   * Greater Than or Equal predicate
   */
  gte(n: number) {
    return (x: number) => x >= n;
  },

  /**
   * Lesser Than predicate
   */
  lt(n: number) {
    return (x: number) => x < n;
  },

  /**
   * Lesser Than or Equal predicate
   */
  lte(n: number) {
    return (x: number) => x <= n;
  },

  join<T>(
    sep: string,
    transform: (arg: T) => string = (arg) => `${arg}`
  ): (it: Iterable<T>) => string {
    return (it) =>
      iter(it).reduce(
        (prev, curr, idx) =>
          idx === 0 ? transform(curr) : prev + sep + transform(curr),
        ''
      );
  },

  prop<N extends string, V, T extends { [key in N]: V }>(
    name: N
  ): (obj: T) => T[N] {
    return (obj) => obj[name];
  },
};

