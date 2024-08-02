import { iter } from '../iter/iter';
export var num;
(function (num) {
    num.sum = (it) => {
        return iter(it).reduce((prev, curr) => prev + curr, 0);
    };
    num.square = (it) => {
        return iter(it).map((n) => n * n);
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
})(num || (num = {}));
export var obj;
(function (obj_1) {
    function prop(name) {
        return (obj) => obj[name];
    }
    obj_1.prop = prop;
})(obj || (obj = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3BpcGUvcGlwZWFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFRLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUxQyxNQUFNLEtBQVcsR0FBRyxDQXNDbkI7QUF0Q0QsV0FBaUIsR0FBRztJQUNILE9BQUcsR0FBRyxDQUFDLEVBQW9CLEVBQVUsRUFBRTtRQUNoRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztJQUVXLFVBQU0sR0FBRyxDQUFDLEVBQW9CLEVBQWdCLEVBQUU7UUFDekQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRVcsT0FBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdEM7O09BRUc7SUFDVSxNQUFFLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtRQUM1QixPQUFPLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGOztPQUVHO0lBQ1UsT0FBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNVLE1BQUUsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDVSxPQUFHLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtRQUM3QixPQUFPLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztBQUNOLENBQUMsRUF0Q2dCLEdBQUcsS0FBSCxHQUFHLFFBc0NuQjtBQUlELE1BQU0sS0FBVyxHQUFHLENBTW5CO0FBTkQsV0FBaUIsS0FBRztJQUNoQixTQUFnQixJQUFJLENBQ2hCLElBQU87UUFFUCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUplLFVBQUksT0FJbkIsQ0FBQTtBQUNMLENBQUMsRUFOZ0IsR0FBRyxLQUFILEdBQUcsUUFNbkIifQ==