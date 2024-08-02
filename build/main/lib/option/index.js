"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opt = exports.Some = exports.None = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFdBQVc7SUFDZixZQUE0QixHQUFNO1FBQU4sUUFBRyxHQUFILEdBQUcsQ0FBRztRQUVsQyxXQUFNLEdBQUcsR0FBd0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRW5ELFdBQU0sR0FBRyxHQUF3QixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUM7UUFFdkQsWUFBTyxHQUFHLENBQUssRUFBaUIsRUFBYyxFQUFFO1lBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFBRSxPQUFPLElBQUEsWUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLElBQUEsWUFBSSxHQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBVG1DLENBQUM7SUFXdEM7O09BRUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBSUQsUUFBUSxDQUFDLFFBQVc7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFPRCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBRUQsTUFBTSxLQUFLLEdBQWtCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUkzQyxNQUFNLElBQUksR0FBRyxHQUFxQixFQUFFLENBQUMsSUFBSSxXQUFXLENBQUksS0FBWSxDQUFDLENBQUM7QUFBaEUsUUFBQSxJQUFJLFFBQTREO0FBSXRFLE1BQU0sSUFBSSxHQUFHLENBQUksR0FBTSxFQUFlLEVBQUUsQ0FDN0MsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFnQixDQUFDO0FBRHpCLFFBQUEsSUFBSSxRQUNxQjtBQUV0QyxrRkFBa0Y7QUFDbEYsSUFBaUIsR0FBRyxDQXVCbkI7QUF2QkQsV0FBaUIsS0FBRztJQUNMLFlBQU0sR0FBRyxDQUFJLEdBQWMsRUFBSyxFQUFFO1FBQzdDLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBTyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVXLGNBQVEsR0FBRyxDQUFJLFFBQVcsRUFBMkIsRUFBRTtRQUNsRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDO0lBRVcsa0JBQVksR0FBRyxDQUMxQixRQUFpQixFQUNRLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDO0lBRVcsYUFBTyxHQUFHLENBQ3JCLEVBQWlCLEVBQ2lCLEVBQUU7UUFDcEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2IsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU8sSUFBQSxZQUFJLEVBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sSUFBQSxZQUFJLEdBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDLEVBdkJnQixHQUFHLG1CQUFILEdBQUcsUUF1Qm5CIn0=