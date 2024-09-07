export class Option {
    val;
    _isNone;
    constructor(val, _isNone) {
        this.val = val;
        this._isNone = _isNone;
    }
    static _new(val) {
        if (arguments.length === 0) {
            return new Option(undefined, true);
        }
        else {
            return new Option(val, false);
        }
    }
    isSome = () => !this._isNone;
    isNone = () => this._isNone;
    map(fn) {
        if (this.isSome())
            return Some(fn(this.val));
        return None();
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
export const None = () => Option._new();
export const Some = (val) => Option._new(val);
// -------------------- Pipeable versions of option functions --------------------
export const unwrap = (opt) => {
    return opt.unwrap();
};
export const unwrapOr = (fallback) => {
    return (opt) => (opt.isSome() ? opt.unsafeUnwrap() : fallback);
};
export const unwrapOrElse = (fallback) => {
    return (opt) => (opt.isSome() ? opt.unsafeUnwrap() : fallback());
};
export const mapSome = (fn) => {
    return (opt) => {
        if (opt.isSome())
            return Some(fn(opt.unsafeUnwrap()));
        return None();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sTUFBTTtJQUVFO0lBQ0E7SUFGbkIsWUFDbUIsR0FBTSxFQUNOLE9BQWdCO1FBRGhCLFFBQUcsR0FBSCxHQUFHLENBQUc7UUFDTixZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQ2hDLENBQUM7SUFJSixNQUFNLENBQUMsSUFBSSxDQUFJLEdBQU87UUFDcEIsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzNCLE9BQU8sSUFBSSxNQUFNLENBQUMsU0FBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QyxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFFbEQsTUFBTSxHQUFHLEdBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBRTlDLEdBQUcsQ0FBSSxFQUFpQjtRQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBSUQsUUFBUSxDQUFDLFFBQVc7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFJRCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBS0QsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVsRCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBSSxHQUFNLEVBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixDQUFDO0FBRTlFLGtGQUFrRjtBQUNsRixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBSSxHQUFjLEVBQUssRUFBRTtJQUM3QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQU8sQ0FBQztBQUMzQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsQ0FBSSxRQUFXLEVBQTJCLEVBQUU7SUFDbEUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakUsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUksUUFBaUIsRUFBMkIsRUFBRTtJQUM1RSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUNyQixFQUFpQixFQUNpQixFQUFFO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNiLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=