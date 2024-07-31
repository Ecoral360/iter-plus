import { Option } from '../option';
export declare class Iter<T> {
    private iterator;
    constructor(iterator: Iterator<T, undefined>);
    [Symbol.iterator](): this;
    next(): IteratorResult<T, undefined>;
    forEach(func: (el: T) => void): void;
    take(n: number): Iter<T>;
    skip(n: number): Iter<T>;
    inspect(func: (el: T) => void): Iter<T>;
    map<U>(func: (el: T) => U): Iter<U>;
    filter(func: (el: T) => boolean): Iter<T>;
    filterMap<U>(func: (el: T) => Option<U>): Iter<U>;
    flatten<E>(this: Iter<Iterable<E>>): Iter<E>;
    reduce(func: (prev: T, curr: T) => T): Option<T>;
    reduce(func: (prev: T, curr: T) => T, initial: T): Option<T>;
    reduce<U>(func: (prev: U, curr: T) => U, initial: U): Option<U>;
    collect(): T[];
}
export declare function iter<T>(it: Iterable<T>): Iter<T>;
export declare namespace iter {
    var take: <T>(n: number) => IterCB<T, T>;
    var skip: <T>(n: number) => IterCB<T, T>;
    var map: <T, U>(func: (el: T) => U) => IterCB<T, U>;
    var flatMap: <T, U>(func: (el: T) => Iterable<U>) => ((it: Iterable<T>) => Iter<U>);
    var mapFlat: <T, U>(func: (el: T) => U) => ((it: Iter<Iterable<T>> | Iterable<Iterable<T>>) => Iter<U>);
    var inspect: <T>(func: (el: T) => void) => IterCB<T, T>;
    var flatten: <E>(it: Iter<Iterable<E>> | Iterable<Iterable<E>>) => Iter<E>;
    var reduce: <T, U = T>(func: (prev: U, curr: T) => U, initial?: U) => ((it: Iterable<T>) => Option<U>);
}
type IterCB<T, U> = (it: Iterable<T>) => Iter<U>;
export {};
