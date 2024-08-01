import { Iter, iter } from '../iter/iter';

export namespace num {
    export const sum = (it: Iterable<number>): number => {
        return iter(it).reduce((prev, curr) => prev + curr, 0);
    };

    export const square = (it: Iterable<number>): Iter<number> => {
        return iter(it).map((n) => n * n);
    };

    export const pow = () => { };
}

export namespace str { }

export namespace obj {
    export function prop<N extends string, V, T extends { [key in N]: V }>(
        name: N
    ): (obj: T) => T[N] {
        return (obj) => obj[name];
    }
}
