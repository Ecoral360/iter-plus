import { iter } from '../iter/iter';
import { ElementOf } from '../types';

export * from './pipe-ns';

export class Pipe<I> {
  constructor(private func: () => I) {}

  get() {
    return this.func();
  }

  $<O>(func: (arg: I) => O) {
    return new Pipe(() => func(this.func()));
  }

  $$<O>(func: (arg: ElementOf<I>) => O) {
    return new Pipe(() => iter(this.func() as any[]).map(func));
  }
}

export function pipe<I>(value: I) {
  return new Pipe(() => value);
}

// export function pipeline<T>(input: T): T;
// export function pipeline<
//   T,
//   Fns extends ((input: any) => any)[]
// >(input: T, ...fnArray: FunctionChain<T, Fns>): LastReturnType<Fns>;
// export function pipeline<
//   T,
//   Fns extends Array<(input: any) => any>
// >(input: T, ...fnArray: FunctionChain<T, Fns>): T | LastReturnType<Fns> {
//   return fnArray.reduce((value, fn) => fn(value), input);
// }

export function pipeline<T>(arg: T): T;
export function pipeline<T1, O>(arg: T1, fn1: (arg: T1) => O): O;
export function pipeline<T1, T2, O>(
  arg: T1,
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => O
): O;
export function pipeline<T1, T2, T3, O>(
  arg: T1,
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3,
  fn3: (arg: T3) => O
): O;
export function pipeline<T1, T2, T3, T4, O>(
  arg: T1,
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3,
  fn3: (arg: T3) => T4,
  ...fns: [(arg: T4) => any, ...((arg: any) => any)[], (arg: any) => O]
): O;
export function pipeline<T, O>(arg: T, ...fns: ((arg: any) => any)[]): T | O {
  if (fns.length === 0) return arg;
  return fns.reduce((acc, fn) => fn(acc), arg);
}

export namespace pList {
  export function map<T, U>(f: (arg: T) => U) {
    return (arr: T[]) => arr.map(f);
  }
}

export namespace p {
  export function map<T, U>(f: (arg: T) => U) {
    return (arr: Iterable<T>) => iter(arr).map(f);
  }
}
