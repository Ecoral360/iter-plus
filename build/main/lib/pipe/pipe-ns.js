"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = exports.num = void 0;
const iter_1 = require("../iter/iter");
var num;
(function (num) {
    num.sum = (it) => {
        return (0, iter_1.iter)(it).reduce((prev, curr) => prev + curr, 0);
    };
    num.square = (it) => {
        return (0, iter_1.iter)(it).map((n) => n * n);
    };
    num.pow = (n) => { };
    /**
     * Greater Than predicate
     */
    num.gt = (n) => {
        return (x) => x > n;
    };
    /**
     * Greater Than or Equal predicate
     */
    num.gte = (n) => {
        return (x) => x >= n;
    };
    /**
     * Lesser Than predicate
     */
    num.lt = (n) => {
        return (x) => x < n;
    };
    /**
     * Lesser Than or Equal predicate
     */
    num.lte = (n) => {
        return (x) => x <= n;
    };
})(num || (exports.num = num = {}));
var obj;
(function (obj_1) {
    function prop(name) {
        return (obj) => obj[name];
    }
    obj_1.prop = prop;
})(obj || (exports.obj = obj = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGlwZS9waXBlLW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUEwQztBQUUxQyxJQUFpQixHQUFHLENBc0NuQjtBQXRDRCxXQUFpQixHQUFHO0lBQ0gsT0FBRyxHQUFHLENBQUMsRUFBb0IsRUFBVSxFQUFFO1FBQ2hELE9BQU8sSUFBQSxXQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUM7SUFFVyxVQUFNLEdBQUcsQ0FBQyxFQUFvQixFQUFnQixFQUFFO1FBQ3pELE9BQU8sSUFBQSxXQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRVcsT0FBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdEM7O09BRUc7SUFDVSxNQUFFLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtRQUM1QixPQUFPLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGOztPQUVHO0lBQ1UsT0FBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNVLE1BQUUsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDVSxPQUFHLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtRQUM3QixPQUFPLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztBQUNOLENBQUMsRUF0Q2dCLEdBQUcsbUJBQUgsR0FBRyxRQXNDbkI7QUFJRCxJQUFpQixHQUFHLENBTW5CO0FBTkQsV0FBaUIsS0FBRztJQUNoQixTQUFnQixJQUFJLENBQ2hCLElBQU87UUFFUCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUplLFVBQUksT0FJbkIsQ0FBQTtBQUNMLENBQUMsRUFOZ0IsR0FBRyxtQkFBSCxHQUFHLFFBTW5CIn0=