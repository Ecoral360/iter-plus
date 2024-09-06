import test from 'ava';
import { iter } from './iter';
import { op } from './op';
test('iter.extend', (t) => {
    const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const iterCDE = iter('a', 'b', 'c', 'd', 'e', 'f').skip(2).take(3);
    const iterFGH = iter('abcdefgh').filter((c) => 'fgh'.includes(c));
    const actual = iter(['a', 'b'])
        .extend(iterCDE, [], [], iterFGH, [])
        .collect();
    t.deepEqual(actual, expected);
});
test('num.sum', (t) => {
    const expected = 10;
    const actual = iter(1, 10, 2, 10, 3, 10, 4, 10, 5, 10, 6, 10)
        .step(2, { takeFirst: true })
        .take(4)
        .collect(op.sum);
    t.deepEqual(actual, expected);
});
test('skip and skipWhile', (t) => {
    const expected = 28;
    const part1 = iter(1, 2, 3, 4, 5, 6, 10).skip(2).collect(op.sum);
    const part2 = iter(1, 2, 3, 4, 5, 6, 10).skipWhile(op.lt(3)).collect(op.sum);
    t.deepEqual(part1, expected);
    t.deepEqual(part2, expected);
});
test('take and takeWhile', (t) => {
    const expected = 10;
    const part1 = iter(1, 2, 3, 4, 5, 6, 10).take(4).collect(op.sum);
    const part2 = iter(1, 2, 3, 4, 5, 6, 10).takeWhile(op.lt(5)).collect(op.sum);
    t.deepEqual(part1, expected);
    t.deepEqual(part2, expected);
});
test('batch', (t) => {
    const expected = [[1, 2, 3], [4, 5, 6], [10]];
    const part1 = iter(1, 2, 3, 4, 5, 6, 10)
        .batch(3)
        .map(iter.collect())
        .collect();
    console.log(part1);
    t.deepEqual(part1, expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pdGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDeEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFMUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO1NBQ3BDLE9BQU8sRUFBRSxDQUFDO0lBRWIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUMxRCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzVCLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDUCxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDL0IsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDL0IsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2xCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNyQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQixPQUFPLEVBQUUsQ0FBQztJQUViLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMifQ==