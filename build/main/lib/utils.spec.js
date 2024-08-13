"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("./utils/utils");
(0, ava_1.default)('curry', (t) => {
    function x(a, b, c) {
        return [a, b, c];
    }
    function y(a, b, c) {
        return [a, b, c];
    }
    const actual = (0, utils_1.curry)(y);
    t.deepEqual(actual, 'a, b, c');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF1QjtBQU92Qix5Q0FBc0M7QUFFdEMsSUFBQSxhQUFJLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDaEIsU0FBUyxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQzdCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxTQUFTLENBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLENBQU87UUFDOUIsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUFHLElBQUEsYUFBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDIn0=