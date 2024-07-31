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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxXQUFXO0lBQ2YsWUFBNEIsR0FBTTtRQUFOLFFBQUcsR0FBSCxHQUFHLENBQUc7UUFFbEMsV0FBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVuRCxXQUFNLEdBQUcsR0FBd0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDO1FBRXZELFlBQU8sR0FBRyxDQUFLLEVBQWlCLEVBQWMsRUFBRTtZQUM5QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsT0FBTyxJQUFBLFlBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0MsT0FBTyxJQUFBLFlBQUksR0FBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztJQVRtQyxDQUFDO0lBV3RDOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUlELFFBQVEsQ0FBQyxRQUFXO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBT0QsWUFBWSxDQUFDLFFBQWlCO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sUUFBUSxFQUFFLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQUVELE1BQU0sS0FBSyxHQUFrQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFJM0MsTUFBTSxJQUFJLEdBQUcsR0FBcUIsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFJLEtBQVksQ0FBQyxDQUFDO0FBQWhFLFFBQUEsSUFBSSxRQUE0RDtBQUl0RSxNQUFNLElBQUksR0FBRyxDQUFJLEdBQU0sRUFBZSxFQUFFLENBQzdDLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBZ0IsQ0FBQztBQUR6QixRQUFBLElBQUksUUFDcUI7QUFFdEMsa0ZBQWtGO0FBQ2xGLElBQWlCLE1BQU0sQ0F1QnRCO0FBdkJELFdBQWlCLE1BQU07SUFDUixhQUFNLEdBQUcsQ0FBSSxHQUFjLEVBQUssRUFBRTtRQUM3QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQU8sQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFVyxlQUFRLEdBQUcsQ0FBSSxRQUFXLEVBQTJCLEVBQUU7UUFDbEUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUVXLG1CQUFZLEdBQUcsQ0FDMUIsUUFBaUIsRUFDUSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQztJQUVXLGNBQU8sR0FBRyxDQUNyQixFQUFpQixFQUNpQixFQUFFO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNiLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFBRSxPQUFPLElBQUEsWUFBSSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQyxPQUFPLElBQUEsWUFBSSxHQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxFQXZCZ0IsTUFBTSxzQkFBTixNQUFNLFFBdUJ0QiJ9