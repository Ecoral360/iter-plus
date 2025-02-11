import { iter } from '../iter';
export class Pipe {
    func;
    constructor(func) {
        this.func = func;
    }
    get() {
        return this.func();
    }
    collect(reducer) {
        if (reducer !== undefined)
            return reducer(this.get());
        return [...this.get()];
    }
    $(func) {
        return new Pipe(() => func(this.func()));
    }
    $$(func) {
        return new Pipe(() => iter(this.func()).map(func));
    }
}
export function pipe(value) {
    return new Pipe(() => value);
}
export function pipeline(arg, ...fns) {
    if (fns.length === 0)
        return arg;
    return fns.reduce((acc, fn) => fn(acc), arg);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGlwZS9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHL0IsTUFBTSxPQUFPLElBQUk7SUFDTztJQUFwQixZQUFvQixJQUFhO1FBQWIsU0FBSSxHQUFKLElBQUksQ0FBUztJQUFJLENBQUM7SUFFdEMsR0FBRztRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFPRCxPQUFPLENBRUgsT0FBMkM7UUFFM0MsSUFBSSxPQUFPLEtBQUssU0FBUztZQUFFLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxDQUFDLENBQUksSUFBbUI7UUFDcEIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsRUFBRSxDQUFJLElBQThCO1FBQ2hDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxJQUFJLENBQUksS0FBUTtJQUM1QixPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFrQ0QsTUFBTSxVQUFVLFFBQVEsQ0FBTyxHQUFNLEVBQUUsR0FBRyxHQUEwQjtJQUNoRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDO0lBQ2pDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNqRCxDQUFDIn0=