import test from 'ava';

import { curry } from './utils/utils';
import { op } from './op';

test('curry', (t) => {
  function x(a: any, b: any, c: any) {
    return [a, b, c];
  }

  function y(a: any, b: any, c?: any) {
    return [a, b, c];
  }

  const actual = curry(y).collect(op.join(', '));

  t.deepEqual(actual, 'a, b, c');
});
