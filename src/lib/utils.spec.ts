import test from 'ava';

import { pipe } from './pipe/pipe';

import TEST_OBJ from './obj.test.json';
import { iter } from './iter';
import { opt } from './option';
import { curry } from './utils/utils';

test('curry', (t) => {
    function x(a: any, b: any, c: any) {
        return [a, b, c];
    }

    function y(a: any, b: any, c?: any) {
        return [a, b, c];
    }

    const actual = curry(y);

    t.deepEqual(actual, 'a, b, c');
});
