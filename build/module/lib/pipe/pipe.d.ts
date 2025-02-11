import { ElementOf } from '../types';
export declare class Pipe<I> {
    private func;
    constructor(func: () => I);
    get(): I;
    collect<U>(this: Pipe<Iterable<ElementOf<I>>>, reducer: (it: Iterable<ElementOf<I>>) => U): U;
    collect(this: Pipe<Iterable<ElementOf<I>>>): ElementOf<I>[];
    $<O>(func: (arg: I) => O): Pipe<O>;
    $$<O>(func: (arg: ElementOf<I>) => O): Pipe<import("../iter").Iter<O>>;
}
export declare function pipe<I>(value: I): Pipe<I>;
export declare function pipeline<T>(arg: T): T;
export declare function pipeline<T1, O>(arg: T1, fn1: (arg: T1) => O): O;
export declare function pipeline<T1, T2, O>(arg: T1, fn1: (arg: T1) => T2, fn2: (arg: T2) => O): O;
export declare function pipeline<T1, T2, T3, O>(arg: T1, fn1: (arg: T1) => T2, fn2: (arg: T2) => T3, fn3: (arg: T3) => O): O;
export declare function pipeline<T1, T2, T3, T4, O>(arg: T1, fn1: (arg: T1) => T2, fn2: (arg: T2) => T3, fn3: (arg: T3) => T4, ...fns: [(arg: T4) => any, ...((arg: any) => any)[], (arg: any) => O]): O;
