"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatMapResults = exports.mapResults = exports.isErr = exports.isOk = exports.unwrapOrElse = exports.unwrapOr = exports.unwrap = exports.Err = exports.Ok = exports.Result = void 0;
class Result {
    constructor(ok, err, _isErr) {
        this.ok = ok;
        this.err = err;
        this._isErr = _isErr;
    }
    isOk() {
        return !this._isErr;
    }
    isErr() {
        return this._isErr;
    }
    map(fn) {
        if (this.isOk())
            return (0, exports.Ok)(fn(this.ok));
        return (0, exports.Err)(this.err);
    }
    /**
     * Returns the inner value without checking if the value is None.
     * **Only do this if you already checked the value was Some<T>**
     */
    unsafeUnwrap() {
        return this.ok;
    }
    /**
     * @throws Error if called on {@link None}
     */
    unwrap() {
        if (this.isErr())
            throw new Error(`Attempted to unwrap an Err value: ${this.err}`);
        return this.ok;
    }
    unwrapOr(fallback) {
        if (this.isErr())
            return fallback;
        return this.ok;
    }
    unwrapOrElse(fallback) {
        if (this.isErr())
            return fallback();
        return this.ok;
    }
}
exports.Result = Result;
const Ok = (ok) => new Result(ok, undefined, false);
exports.Ok = Ok;
const Err = (err) => new Result(undefined, err, true);
exports.Err = Err;
// -------------------- Pipeable versions of option functions --------------------
const unwrap = (opt) => {
    return opt.unwrap();
};
exports.unwrap = unwrap;
const unwrapOr = (fallback) => {
    return (opt) => (opt.isOk() ? opt.unsafeUnwrap() : fallback);
};
exports.unwrapOr = unwrapOr;
const unwrapOrElse = (fallback) => {
    return (opt) => (opt.isOk() ? opt.unsafeUnwrap() : fallback());
};
exports.unwrapOrElse = unwrapOrElse;
const isOk = (result) => result.isOk();
exports.isOk = isOk;
const isErr = (result) => result.isErr();
exports.isErr = isErr;
const mapResults = (arr, fn) => {
    const oks = [];
    for (const el of arr) {
        const val = fn(el);
        if (val.isErr())
            return val;
        oks.push(val.unsafeUnwrap());
    }
    return (0, exports.Ok)(oks);
};
exports.mapResults = mapResults;
const flatMapResults = (arr, fn) => {
    return (0, exports.mapResults)(arr, fn).map((r) => r.flat());
};
exports.flatMapResults = flatMapResults;
// export const map = <T, E, T2>(
//   result: Result<T, E>,
//   fn: (ok: T) => T2
// ): Result<T2, E> => {
//   if (result.isOk()) return Ok(fn(result.unsafeUnwrap()));
//   return result;
// };
// export const mapErr = <T, E, E2>(
//   result: Result<T, E>,
//   fn: (err: E) => E2
// ): Result<T, E2> => {
//   if (isErr(result)) return Err(fn(result.err));
//   return result;
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9yZXN1bHQvcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQWEsTUFBTTtJQUdqQixZQUFxQixFQUFhLEVBQVcsR0FBYyxFQUFVLE1BQWU7UUFBL0QsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFXLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFTO0lBQUcsQ0FBQztJQUV4RixJQUFJO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDckIsQ0FBQztJQUVELEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELEdBQUcsQ0FBSSxFQUFpQjtRQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPLElBQUEsVUFBRSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxPQUFPLElBQUEsV0FBRyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbkUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFJRCxRQUFRLENBQUMsUUFBVztRQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQU9ELFlBQVksQ0FBQyxRQUFp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