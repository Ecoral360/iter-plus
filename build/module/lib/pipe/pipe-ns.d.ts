import { Iter } from '../iter/iter';
export declare namespace num {
    const sum: (it: Iterable<number>) => number;
    const square: (it: Iterable<number>) => Iter<number>;
    const pow: (n: number) => void;
    /**
     * Greater Than predicate
     */
    const gt: (n: number) => (x: number) => boolean;
    /**
     * Greater Than or Equal predicate
     */
    const gte: (n: number) => (x: number) => boolean;
    /**
     * Lesser Than predicate
     */
    const lt: (n: number) => (x: number) => boolean;
    /**
     * Lesser Than or Equal predicate
     */
    const lte: (n: number) => (x: number) => boolean;
}
export declare namespace str { }
export declare namespace obj {
    function prop<N extends string, V, T extends {
        [key in N]: V;
    }>(name: N): (obj: T) => T[N];
}
