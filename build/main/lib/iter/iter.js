"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iter = void 0;
exports.iter = iter;
const option_1 = require("../option");
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
        let idx = 0;
        if (initial !== undefined) {
            current = initial;
        }
        else {
            const next = this.next();
            if (next.done)
                return (0, option_1.None)();
            current = next.value;
            idx++;
        }
        for (const el of this) {
            current = func(current, el, idx);
            idx++;
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
iter.num = {
    sum(it) {
        return iter(it).reduce((prev, curr) => prev + curr, 0);
    },
    square(it) {
        return iter(it).map((n) => n * n);
    },
    pow(n) { },
    /**
     * Greater Than predicate
     */
    gt(n) {
        return (x) => x > n;
    },
    /**
     * Greater Than or Equal predicate
     */
    gte(n) {
        return (x) => x >= n;
    },
    /**
     * Lesser Than predicate
     */
    lt(n) {
        return (x) => x < n;
    },
    /**
     * Lesser Than or Equal predicate
     */
    lte(n) {
        return (x) => x <= n;
    },
};
iter.str = {
    join(sep) {
        return (it) => iter(it).reduce((prev, curr, idx) => idx === 0 ? curr.toString() : prev.toString() + sep + curr.toString(), '');
    },
};
iter.pred = {
    not(f) {
        return ((...arg) => !f(...arg));
    },
    eq(val) {
        return (other) => val === other;
    },
};
iter.obj = {
    prop(name) {
        return (obj) => obj[name];
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaXRlci9pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWtTQSxvQkFRQztBQTFTRCxzQ0FBK0M7QUFFL0MsTUFBYSxJQUFJO0lBQ2IsWUFBb0IsUUFBZ0M7UUFBaEMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7SUFBSSxDQUFDO0lBRXpELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBcUI7UUFDekIsS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDYixDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFTO1FBQ1YsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxPQUFPLElBQUksSUFBSSxDQUFDO1lBQ1osSUFBSTtnQkFDQSxPQUFPLEtBQUssRUFBRSxJQUFJLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUNsQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQXdCO1FBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDWixJQUFJO2dCQUNBLElBQUksUUFBUTtvQkFB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