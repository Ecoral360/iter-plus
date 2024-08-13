import { None, Option, Some } from '../option';

export class Iter<T> {
    constructor(private iterator: Iterator<T, undefined>) { }

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

    takeWhile(test: (el: T) => boolean): Iter<T> {
        const previousIter = this.iterator;
        let stopTake = false;
        return new Iter({
            next() {
                if (stopTake) return { value: undefined, done: true };

                const nextEl = previousIter.next();
                stopTake = nextEl.done || !test(nextEl.value);
                if (stopTake) return { value: undefined, done: true };

                return nextEl;
            },
        });
    }

    skip(n: number): Iter<T> {
        const previousIter = this.iterator;
        let skipped = 0;
        return new Iter({
            next() {
                let nextEl = previousIter.next();
                for (; skipped < n; skipped++) {
                    nextEl = previousIter.next();
                }
                return nextEl;
            },
        });
    }

    skipWhile(test: (el: T) => boolean): Iter<T> {
        const previousIter = this.iterator;
        let stopSkip = false;
        return new Iter({
            next() {
                let nextEl: IteratorResult<T, undefined>;

                do {
                    nextEl = previousIter.next();

                    stopSkip ||= nextEl.done || !test(nextEl.value);
                } while (!stopSkip);

                return nextEl;
            },
        });
    }

    /**
     * @param opts
     * `startUnbalanced`: if `true`, assumes `inc` matched once before the balancing
     * `inclusive`: if `true`, the last match is also returned
     */
    takeBalanced(
        inc: (el: T) => boolean,
        dec: (el: T) => boolean,
        opts = { startUnbalanced: false, inclusiveEnd: false }
    ): Iter<T> {
        const previousIter = this.iterator;
        let done = false;
        let score = opts.startUnbalanced ? 1 : 0;
        return new Iter({
            next() {
                if (done) return { value: undefined, done: true };

                const nextEl = previousIter.next();
                if (nextEl.done) return { value: undefined, done: true };

                if (inc(nextEl.value)) {
                    score++;
                } else if (dec(nextEl.value)) {
                    score--;
                }

                if (score === 0) {
                    done = true;
                    if (!opts.inclusiveEnd) return { value: undefined, done: true };
                }

                return nextEl;
            },
        });
    }

    branch(
        cond: (it: Iter<T>) => boolean,
        thenBr: (it: Iter<T>) => Iter<T>,
        elseBr?: (it: Iter<T>) => Iter<T>
    ): Iter<T> {
        if (cond(this)) return thenBr(this);
        else if (elseBr !== undefined) return elseBr(this);
        else return this;
    }

    nth(n: number): Option<T> {
        const next = this.skip(n).next();
        if (next.done) return None();
        return Some(next.value);
    }

    /**
     * Method that that skips `n` elements of the iterator each time
     *
     * Example:
     * iter(1, 2, 3, 4, 5, 6).step(2).map(num.square)
     */
    step(n: number, opts = { takeFirst: false }): Iter<T> {
        const previousIter = this.iterator;
        return new Iter({
            next() {
                let nextEl = previousIter.next();
                if (opts.takeFirst) {
                    opts.takeFirst = false;
                    return nextEl;
                }
                for (let step = 1; step < n; step++) {
                    nextEl = previousIter.next();
                }
                return nextEl;
            },
        });
    }

    extend(...iterables: Iterable<T>[]): Iter<T> {
        const previousIter = this.iterator;
        const iters = iter(iterables).map((it) => it[Symbol.iterator]());
        let currIter = previousIter;
        return new Iter({
            next() {
                let nextEl = currIter.next();
                while (nextEl.done) {
                    const nextIter = iters.next();
                    if (nextIter.done) return { value: undefined, done: true };
                    currIter = nextIter.value;
                    nextEl = currIter.next();
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

    reduce(func: (prev: T, curr: T, index: number) => T): Option<T>;
    reduce(func: (prev: T, curr: T, index: number) => T, initial: T): T;
    reduce<U>(func: (prev: U, curr: T, index: number) => U, initial: U): U;
    reduce<U>(
        func: (prev: U, curr: T, index: number) => U,
        initial?: U
    ): T | U | Option<U> {
        let current: any;
        let idx = 0;
        if (initial !== undefined) {
            current = initial;
        } else {
            const next = this.next();
            if (next.done) return None();
            current = next.value;
            idx++;
        }

        for (const el of this) {
            current = func(current, el, idx);
            idx++;
        }

        if (initial !== undefined) return current;
        return Some(current as U);
    }

    apply<U>(func: (it: Iter<T>) => Iter<U>): Iter<U> {
        return func(this);
    }

    collect<U>(reducer: (it: Iter<T>) => U): U;
    collect(): T[];
    collect<U>(reducer?: (it: Iter<T>) => U): U | T[] {
        if (reducer !== undefined) return reducer(this);
        return [...this];
    }
}

export function iter<T>(el1: T, el2: T, ...eln: T[]): Iter<T>;
export function iter<T>(it: Iterable<T>): Iter<T>;
export function iter<T>(it: T | Iterable<T>, ...elements: T[]): Iter<T> {
    if (elements.length > 0) {
        elements.splice(0, 0, it as T);
        return new Iter(elements[Symbol.iterator]());
    }

    if (it instanceof Iter) return it;
    return new Iter((it as Iterable<T>)[Symbol.iterator]());
}

// -------------------- Pipeable versions of iter functions --------------------

type IterCB<T, U> = (it: Iterable<T>) => Iter<U>;

iter.extend = <T>(iterable: Iterable<T>): ((it: Iterable<T>) => Iter<T>) => {
    return (it) => iter(it);
};

iter.take = <T>(n: number): IterCB<T, T> => {
    return (it) => iter(it).take(n);
};

iter.skip = <T>(n: number): IterCB<T, T> => {
    return (it) => iter(it).skip(n);
};

iter.step = <T>(n: number, opts = { takeFirst: false }): IterCB<T, T> => {
    return (it) => iter(it).step(n, opts);
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

type IterReduce = {
    <T>(func: (prev: T, curr: T) => T): (it: Iterable<T>) => Option<T>;
    <T>(func: (prev: T, curr: T) => T, initial: T): (it: Iterable<T>) => T;
    <T, U>(func: (prev: U, curr: T) => U, initial: U): (it: Iterable<T>) => U;
};

iter.reduce = ((func: any, initial: any) => {
    return (it: any) => iter(it).reduce(func, initial);
}) as IterReduce;

iter.num = {
    sum(it: Iterable<number>): number {
        return iter(it).reduce((prev, curr) => prev + curr, 0);
    },

    square(it: Iterable<number>): Iter<number> {
        return iter(it).map((n) => n * n);
    },

    pow(n: number) { },

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
};

iter.str = {
    join<T extends { toString(): string }>(
        sep: string
    ): (it: Iterable<T>) => string {
        return (it) =>
            iter(it).reduce(
                (prev, curr, idx) =>
                    idx === 0 ? curr.toString() : prev.toString() + sep + curr.toString(),
                ''
            );
    },
};

iter.pred = {
    not<T extends (...arg: any) => boolean>(f: T): T {
        return ((...arg: any) => !f(...arg)) as T;
    },

    eq<T>(val: T) {
        return (other: T) => val === other;
    },
};

iter.obj = {
    prop<N extends string, V, T extends { [key in N]: V }>(
        name: N
    ): (obj: T) => T[N] {
        return (obj) => obj[name];
    },
};
