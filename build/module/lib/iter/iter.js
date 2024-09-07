import { None, Some } from '../option';
export class Iter {
    iterator;
    constructor(iterator) {
        this.iterator = iterator;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        return this.iterator.next();
    }
    forEach(func) {
        for (const el of this) {
            func(el);
        }
    }
    take(n) {
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
    takeWhile(test) {
        const previousIter = this.iterator;
        let stopTake = false;
        return new Iter({
            next() {
                if (stopTake)
                    return { value: undefined, done: true };
                const nextEl = previousIter.next();
                stopTake = nextEl.done || !test(nextEl.value);
                if (stopTake)
                    return { value: undefined, done: true };
                return nextEl;
            },
        });
    }
    skip(n) {
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
    skipWhile(test) {
        const previousIter = this.iterator;
        let stopSkip = false;
        return new Iter({
            next() {
                let nextEl;
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
    takeBalanced(inc, dec, opts = { startUnbalanced: false, inclusiveEnd: false }) {
        const previousIter = this.iterator;
        let done = false;
        let score = opts.startUnbalanced ? 1 : 0;
        return new Iter({
            next() {
                if (done)
                    return { value: undefined, done: true };
                const nextEl = previousIter.next();
                if (nextEl.done)
                    return { value: undefined, done: true };
                if (inc(nextEl.value)) {
                    score++;
                }
                else if (dec(nextEl.value)) {
                    score--;
                }
                if (score === 0) {
                    done = true;
                    if (!opts.inclusiveEnd)
                        return { value: undefined, done: true };
                }
                return nextEl;
            },
        });
    }
    branch(cond, thenBr, elseBr) {
        if (cond(this))
            return thenBr(this);
        else if (elseBr !== undefined)
            return elseBr(this);
        else
            return this;
    }
    nth(n) {
        const next = this.skip(n).next();
        if (next.done)
            return None();
        return Some(next.value);
    }
    /**
     * Method that that skips `n` elements of the iterator each time
     *
     * Example:
     * iter(1, 2, 3, 4, 5, 6).step(2).map(num.square)
     */
    step(n, opts = { takeFirst: false }) {
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
    extend(...iterables) {
        const previousIter = this.iterator;
        const iters = iter(iterables).map((it) => it[Symbol.iterator]());
        let currIter = previousIter;
        return new Iter({
            next() {
                let nextEl = currIter.next();
                while (nextEl.done) {
                    const nextIter = iters.next();
                    if (nextIter.done)
                        return { value: undefined, done: true };
                    currIter = nextIter.value;
                    nextEl = currIter.next();
                }
                return nextEl;
            },
        });
    }
    batch(size) {
        const take = () => this.take(size);
        let done = false;
        return new Iter({
            next() {
                let currBatch = 0;
                const nextBatch = take();
                if (done)
                    return { value: undefined, done: true };
                return {
                    value: new Iter({
                        next() {
                            const nextVal = nextBatch.next();
                            if (currBatch++ < size && nextVal.done) {
                                done = true;
                            }
                            return nextVal;
                        },
                    }),
                    done: false,
                };
            },
        });
    }
    inspect(func) {
        const previousIter = this.iterator;
        return new Iter({
            next() {
                const nextEl = previousIter.next();
                if (nextEl.done)
                    return { value: undefined, done: true };
                func(nextEl.value);
                return { value: nextEl.value, done: false };
            },
        });
    }
    map(func) {
        const previousIter = this.iterator;
        return new Iter({
            next() {
                const nextEl = previousIter.next();
                if (nextEl.done)
                    return { value: undefined, done: true };
                return { value: func(nextEl.value), done: false };
            },
        });
    }
    filter(func) {
        const previousIter = this.iterator;
        return new Iter({
            next() {
                let nextEl;
                do {
                    nextEl = previousIter.next();
                    if (nextEl.done)
                        return { value: undefined, done: true };
                } while (!func(nextEl.value));
                return { value: nextEl.value, done: false };
            },
        });
    }
    filterMap(func) {
        const previousIter = this.iterator;
        return new Iter({
            next() {
                let nextEl;
                let result;
                do {
                    nextEl = previousIter.next();
                    if (nextEl.done)
                        return { value: undefined, done: true };
                    result = func(nextEl.value);
                } while (result.isNone());
                return { value: result.unsafeUnwrap(), done: false };
            },
        });
    }
    flatten() {
        const previousIter = this.iterator;
        let currIter;
        return new Iter({
            next() {
                let currIterNext = currIter?.next();
                if (currIterNext === undefined || currIterNext?.done) {
                    const maybeCurrIter = previousIter.next();
                    if (maybeCurrIter.done)
                        return { value: undefined, done: true };
                    currIter = maybeCurrIter.value[Symbol.iterator]();
                    currIterNext = currIter?.next();
                }
                return { value: currIterNext.value, done: false };
            },
        });
    }
    reduce(func, initial) {
        let current;
        let idx = 0;
        if (initial !== undefined) {
            current = initial;
        }
        else {
            const next = this.next();
            if (next.done)
                return None();
            current = next.value;
            idx++;
        }
        for (const el of this) {
            current = func(current, el, idx);
            idx++;
        }
        if (initial !== undefined)
            return current;
        return Some(current);
    }
    apply(func) {
        return func(this);
    }
    collect(reducer) {
        if (reducer !== undefined)
            return reducer(this);
        return [...this];
    }
}
export function iter(it, ...elements) {
    if (elements.length > 0) {
        elements.splice(0, 0, it);
        return new Iter(elements[Symbol.iterator]());
    }
    if (it instanceof Iter)
        return it;
    return new Iter(it[Symbol.iterator]());
}
iter.extend = (iterable) => {
    return (it) => iter(it).extend(iterable);
};
iter.take = (n) => {
    return (it) => iter(it).take(n);
};
iter.skip = (n) => {
    return (it) => iter(it).skip(n);
};
iter.step = (n, opts = { takeFirst: false }) => {
    return (it) => iter(it).step(n, opts);
};
iter.map = (func) => {
    return (it) => iter(it).map(func);
};
iter.flatMap = (func) => {
    return (it) => iter(it).map(func).flatten();
};
iter.mapFlat = (func) => {
    return (it) => iter(it).flatten().map(func);
};
iter.inspect = (func) => {
    return (it) => iter(it).inspect(func);
};
iter.flatten = (it) => {
    return iter(it).flatten();
};
iter.collect = ((reducer) => {
    return (it) => iter(it).collect(reducer);
});
iter.reduce = ((func, initial) => {
    return (it) => iter(it).reduce(func, initial);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaXRlci9pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQVUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRS9DLE1BQU0sT0FBTyxJQUFJO0lBQ0s7SUFBcEIsWUFBb0IsUUFBZ0M7UUFBaEMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7SUFBRyxDQUFDO0lBRXhELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFxQjtRQUMzQixLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVM7UUFDWixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDZCxJQUFJO2dCQUNGLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQztvQkFDakIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUNsQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQXdCO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxJQUFJLENB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