"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const iter_1 = require("./iter");
(0, ava_1.default)('iter.extend', (t) => {
    const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const iterCDE = (0, iter_1.iter)('a', 'b', 'c', 'd', 'e', 'f').skip(2).take(3);
    const iterFGH = (0, iter_1.iter)('abcdefgh').filter((c) => 'fgh'.includes(c));
    const actual = (0, iter_1.iter)(['a', 'b'])
        .extend(iterCDE, [], [], iterFGH, [])
        .collect();
    t.deepEqual(actual, expected);
});
(0, ava_1.default)('num.sum', (t) => {
    const expected = 10;
    const actual = (0, iter_1.iter)(1, 10, 2, 10, 3, 10, 4, 10, 5, 10, 6, 10)
        .step(2, { takeFirst: true })
        .take(4)
        .collect(iter_1.iter.num.sum);
    t.deepEqual(actual, expected);
});
(0, ava_1.default)('skip and skipWhile', (t) => {
    const expected = 28;
    const part1 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .skip(2)
        .collect(iter_1.iter.num.sum);
    const part2 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .skipWhile(iter_1.iter.num.lt(3))
        .collect(iter_1.iter.num.sum);
    t.deepEqual(part1, expected);
    t.deepEqual(part2, expected);
});
(0, ava_1.default)('take and takeWhile', (t) => {
    const expected = 10;
    const part1 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .take(4)
        .collect(iter_1.iter.num.sum);
    const part2 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .takeWhile(iter_1.iter.num.lt(5))
        .collect(iter_1.iter.num.sum);
    t.deepEqual(part1, expected);
    t.deepEqual(part2, expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pdGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBdUI7QUFFdkIsaUNBQThCO0FBRTlCLElBQUEsYUFBSSxFQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTFELE1BQU0sT0FBTyxHQUFHLElBQUEsV0FBSSxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRSxNQUFNLE9BQU8sR0FBRyxJQUFBLFdBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRSxNQUFNLE1BQU0sR0FBRyxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxQixNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQztTQUNwQyxPQUFPLEVBQUUsQ0FBQztJQUVmLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxhQUFJLEVBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLE1B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