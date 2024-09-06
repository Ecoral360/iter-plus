"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("./utils/utils");
const op_1 = require("./op");
(0, ava_1.default)('curry', (t) => {
    function x(a, b, c) {
        return [a, b, c];
    }
    function y(a, b, c) {
        return [a, b, c];
    }
    const actual = (0, utils_1.curry)(y).collect(op_1.op.join(', '));
    t.deepEqual(actual, 'a, b, c');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF1QjtBQUV2Qix5Q0FBc0M7QUFDdEMsNkJBQTBCO0FBRTFCLElBQUEsYUFBSSxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2xCLFNBQVMsQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUMvQixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsU0FBUyxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxDQUFPO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGFBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRS9DLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDIn0=