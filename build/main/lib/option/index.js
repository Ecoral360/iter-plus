"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSome = exports.unwrapOrElse = exports.unwrapOr = exports.unwrap = exports.Some = exports.None = exports.Option = void 0;
class Option {
    constructor(val, _isNone) {
        this.val = val;
        this._isNone = _isNone;
        this.isSome = () => !this._isNone;
        this.isNone = () => this._isNone;
    }
    static _new(val) {
        if (arguments.length === 0) {
            return new Option(undefined, true);
        }
        else {
            return new Option(val, false);
        }
    }
    map(fn) {
        if (this.isSome())
            return (0, exports.Some)(fn(this.val));
        return (0, exports.None)();
    }
    /**
     * Returns the inner value without checking if the value is None.
     * **Only do this if you already checked the value was Some<T>**
     */
    unsafeUnwrap() {
        return this.val;
    }
    /**
     * @throws Error if called on {@link None}
     */
    unwrap() {
        if (this.isNone())
            throw new Error('Attempted to unwrap a None value');
        return this.val;
    }
    unwrapOr(fallback) {
        if (this.isNone())
            return fallback;
        return this.val;
    }
    unwrapOrElse(fallback) {
        if (this.isNone())
            return fallback();
        return this.val;
    }
}
exports.Option = Option;
const None = () => Option._new();
exports.None = None;
const Some = (val) => Option._new(val);
exports.Some = Some;
// -------------------- Pipeable versions of option functions --------------------
const unwrap = (opt) => {
    return opt.unwrap();
};
exports.unwrap = unwrap;
const unwrapOr = (fallback) => {
    return (opt) => (opt.isSome() ? opt.unsafeUnwrap() : fallback);
};
exports.unwrapOr = unwrapOr;
const unwrapOrElse = (fallback) => {
    return (opt) => (opt.isSome() ? opt.unsafeUnwrap() : fallback());
};
exports.unwrapOrElse = unwrapOrElse;
const mapSome = (fn) => {
    return (opt) => {
        if (opt.isSome())
            return (0, exports.Some)(fn(opt.unsafeUnwrap()));
        return (0, exports.None)();
    };
};
exports.mapSome = mapSome;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLE1BQU07SUFDakIsWUFDbUIsR0FBTSxFQUNOLE9BQWdCO1FBRGhCLFFBQUcsR0FBSCxHQUFHLENBQUc7UUFDTixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBYW5DLFdBQU0sR0FBRyxHQUF3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxELFdBQU0sR0FBRyxHQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQWQzQyxDQUFDO0lBSUosTUFBTSxDQUFDLElBQUksQ0FBSSxHQUFPO1FBQ3BCLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUMzQixPQUFPLElBQUksTUFBTSxDQUFDLFNBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksTUFBTSxDQUFDLEdBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQU1ELEdBQUcsQ0FBSSxFQUFpQjtRQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLElBQUEsWUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUEsWUFBSSxHQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUlELFFBQVEsQ0FBQyxRQUFXO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBSUQsWUFBWSxDQUFDLFFBQWlCO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sUUFBUSxFQUFFLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQXRERCx3QkFzREM7QUFLTSxNQUFNLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFBckMsUUFBQSxJQUFJLFFBQWlDO0FBRTNDLE1BQU0sSUFBSSxHQUFHLENBQUksR0FBTSxFQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBZ0IsQ0FBQztBQUFqRSxRQUFBLElBQUksUUFBNkQ7QUFFOUUsa0ZBQWtGO0FBQzNFLE1BQU0sTUFBTSxHQUFHLENBQUksR0FBYyxFQUFLLEVBQUU7SUFDN0MsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFPLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRlcsUUFBQSxNQUFNLFVBRWpCO0FBRUssTUFBTSxRQUFRLEdBQUcsQ0FBSSxRQUFXLEVBQTJCLEVBQUU7SUFDbEUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakUsQ0FBQyxDQUFDO0FBRlcsUUFBQSxRQUFRLFlBRW5CO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FBSSxRQUFpQixFQUEyQixFQUFFO0lBQzVFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDO0FBRlcsUUFBQSxZQUFZLGdCQUV2QjtBQUVLLE1BQU0sT0FBTyxHQUFHLENBQ3JCLEVBQWlCLEVBQ2lCLEVBQUU7SUFDcEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2IsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxJQUFBLFlBQUksRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLElBQUEsWUFBSSxHQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBUFcsUUFBQSxPQUFPLFdBT2xCIn0=