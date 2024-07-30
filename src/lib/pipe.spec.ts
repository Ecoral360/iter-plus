import test from 'ava';

import { pipe, p, pList, pipeline } from './pipe/pipe';

import TEST_OBJ from './obj.test.json';
import { iter } from './iter/iter';
import { None, Option, option, Some } from './option';

test('obj', (t) => {
  const keys = Object.keys(TEST_OBJ).map((k) => k.toUpperCase());

  const v = pipe(TEST_OBJ)
    .$(Object.keys)
    .$(pList.map((k) => k.toUpperCase()))
    .get();

  t.deepEqual(v, keys);
});

test('iter', (t) => {
  const keys = Object.keys(TEST_OBJ).map((k) => k.toUpperCase());

  const v = pipe(TEST_OBJ)
    .$(Object.keys)
    .$(p.map((k) => k.toUpperCase()))
    .get()
    .collect();

  t.deepEqual(v, keys);
});

test('pipelines', (t) => {
  const expectedProjects = TEST_OBJ['employees']
    .map((e) => e['projects'])
    .flatMap((ps) => ps.map((p) => p.name));

  const actualProjects = pipe(TEST_OBJ['employees'])
    .$(iter.flatMap((el) => el.projects))
    .$(iter.map((el) => el.name))
    .get()
    .collect();

  t.deepEqual(actualProjects, expectedProjects);
});

test('pipelines 2', (t) => {
  const expectedProjects = TEST_OBJ['employees']
    .map((e) => e['projects'])
    .flatMap((ps) => ps.map((p) => p.name))
    .reduce((acc, curr) => `${acc}, ${curr}`);

  const actualProjects = pipe(TEST_OBJ['employees'])
    .$(iter.flatMap((el) => el.projects))
    .$(iter.map((el) => el.name))
    .$(iter.reduce((acc, curr) => `${acc}, ${curr}`))
    .$(option.unwrapOr(''))
    .get();

  t.deepEqual(actualProjects, expectedProjects);
});
