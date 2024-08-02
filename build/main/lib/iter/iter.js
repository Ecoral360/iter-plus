"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iter = void 0;
exports.iter = iter;
const option_1 = require("../option/option");
class Iter {
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
                    stopSkip || (stopSkip = nextEl.done || !test(nextEl.value));
                } while (!stopSkip);
                return nextEl;
            },
        });
    }
    nth(n) {
        const next = this.skip(n).next();
        if (next.done)
            return (0, option_1.None)();
        return (0, option_1.Some)(next.value);
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
                return { value: result.val, done: false };
            },
        });
    }
    flatten() {
        const previousIter = this.iterator;
        let currIter;
        return new Iter({
            next() {
                let currIterNext = currIter === null || currIter === void 0 ? void 0 : currIter.next();
                if (currIterNext === undefined || (currIterNext === null || currIterNext === void 0 ? void 0 : currIterNext.done)) {
                    const maybeCurrIter = previousIter.next();
                    if (maybeCurrIter.done)
                        return { value: undefined, done: true };
                    currIter = maybeCurrIter.value[Symbol.iterator]();
                    currIterNext = currIter === null || currIter === void 0 ? void 0 : currIter.next();
                }
                return { value: currIterNext.value, done: false };
            },
        });
    }
    reduce(func, initial) {
        let current;
        if (initial !== undefined) {
            current = initial;
        }
        else {
            const next = this.next();
            if (next.done)
                return (0, option_1.None)();
            current = next.value;
        }
        for (const el of this) {
            current = func(current, el);
        }
        if (initial !== undefined)
            return current;
        return (0, option_1.Some)(current);
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
exports.Iter = Iter;
function iter(it, ...elements) {
    if (elements.length > 0) {
        elements.splice(0, 0, it);
        return new Iter(elements[Symbol.iterator]());
    }
    if (it instanceof Iter)
        return it;
    return new Iter(it[Symbol.iterator]());
}
iter.extend = (iterable) => {
    return (it) => iter(it);
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
iter.reduce = ((func, initial) => {
    return (it) => iter(it).reduce(func, initial);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaXRlci9pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQThPQSxvQkFRQztBQXRQRCw2Q0FBc0Q7QUFFdEQsTUFBYSxJQUFJO0lBQ2IsWUFBb0IsUUFBZ0M7UUFBaEMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7SUFBSSxDQUFDO0lBRXpELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBcUI7UUFDekIsS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDYixDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFTO1FBQ1YsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxPQUFPLElBQUksSUFBSSxDQUFDO1lBQ1osSUFBSTtnQkFDQSxPQUFPLEtBQUssRUFBRSxJQUFJLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUNsQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQXdCO1FBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDWixJQUFJO2dCQUNBLElBQUksUUFBUTtvQkFB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