import test from 'ava';

import { Err, Ok, Result } from './result';
import { Some } from './option';

test('General Result', (t) => {
  let goodResult: Result<number, number> = Ok(10);
  let badResult: Result<number, number> = Err(10);
  t.assert(goodResult.isOk() && !goodResult.isErr());
  t.assert(badResult.isErr() && !badResult.isOk());

  // `map` and `map_err` consume the `Result` and produce another.
  goodResult = goodResult.map((i) => i + 1);
  badResult = badResult.mapErr((i) => i - 1);
  t.deepEqual(goodResult, Ok(11));
  t.deepEqual(badResult, Err(9));

  // Use `and_then` to continue the computation.
  const newGoodResult = goodResult.andThen((i) => Ok(i == 11));
  t.deepEqual(newGoodResult, Ok(true));

  // Use `or_else` to handle the error.
  badResult = badResult.orElse((i) => Ok(i + 20));
  t.deepEqual(badResult, Ok(29));

  // Consume the result and return the contents with `unwrap`.
  const final_awesome_result = newGoodResult.unwrap();
  t.assert(final_awesome_result);
});

test('Result.flatten()', (t) => {
  const x = Ok(Ok('hello'));
  t.deepEqual(Ok('hello'), x.flatten());

  const y = Ok(Err(6));
  t.deepEqual(Err(6), y.flatten());

  const z: Result<Result<string, number>, number> = Err(6);
  t.deepEqual(Err(6), z.flatten());
});

test('Result.transpose()', (t) => {
  const x = Ok(Some(5));
  const y = Some(Ok(5));

  t.deepEqual(x.transpose().unwrap(), y.unwrap());
});
