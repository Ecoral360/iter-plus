class OptionClass {
    val;
    constructor(val) {
        this.val = val;
    }
    isSome = () => !this.isNone();
    isNone = () => this.val === _none;
    mapSome = (fn) => {
        if (this.isSome())
            return Some(fn(this.val));
        return None();
    };
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
export const None = () => new OptionClass(_none);
export const Some = (val) => new OptionClass(val);
// -------------------- Pipeable versions of option functions --------------------
export var option;
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
                return Some(fn(opt.val));
            return None();
        };
    };
})(option || (option = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9vcHRpb24vb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sV0FBVztJQUNhO0lBQTVCLFlBQTRCLEdBQU07UUFBTixRQUFHLEdBQUgsR0FBRyxDQUFHO0lBQUcsQ0FBQztJQUV0QyxNQUFNLEdBQUcsR0FBd0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRW5ELE1BQU0sR0FBRyxHQUF3QixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUM7SUFFdkQsT0FBTyxHQUFHLENBQUssRUFBaUIsRUFBYyxFQUFFO1FBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztJQUVGOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUlELFFBQVEsQ0FBQyxRQUFXO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBT0QsWUFBWSxDQUFDLFFBQWlCO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sUUFBUSxFQUFFLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQUVELE1BQU0sS0FBSyxHQUFrQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFJbEQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQXFCLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBSSxLQUFZLENBQUMsQ0FBQztBQUk3RSxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBSSxHQUFNLEVBQWUsRUFBRSxDQUM3QyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQWdCLENBQUM7QUFFdEMsa0ZBQWtGO0FBQ2xGLE1BQU0sS0FBVyxNQUFNLENBdUJ0QjtBQXZCRCxXQUFpQixNQUFNO0lBQ1IsYUFBTSxHQUFHLENBQUksR0FBYyxFQUFLLEVBQUU7UUFDN0MsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFPLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRVcsZUFBUSxHQUFHLENBQUksUUFBVyxFQUEyQixFQUFFO1FBQ2xFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUM7SUFFVyxtQkFBWSxHQUFHLENBQzFCLFFBQWlCLEVBQ1EsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUM7SUFFVyxjQUFPLEdBQUcsQ0FDckIsRUFBaUIsRUFDaUIsRUFBRTtRQUNwQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDYixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxFQXZCZ0IsTUFBTSxLQUFOLE1BQU0sUUF1QnRCIn0=