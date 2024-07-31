"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = exports.pList = exports.Pipe = void 0;
exports.pipe = pipe;
exports.pipeline = pipeline;
const iter_1 = require("../iter/iter");
__exportStar(require("./pipe-ns"), exports);
class Pipe {
    constructor(func) {
        this.func = func;
    }
    get() {
        return this.func();
    }
    collect() {
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
var pList;
(function (pList) {
    function map(f) {
        return (arr) => arr.map(f);
    }
    pList.map = map;
})(pList || (exports.pList = pList = {}));
var p;
(function (p) {
    function map(f) {
        return (arr) => (0, iter_1.iter)(arr).map(f);
    }
    p.map = map;
})(p || (exports.p = p = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGlwZS9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLG9CQUVDO0FBa0NELDRCQUdDO0FBaEVELHVDQUFvQztBQUdwQyw0Q0FBMEI7QUFFMUIsTUFBYSxJQUFJO0lBQ2YsWUFBb0IsSUFBYTtRQUFiLFNBQUksR0FBSixJQUFJLENBQVM7SUFBRyxDQUFDO0lBRXJDLEdBQUc7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxDQUFDLENBQUksSUFBbUI7UUFDdEIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsRUFBRSxDQUFJLElBQThCO1FBQ2xDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBQSxXQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBVyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGO0FBbEJELG9CQWtCQztBQUVELFNBQWdCLElBQUksQ0FBSSxLQUFRO0lBQzlCLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQWtDRCxTQUFnQixRQUFRLENBQU8sR0FBTSxFQUFFLEdBQUcsR0FBMEI7SUFDbEUsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUNqQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVELElBQWlCLEtBQUssQ0FJckI7QUFKRCxXQUFpQixLQUFLO0lBQ3BCLFNBQWdCLEdBQUcsQ0FBTyxDQUFnQjtRQUN4QyxPQUFPLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFGZSxTQUFHLE1BRWxCLENBQUE7QUFDSCxDQUFDLEVBSmdCLEtBQUsscUJBQUwsS0FBSyxRQUlyQjtBQUVELElBQWlCLENBQUMsQ0FJakI7QUFKRCxXQUFpQixDQUFDO0lBQ2hCLFNBQWdCLEdBQUcsQ0FBTyxDQUFnQjtRQUN4QyxPQUFPLENBQUMsR0FBZ0IsRUFBRSxFQUFFLENBQUMsSUFBQSxXQUFJLEVBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFGZSxLQUFHLE1BRWxCLENBQUE7QUFDSCxDQUFDLEVBSmdCLENBQUMsaUJBQUQsQ0FBQyxRQUlqQiJ9