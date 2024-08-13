"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = curry;
const iter_1 = require("../iter");
function curry(func) {
    const argStr = (0, iter_1.iter)(func.toString())
        .skipWhile((el) => el !== '(')
        .takeBalanced((el) => el === '(', (el) => el === ')')
        .skip(1)
        .collect(iter_1.iter.str.join(''));
    const args = (0, iter_1.iter)(argStr.split(','));
    return argStr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3V0aWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0JBYUM7QUFmRCxrQ0FBK0I7QUFFL0IsU0FBZ0IsS0FBSyxDQUFrQyxJQUFPO0lBQzFELE1BQU0sTUFBTSxHQUFHLElBQUEsV0FBSSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMvQixTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUM7U0FDN0IsWUFBWSxDQUNULENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUNsQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FDckI7U0FDQSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ1AsT0FBTyxDQUFDLFdBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFaEMsTUFBTSxJQUFJLEdBQUcsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRXJDLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMifQ==