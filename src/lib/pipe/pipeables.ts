import { Iter, iter } from '../iter/iter';

export namespace num {
    export const sum = (it: Iterable<number>): number => {
        return iter(it).reduce((prev, curr) => prev + curr, 0);
    };

    export const square = (it: Iterable<number>): Iter<number> => {
        return iter(it).map((n) => n * n);
    };

    export const pow = (n: number) => { };

    /**
     * Greater Than predicate
     */
    export const gt = (n: number) => {
        return (x: number) => x > n;
    };

    /**
     * Greater Than or Equal predicate
     */
    export const gte = (n: number) => {
        return (x: number) => x >= n;
    };

    /**
     * Lesser Than predicate
     */
    export const lt = (n: number) => {
        return (x: number) => x < n;
    };

    /**
     * Lesser Than or Equal predicate
     */
    export const lte = (n: number) => {
        return (x: number) => x <= n;
    };
}

export namespace str { }

export namespace obj {
    export function prop<N extends string, V, T extends { [key in N]: V }>(
        name: N
    ): (obj: T) => T[N] {
        return (obj) => obj[name];
    }
}


