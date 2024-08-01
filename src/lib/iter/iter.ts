import { None, Option, Some } from '../option/option';

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

    reduce(func: (prev: T, curr: T) => T): Option<T>;
    reduce(func: (prev: T, curr: T) => T, initial: T): T;
    reduce<U>(func: (prev: U, curr: T) => U, initial: U): U;
    reduce<U>(func: (prev: U, curr: T) => U, initial?: U): T | U | Option<U> {
        let current: any;
        if (initial !== undefined) {
            current = initial;
        } else {
            const next = this.next();
            if (next.done) return None();
            current = next.value;
        }

        for (const el of this) {
            current = func(current, el);
        }

        if (initial !== undefined) return current;
        return Some(current as U);
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
