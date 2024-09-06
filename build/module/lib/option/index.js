export class Option {
    val;
    constructor(val) {
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
    isSome = () => !this.isNone();
    isNone = () => this.val instanceof NoneClass;
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
export class SomeClass extends Option {
}
export class NoneClass extends Option {
    constructor() {
        super(undefined);
    }
}
export const None = () => Option._new();
export const Some = (val) => new Option(val);
// -------------------- Pipeable versions of option functions --------------------
export var opt;
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
                return Some(fn(opt.val));
            return None();
        };
    };
})(opt || (opt = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sTUFBTTtJQUNELEdBQUcsQ0FBSTtJQUV2QixZQUFZLEdBQU07UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUlELE1BQU0sQ0FBQyxJQUFJLENBQUksR0FBTztRQUNwQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxTQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksTUFBTSxDQUFDLEdBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVuRCxNQUFNLEdBQUcsR0FBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksU0FBUyxDQUFDO0lBRWhFLE9BQU8sR0FBRyxDQUFLLEVBQWlCLEVBQWMsRUFBRTtRQUM5QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFJRCxRQUFRLENBQUMsUUFBVztRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQU9ELFlBQVksQ0FBQyxRQUFpQjtRQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sU0FBYSxTQUFRLE1BQVM7Q0FBRztBQUU5QyxNQUFNLE9BQU8sU0FBVSxTQUFRLE1BQWE7SUFDMUM7UUFDRSxLQUFLLENBQUMsU0FBa0IsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUlELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxHQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0FBR3ZELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFJLEdBQU0sRUFBYSxFQUFFLENBQzNDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBZ0IsQ0FBQztBQUVqQyxrRkFBa0Y7QUFDbEYsTUFBTSxLQUFXLEdBQUcsQ0F1Qm5CO0FBdkJELFdBQWlCLEtBQUc7SUFDTCxZQUFNLEdBQUcsQ0FBSSxHQUFjLEVBQUssRUFBRTtRQUM3QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQU8sQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFVyxjQUFRLEdBQUcsQ0FBSSxRQUFXLEVBQTJCLEVBQUU7UUFDbEUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUVXLGtCQUFZLEdBQUcsQ0FDMUIsUUFBaUIsRUFDUSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQztJQUVXLGFBQU8sR0FBRyxDQUNyQixFQUFpQixFQUNpQixFQUFFO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNiLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDLEVBdkJnQixHQUFHLEtBQUgsR0FBRyxRQXVCbkIifQ==