import { Iter } from '../iter';
export declare const op: {
    not<T extends (...arg: any) => boolean>(f: T): T;
    eq<T>(val: T): (other: T) => boolean;
    count<T>(it: Iterable<T>): number;
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
    join<T>(sep: string, transform?: (arg: T) => string): (it: Iterable<T>) => string;
    prop<N extends string, V, T extends { [key in N]: V; }>(name: N): (obj: T) => T[N];
};
