"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.flatMapResults = exports.mapResults = exports.isErr = exports.isOk = exports.unwrapOrElse = exports.unwrapOr = exports.unwrap = exports.Err = exports.Ok = void 0;
const option_1 = require("../option");
function _isOk(val) {
    return '__ok' in val;
}
function _isErr(val) {
    return '__err' in val;
}
function _newResult(val) {
    const result = class {
        isOk() {
            return _isOk(val);
        }
        isOkAnd(pred) {
            return _isOk(val) && pred(val.__ok);
        }
        isErr() {
            return _isErr(val);
        }
        isErrAnd(pred) {
            return _isErr(val) && pred(val.__err);
        }
        ok() {
            return _isOk(val) ? (0, option_1.Some)(val.__ok) : (0, option_1.None)();
        }
        err() {
            return _isErr(val) ? (0, option_1.Some)(val.__err) : (0, option_1.None)();
        }
        map(fn) {
            if (_isOk(val))
                return (0, exports.Ok)(fn(val.__ok));
            return this;
        }
        mapOr(fallbackValue, fn) {
            if (_isOk(val))
                return fn(val.__ok);
            return fallbackValue;
        }
        mapOrElse(fallbackFn, fn) {
            if (_isOk(val))
                return fn(val.__ok);
            return fallbackFn(val.__err);
        }
        mapErr(fn) {
            if (_isErr(val))
                return (0, exports.Err)(fn(val.__err));
            return this;
        }
        inspect(fn) {
            if (_isOk(val))
                void fn(val.__ok);
            return this;
        }
        inspectErr(fn) {
            if (_isErr(val))
                void fn(val.__err);
            return this;
        }
        unwrap() {
            if (_isOk(val))
                return val.__ok;
            throw new Error('Called `unwrap()` on an `Err` value.');
        }
        unwrapOr(fallbackValue) {
            if (_isOk(val))
                return val.__ok;
            return fallbackValue;
        }
        unwrapOrElse(fallbackFn) {
            if (_isOk(val))
                return val.__ok;
            return fallbackFn(val.__err);
        }
        unwrapErr() {
            if (_isErr(val))
                return val.__err;
            throw new Error('Called `unwrapErr()` on an `Ok` value.');
        }
        unwrapUnchecked() {
            return val.__ok;
        }
        unwrapErrUnchecked() {
            return val.__err;
        }
        and(res) {
            if (_isOk(val))
                return res;
            return this;
        }
        andThen(fn) {
            if (_isOk(val))
                return fn(val.__ok);
            return this;
        }
        or(res) {
            if (_isErr(val))
                return res;
            return this;
        }
        orElse(fn) {
            if (_isErr(val))
                return fn(val.__err);
            return this;
        }
        into() {
            return this;
        }
        intoErr() {
            return this;
        }
        transpose() {
            if (_isErr(val))
                return (0, option_1.Some)(this);
            return val.__ok.map((v) => (0, exports.Ok)(v));
        }
        flatten() {
            if (_isOk(val))
                return val.__ok;
            return this;
        }
    };
    return new result();
}
const Ok = (ok) => _newResult({ __ok: ok });
exports.Ok = Ok;
const Err = (err) => _newResult({ __err: err });
exports.Err = Err;
// -------------------- Pipeable versions of resion functions --------------------
const unwrap = (res) => {
    return res.unwrap();
};
exports.unwrap = unwrap;
const unwrapOr = (fallback) => {
    return (res) => (res.isOk() ? res.unwrapUnchecked() : fallback);
};
exports.unwrapOr = unwrapOr;
const unwrapOrElse = (fallback) => {
    return (res) => (res.isOk() ? res.unwrapUnchecked() : fallback());
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
            return val.intoErr();
        oks.push(val.unwrapUnchecked());
    }
    return (0, exports.Ok)(oks);
};
exports.mapResults = mapResults;
const flatMapResults = (arr, fn) => {
    return (0, exports.mapResults)(arr, fn).map((r) => r.flat());
};
exports.flatMapResults = flatMapResults;
const map = (result, fn) => {
    if (result.isOk())
        return (0, exports.Ok)(fn(result.unwrapUnchecked()));
    return result.intoErr();
};
exports.map = map;
// export const mapErr = <T, E, E2>(
//   result: Result<T, E>,
//   fn: (err: E) => E2
// ): Result<T, E2> => {
//   if (isErr(result)) return Err(fn(result.err));
//   return result;
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0Mi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcmVzdWx0L3Jlc3VsdDIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQStDO0FBNEQvQyxTQUFTLEtBQUssQ0FBTyxHQUFvQjtJQUN2QyxPQUFPLE1BQU0sSUFBSSxHQUFHLENBQUM7QUFDdkIsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFPLEdBQW9CO0lBQ3hDLE9BQU8sT0FBTyxJQUFJLEdBQUcsQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQU8sR0FBb0I7SUFDNUMsTUFBTSxNQUFNLEdBQUc7UUFDYixJQUFJO1lBQ0YsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxJQUF3QjtZQUM5QixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxLQUFLO1lBQ0gsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQztRQUNELFFBQVEsQ0FBQyxJQUF5QjtZQUNoQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCxFQUFFO1lBQ0EsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUEsYUFBSSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBQSxhQUFJLEdBQUUsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsR0FBRztZQUNELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFBLGFBQUksRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUEsYUFBSSxHQUFFLENB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