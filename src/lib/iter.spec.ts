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
