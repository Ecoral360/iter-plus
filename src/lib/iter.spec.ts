import test from 'ava';

import { pipe, p, pList, pipeline, num } from './pipe/pipe';

import TEST_OBJ from './obj.test.json';
import { iter } from './iter/iter';
import { None, Option, option, Some } from './option/option';

test('iter.extend', (t) => {
    const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const iterCDE = iter('a', 'b', 'c', 'd', 'e', 'f').skip(2).take(3);

    const iterFGH = iter('abcdefgh').filter((c) => 'fgh'.includes(c));

    const actual = iter(['a', 'b'])
        .extend(iterCDE, [], [], iterFGH, [])
        .collect();

    t.deepEqual(actual, expected);
});
