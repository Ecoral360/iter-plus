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
    skip(n) {
        const previousIter = this.iterator;
        return new Iter({
            next() {
                let nextEl = previousIter.next();
                for (let skipped = 0; skipped < n; skipped++) {
                    nextEl = previousIter.next();
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
        return (0, option_1.Some)(current);
    }
    collect() {
        return [...this];
    }
}
exports.Iter = Iter;
function iter(it) {
    if (it instanceof Iter)
        return it;
    return new Iter(it[Symbol.iterator]());
}
iter.take = (n) => {
    return (it) => iter(it).take(n);
};
iter.skip = (n) => {
    return (it) => iter(it).skip(n);
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
iter.reduce = (func, initial) => {
    return (it) => iter(it).reduce(func, initial);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaXRlci9pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWtKQSxvQkFHQztBQXJKRCw2Q0FBc0Q7QUFFdEQsTUFBYSxJQUFJO0lBQ2YsWUFBb0IsUUFBZ0M7UUFBaEMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7SUFBRyxDQUFDO0lBRXhELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFxQjtRQUMzQixLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVM7UUFDWixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDZCxJQUFJO2dCQUNGLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQztvQkFDakIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUNsQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVM7UUFDWixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDZCxJQUFJO2dCQUNGLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakMs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