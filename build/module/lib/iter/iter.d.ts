import { Option } from '../option';
export declare class Iter<T> {
    private iterator;
    constructor(iterator: Iterator<T, undefined>);
    [Symbol.iterator](): this;
    next(): IteratorResult<T, undefined>;
    forEach(func: (el: T) => void): void;
    take(n: number): Iter<T>;
    takeWhile(test: (el: T) => boolean): Iter<T>;
    skip(n: number): Iter<T>;
    skipWhile(test: (el: T) => boolean): Iter<T>;
    /**
     * @param opts
     * `startUnbalanced`: if `true`, assumes `inc` matched once before the balancing
     * `inclusive`: if `true`, the last match is also returned
     */
    takeBalanced(inc: (el: T) => boolean, dec: (el: T) => boolean, opts?: {
        startUnbalanced: boolean;
        inclusiveEnd: boolean;
    }): Iter<T>;
    branch(cond: (it: Iter<T>) => boolean, thenBr: (it: Iter<T>) => Iter<T>, elseBr?: (it: Iter<T>) => Iter<T>): Iter<T>;
    nth(n: number): Option<T>;
    /**
     * Method that that skips `n` elements of the iterator each time
     *
     * Example:
     * iter(1, 2, 3, 4, 5, 6).step(2).map(num.square)
     */
    step(n: number, opts?: {
        takeFirst: boolean;
    }): Iter<T>;
    extend(...iterables: Iterable<T>[]): Iter<T>;
    inspect(func: (el: T) => void): Iter<T>;
    map<U>(func: (el: T) => U): Iter<U>;
    filter(func: (el: T) => boolean): Iter<T>;
    filterMap<U>(func: (el: T) => Option<U>): Iter<U>;
    flatten<E>(this: Iter<Iterable<E>>): Iter<E>;
    reduce(func: (prev: T, curr: T, index: number) => T): Option<T>;
    reduce(func: (prev: T, curr: T, index: number) => T, initial: T): T;
    reduce<U>(func: (prev: U, curr: T, index: number) => U, initial: U): U;
    apply<U>(func: (it: Iter<T>) => Iter<U>): Iter<U>;
    collect<U>(reducer: (it: Iter<T>) => U): U;
    collect(): T[];
}
export declare function iter<T>(el1: T, el2: T, ...eln: T[]): Iter<T>;
export declare function iter<T>(it: Iterable<T>): Iter<T>;
export declare namespace iter {
    var extend: <T>(iterable: Iterable<T>) => ((it: Iterable<T>) => Iter<T>);
    var take: <T>(n: number) => IterCB<T, T>;
    var skip: <T>(n: number) => IterCB<T, T>;
    var step: <T>(n: number, opts?: {
        takeFirst: boolean;
    }) => IterCB<T, T>;
    var map: <T, U>(func: (el: T) => U) => IterCB<T, U>;
    var flatMap: <T, U>(func: (el: T) => Iterable<U>) => ((it: Iterable<T>) => Iter<U>);
    var mapFlat: <T, U>(func: (el: T) => U) => ((it: Iter<Iterable<T>> | Iterable<Iterable<T>>) => Iter<U>);
    var inspect: <T>(func: (el: T) => void) => IterCB<T, T>;
    var flatten: <E>(it: Iter<Iterable<E>> | Iterable<Iterable<E>>) => Iter<E>;
    var reduce: IterReduce;
    var num: {
        sum(it: Iterable<number>): number;
        square(it: Iterable<number>): Iter<number>;
        pow(n: number): void;
        /**
         * Greater Than predicate
         */
        gt(n: number): (x: number) => boolean;
        /**
         * Greater Than or Equal predicate
         */
        gte(n: number): (x: number) => boolean;
        /**
         * Lesser Than predicate
         */
        lt(n: number): (x: number) => boolean;
        /**
         * Lesser Than or Equal predicate
         */
        lte(n: number): (x: number) => boolean;
    };
    var str: {
        join<T extends {
            toString(): string;
        }>(sep: string): (it: Iterable<T>) => string;
    };
    var pred: {
        not<T extends (...arg: any) => boolean>(f: T): T;
        eq<T>(val: T): (other: T) => boolean;
    };
    var obj: {
        prop<N extends string, V, T extends { [key in N]: V; }>(name: N): (obj: T) => T[N];
    };
}
type IterCB<T, U> = (it: Iterable<T>) => Iter<U>;
type IterReduce = {
    <T>(func: (prev: T, curr: T) => T): (it: Iterable<T>) => Option<T>;
    <T>(func: (prev: T, curr: T) => T, initial: T): (it: Iterable<T>) => T;
    <T, U>(func: (prev: U, curr: T) => U, initial: U): (it: Iterable<T>) => U;
};
export {};
