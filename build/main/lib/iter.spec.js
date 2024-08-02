"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const iter_1 = require("./iter/iter");
const pipeables_1 = require("./pipe/pipeables");
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
        .collect(pipeables_1.num.sum);
    t.deepEqual(actual, expected);
});
(0, ava_1.default)('skip and skipWhile', (t) => {
    const expected = 28;
    const part1 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .skip(2)
        .collect(pipeables_1.num.sum);
    const part2 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .skipWhile(pipeables_1.num.lt(3))
        .collect(pipeables_1.num.sum);
    t.deepEqual(part1, expected);
    t.deepEqual(part2, expected);
});
(0, ava_1.default)('take and takeWhile', (t) => {
    const expected = 10;
    const part1 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .take(4)
        .collect(pipeables_1.num.sum);
    const part2 = (0, iter_1.iter)(1, 2, 3, 4, 5, 6, 10)
        .takeWhile(pipeables_1.num.lt(5))
        .collect(pipeables_1.num.sum);
    t.deepEqual(part1, expected);
    t.deepEqual(part2, expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pdGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBdUI7QUFFdkIsc0NBQW1DO0FBQ25DLGdEQUF1QztBQUV2QyxJQUFBLGFBQUksRUFBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0QixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUUxRCxNQUFNLE9BQU8sR0FBRyxJQUFBLFdBQUksRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkUsTUFBTSxPQUFPLEdBQUcsSUFBQSxXQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEUsTUFBTSxNQUFNLEdBQUcsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUIsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7U0FDcEMsT0FBTyxFQUFFLENBQUM7SUFFZixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsYUFBSSxFQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2xCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVwQixNQUFNLE1BQU0sR0FBRyxJQUFBLFdBQUksRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUN4RCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzVCLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDUCxPQUFPLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxhQUFJLEVBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM3QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIsTUFBTSxLQUFLLEdBQUcsSUFBQSxXQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ25DLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDUCxPQUFPLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLE1BQU0sS0FBSyxHQUFHLElBQUEsV0FBSSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNuQyxTQUFTLENBQUMsZUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQixPQUFPLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxhQUFJLEVBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM3QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIsTUFBTSxLQUFLLEdBQUcsSUFBQSxXQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ25DLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDUCxPQUFPLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLE1BQU0sS0FBSyxHQUFHLElBQUEsV0FBSSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNuQyxTQUFTLENBQUMsZUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQixPQUFPLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDIn0=