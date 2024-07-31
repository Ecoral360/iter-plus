"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = exports.Some = exports.None = void 0;
class OptionClass {
    constructor(val) {
        this.val = val;
        this.isSome = () => !this.isNone();
        this.isNone = () => this.val === _none;
        this.mapSome = (fn) => {
            if (this.isSome())
                return (0, exports.Some)(fn(this.val));
            return (0, exports.None)();
        };
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
const _none = Symbol('None value');
const None = () => new OptionClass(_none);
exports.None = None;
const Some = (val) => new OptionClass(val);
exports.Some = Some;
// -------------------- Pipeable versions of option functions --------------------
var option;
(function (option) {
    option.unwrap = (opt) => {
        return opt.unwrap();
    };
    option.unwrapOr = (fallback) => {
        return (opt) => (opt.isSome() ? opt.val : fallback);
    };
    option.unwrapOrElse = (fallback) => {
        return (opt) => (opt.isSome() ? opt.val : fallback());
    };
    option.mapSome = (fn) => {
        return (opt) => {
            if (opt.isSome())
                return (0, exports.Some)(fn(opt.val));
            return (0, exports.None)();
        };
    };
})(option || (exports.option = option = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9vcHRpb24vb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sV0FBVztJQUNmLFlBQTRCLEdBQU07UUFBTixRQUFHLEdBQUgsR0FBRyxDQUFHO1FBRWxDLFdBQU0sR0FBRyxHQUF3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbkQsV0FBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQztRQUV2RCxZQUFPLEdBQUcsQ0FBSyxFQUFpQixFQUFjLEVBQUU7WUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU8sSUFBQSxZQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sSUFBQSxZQUFJLEdBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7SUFUbUMsQ0FBQztJQVd0Qzs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFJRCxRQUFRLENBQUMsUUFBVztRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQU9ELFlBQVksQ0FBQyxRQUFpQjtRQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLEtBQUssR0FBa0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBSTNDLE1BQU0sSUFBSSxHQUFHLEdBQXFCLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBSSxLQUFZLENBQUMsQ0FBQztBQUFoRSxRQUFBLElBQUksUUFBNEQ7QUFJdEUsTUFBTSxJQUFJLEdBQUcsQ0FBSSxHQUFNLEVBQWUsRUFBRSxDQUM3QyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQWdCLENBQUM7QUFEekIsUUFBQSxJQUFJLFFBQ3FCO0FBRXRDLGtGQUFrRjtBQUNsRixJQUFpQixNQUFNLENBdUJ0QjtBQXZCRCxXQUFpQixNQUFNO0lBQ1IsYUFBTSxHQUFHLENBQUksR0FBYyxFQUFLLEVBQUU7UUFDN0MsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFPLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRVcsZUFBUSxHQUFHLENBQUksUUFBVyxFQUEyQixFQUFFO1FBQ2xFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUM7SUFFVyxtQkFBWSxHQUFHLENBQzFCLFFBQWlCLEVBQ1EsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUM7SUFFVyxjQUFPLEdBQUcsQ0FDckIsRUFBaUIsRUFDaUIsRUFBRTtRQUNwQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDYixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsT0FBTyxJQUFBLFlBQUksRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsT0FBTyxJQUFBLFlBQUksR0FBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsRUF2QmdCLE1BQU0sc0JBQU4sTUFBTSxRQXVCdEIifQ==