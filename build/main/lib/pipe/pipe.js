"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipe = void 0;
exports.pipe = pipe;
exports.pipeline = pipeline;
const iter_1 = require("../iter");
class Pipe {
    constructor(func) {
        this.func = func;
    }
    get() {
        return this.func();
    }
    collect(reducer) {
        if (reducer !== undefined)
            return reducer(this.get());
        return [...this.get()];
    }
    $(func) {
        return new Pipe(() => func(this.func()));
    }
    $$(func) {
        return new Pipe(() => (0, iter_1.iter)(this.func()).map(func));
    }
}
exports.Pipe = Pipe;
function pipe(value) {
    return new Pipe(() => value);
}
function pipeline(arg, ...fns) {
    if (fns.length === 0)
        return arg;
    return fns.reduce((acc, fn) => fn(acc), arg);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGlwZS9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWdDQSxvQkFFQztBQWtDRCw0QkFHQztBQXZFRCxrQ0FBK0I7QUFHL0IsTUFBYSxJQUFJO0lBQ2IsWUFBb0IsSUFBYTtRQUFiLFNBQUksR0FBSixJQUFJLENBQVM7SUFBSSxDQUFDO0lBRXRDLEdBQUc7UUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBT0QsT0FBTyxDQUVILE9BQTJDO1FBRTNDLElBQUksT0FBTyxLQUFLLFNBQVM7WUFBRSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsQ0FBQyxDQUFJLElBQW1CO1FBQ3BCLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEVBQUUsQ0FBSSxJQUE4QjtRQUNoQyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUEsV0FBSSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDSjtBQTNCRCxvQkEyQkM7QUFFRCxTQUFnQixJQUFJLENBQUksS0FBUTtJQUM1QixPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFrQ0QsU0FBZ0IsUUFBUSxDQUFPLEdBQU0sRUFBRSxHQUFHLEdBQTBCO0lBQ2hFLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFDakMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==