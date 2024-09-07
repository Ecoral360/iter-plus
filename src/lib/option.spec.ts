import test from 'ava';

import { None, Some } from './option';

test('option', (t) => {
  const x = Some(12);

  const z = None();

  const y = x.unwrapOrElse(() => 2);

  const w = z.unwrapOr("a");

  const foo = (param: number) => {
    if (param % 2 == 0) return Some(param)
    return None()
  }


  const result = foo(1);

  t.true(true);
});
