"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapErr = exports.mapOk = exports.flatMapResults = exports.mapResults = exports.isErr = exports.isOk = exports.Err = exports.Ok = void 0;
const Ok = (ok) => ({ ok });
exports.Ok = Ok;
const Err = (err) => ({ err });
exports.Err = Err;
const isOk = (result) => 'ok' in result;
exports.isOk = isOk;
const isErr = (result) => 'err' in result;
exports.isErr = isErr;
const mapResults = (arr, fn) => {
    const oks = [];
    for (const el of arr) {
        const val = fn(el);
        if ('err' in val)
            return val;
        oks.push(val.ok);
    }
    return (0, exports.Ok)(oks);
};
exports.mapResults = mapResults;
const flatMapResults = (arr, fn) => {
    const oks = [];
    for (const el of arr) {
        const val = fn(el);
        if ('err' in val)
            return val;
        oks.push(val.ok);
    }
    return (0, exports.Ok)(oks.flat());
};
exports.flatMapResults = flatMapResults;
const mapOk = (result, fn) => {
    if ((0, exports.isOk)(result))
        return (0, exports.Ok)(fn(result.ok));
    return result;
};
exports.mapOk = mapOk;
const mapErr = (result, fn) => {
    if ((0, exports.isErr)(result))
        return (0, exports.Err)(fn(result.err));
    return result;
};
exports.mapErr = mapErr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9yZXN1bHQvcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtPLE1BQU0sRUFBRSxHQUFHLENBQU8sRUFBSyxFQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFBN0MsUUFBQSxFQUFFLE1BQTJDO0FBQ25ELE1BQU0sR0FBRyxHQUFHLENBQU8sR0FBTSxFQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFBaEQsUUFBQSxHQUFHLE9BQTZDO0FBRXRELE1BQU0sSUFBSSxHQUFHLENBQU8sTUFBb0IsRUFBdUIsRUFBRSxDQUN0RSxJQUFJLElBQUksTUFBTSxDQUFDO0FBREosUUFBQSxJQUFJLFFBQ0E7QUFFVixNQUFNLEtBQUssR0FBRyxDQUFPLE1BQW9CLEVBQXdCLEVBQUUsQ0FDeEUsS0FBSyxJQUFJLE1BQU0sQ0FBQztBQURMLFFBQUEsS0FBSyxTQUNBO0FBRVgsTUFBTSxVQUFVLEdBQUcsQ0FDeEIsR0FBUSxFQUNSLEVBQTJCLEVBQ1gsRUFBRTtJQUNsQixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLEtBQUssSUFBSSxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUNELE9BQU8sSUFBQSxVQUFFLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBWFcsUUFBQSxVQUFVLGNBV3JCO0FBRUssTUFBTSxjQUFjLEdBQUcsQ0FDNUIsR0FBUSxFQUNSLEVBQTZCLEVBQ2IsRUFBRTtJQUNsQixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLEtBQUssSUFBSSxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUNELE9BQU8sSUFBQSxVQUFFLEVBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBWFcsUUFBQSxjQUFjLGtCQVd6QjtBQUVLLE1BQU0sS0FBSyxHQUFHLENBQ25CLE1BQW9CLEVBQ3BCLEVBQWlCLEVBQ0YsRUFBRTtJQUNqQixJQUFJLElBQUEsWUFBSSxFQUFDLE1BQU0sQ0FBQztRQUFFLE9BQU8sSUFBQSxVQUFFLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQU5XLFFBQUEsS0FBSyxTQU1oQjtBQUVLLE1BQU0sTUFBTSxHQUFHLENBQ3BCLE1BQW9CLEVBQ3BCLEVBQWtCLEVBQ0gsRUFBRTtJQUNqQixJQUFJLElBQUEsYUFBSyxFQUFDLE1BQU0sQ0FBQztRQUFFLE9BQU8sSUFBQSxXQUFHLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQU5XLFFBQUEsTUFBTSxVQU1qQiJ9