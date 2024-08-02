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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3BpcGUvcGlwZWFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQTBDO0FBRTFDLElBQWlCLEdBQUcsQ0FzQ25CO0FBdENELFdBQWlCLEdBQUc7SUFDSCxPQUFHLEdBQUcsQ0FBQyxFQUFvQixFQUFVLEVBQUU7UUFDaEQsT0FBTyxJQUFBLFdBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztJQUVXLFVBQU0sR0FBRyxDQUFDLEVBQW9CLEVBQWdCLEVBQUU7UUFDekQsT0FBTyxJQUFBLFdBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFVyxPQUFHLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV0Qzs7T0FFRztJQUNVLE1BQUUsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDVSxPQUFHLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtRQUM3QixPQUFPLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGOztPQUVHO0lBQ1UsTUFBRSxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNVLE9BQUcsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxFQXRDZ0IsR0FBRyxtQkFBSCxHQUFHLFFBc0NuQjtBQUlELElBQWlCLEdBQUcsQ0FNbkI7QUFORCxXQUFpQixLQUFHO0lBQ2hCLFNBQWdCLElBQUksQ0FDaEIsSUFBTztRQUVQLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBSmUsVUFBSSxPQUluQixDQUFBO0FBQ0wsQ0FBQyxFQU5nQixHQUFHLG1CQUFILEdBQUcsUUFNbkIifQ==