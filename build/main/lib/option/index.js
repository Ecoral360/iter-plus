"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opt = exports.Some = exports.None = exports.NoneClass = exports.SomeClass = exports.Option = void 0;
class Option {
    constructor(val) {
        this.isSome = () => !this.isNone();
        this.isNone = () => this.val instanceof NoneClass;
        this.mapSome = (fn) => {
            if (this.isSome())
                return (0, exports.Some)(fn(this.val));
            return (0, exports.None)();
        };
        this.val = val;
    }
    static _new(val) {
        if (arguments.length === 0) {
            return new Option(undefined);
        }
        else {
            return new Option(val);
        }
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
class SomeClass extends Option {
}
exports.SomeClass = SomeClass;
class NoneClass extends Option {
    constructor() {
        super(undefined);
    }
}
exports.NoneClass = NoneClass;
const None = () => Option._new();
exports.None = None;
const Some = (val) => new Option(val);
exports.Some = Some;
// -------------------- Pipeable versions of option functions --------------------
var opt;
(function (opt_1) {
    opt_1.unwrap = (opt) => {
        return opt.unwrap();
    };
    opt_1.unwrapOr = (fallback) => {
        return (opt) => (opt.isSome() ? opt.val : fallback);
    };
    opt_1.unwrapOrElse = (fallback) => {
        return (opt) => (opt.isSome() ? opt.val : fallback());
    };
    opt_1.mapSome = (fn) => {
        return (opt) => {
            if (opt.isSome())
                return (0, exports.Some)(fn(opt.val));
            return (0, exports.None)();
        };
    };
})(opt || (exports.opt = opt = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLE1BQU07SUFHakIsWUFBWSxHQUFNO1FBY2xCLFdBQU0sR0FBRyxHQUF3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbkQsV0FBTSxHQUFHLEdBQXNCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLFNBQVMsQ0FBQztRQUVoRSxZQUFPLEdBQUcsQ0FBSyxFQUFpQixFQUFjLEVBQUU7WUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU8sSUFBQSxZQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sSUFBQSxZQUFJLEdBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7UUFwQkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUlELE1BQU0sQ0FBQyxJQUFJLENBQUksR0FBTztRQUNwQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxTQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksTUFBTSxDQUFDLEdBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBV0Q7O09BRUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBSUQsUUFBUSxDQUFDLFFBQVc7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFPRCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBbERELHdCQWtEQztBQUVELE1BQWEsU0FBYSxTQUFRLE1BQVM7Q0FBRztBQUE5Qyw4QkFBOEM7QUFFOUMsTUFBYSxTQUFVLFNBQVEsTUFBYTtJQUMxQztRQUNFLEtBQUssQ0FBQyxTQUFrQixDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBSkQsOEJBSUM7QUFJTSxNQUFNLElBQUksR0FBRyxHQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQTFDLFFBQUEsSUFBSSxRQUFzQztBQUdoRCxNQUFNLElBQUksR0FBRyxDQUFJLEdBQU0sRUFBYSxFQUFFLENBQzNDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBZ0IsQ0FBQztBQURwQixRQUFBLElBQUksUUFDZ0I7QUFFakMsa0ZBQWtGO0FBQ2xGLElBQWlCLEdBQUcsQ0F1Qm5CO0FBdkJELFdBQWlCLEtBQUc7SUFDTCxZQUFNLEdBQUcsQ0FBSSxHQUFjLEVBQUssRUFBRTtRQUM3QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQU8sQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFVyxjQUFRLEdBQUcsQ0FBSSxRQUFXLEVBQTJCLEVBQUU7UUFDbEUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUVXLGtCQUFZLEdBQUcsQ0FDMUIsUUFBaUIsRUFDUSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQztJQUVXLGFBQU8sR0FBRyxDQUNyQixFQUFpQixFQUNpQixFQUFFO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNiLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFBRSxPQUFPLElBQUEsWUFBSSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQyxPQUFPLElBQUEsWUFBSSxHQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxFQXZCZ0IsR0FBRyxtQkFBSCxHQUFHLFFBdUJuQiJ9