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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxXQUFXO0lBQ2E7SUFBNUIsWUFBNEIsR0FBTTtRQUFOLFFBQUcsR0FBSCxHQUFHLENBQUc7SUFBRyxDQUFDO0lBRXRDLE1BQU0sR0FBRyxHQUF3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFbkQsTUFBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQztJQUV2RCxPQUFPLEdBQUcsQ0FBSyxFQUFpQixFQUFjLEVBQUU7UUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBSUQsUUFBUSxDQUFDLFFBQVc7UUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFPRCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBRUQsTUFBTSxLQUFLLEdBQWtCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUlsRCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsR0FBcUIsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFJLEtBQVksQ0FBQyxDQUFDO0FBSTdFLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFJLEdBQU0sRUFBZSxFQUFFLENBQzdDLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBZ0IsQ0FBQztBQUV0QyxrRkFBa0Y7QUFDbEYsTUFBTSxLQUFXLE1BQU0sQ0F1QnRCO0FBdkJELFdBQWlCLE1BQU07SUFDUixhQUFNLEdBQUcsQ0FBSSxHQUFjLEVBQUssRUFBRTtRQUM3QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQU8sQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFVyxlQUFRLEdBQUcsQ0FBSSxRQUFXLEVBQTJCLEVBQUU7UUFDbEUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUVXLG1CQUFZLEdBQUcsQ0FDMUIsUUFBaUIsRUFDUSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQztJQUVXLGNBQU8sR0FBRyxDQUNyQixFQUFpQixFQUNpQixFQUFFO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNiLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDLEVBdkJnQixNQUFNLEtBQU4sTUFBTSxRQXVCdEIifQ==