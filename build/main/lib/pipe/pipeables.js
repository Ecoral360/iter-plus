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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWFibGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9waXBlL3BpcGVhYmxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBMEM7QUFFMUMsSUFBaUIsR0FBRyxDQXNDbkI7QUF0Q0QsV0FBaUIsR0FBRztJQUNILE9BQUcsR0FBRyxDQUFDLEVBQW9CLEVBQVUsRUFBRTtRQUNoRCxPQUFPLElBQUEsV0FBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDO0lBRVcsVUFBTSxHQUFHLENBQUMsRUFBb0IsRUFBZ0IsRUFBRTtRQUN6RCxPQUFPLElBQUEsV0FBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVXLE9BQUcsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXRDOztPQUVHO0lBQ1UsTUFBRSxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNVLE9BQUcsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDVSxNQUFFLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtRQUM1QixPQUFPLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGOztPQUVHO0lBQ1UsT0FBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7QUFDTixDQUFDLEVBdENnQixHQUFHLG1CQUFILEdBQUcsUUFzQ25CO0FBSUQsSUFBaUIsR0FBRyxDQU1uQjtBQU5ELFdBQWlCLEtBQUc7SUFDaEIsU0FBZ0IsSUFBSSxDQUNoQixJQUFPO1FBRVAsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFKZSxVQUFJLE9BSW5CLENBQUE7QUFDTCxDQUFDLEVBTmdCLEdBQUcsbUJBQUgsR0FBRyxRQU1uQiJ9