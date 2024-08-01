import test from 'ava';

import { pipe, p, pList, pipeline, num } from './pipe/pipe';

import TEST_OBJ from './obj.test.json';
import { iter } from './iter/iter';
import { None, Option, option, Some } from './option/option';

test('obj', (t) => {
    const keys = Object.keys(TEST_OBJ).map((k) => k.toUpperCase());

    const v = pipe(TEST_OBJ)
        .$(Object.keys)
        .$$((k) => k.toUpperCase())
        .collect();

    t.deepEqual(v, keys);
});

test('iter', (t) => {
    const keys = Object.keys(TEST_OBJ).map((k) => k.toUpperCase());

    const v = pipe(TEST_OBJ)
        .$(Object.keys)
        .$$((k) => k.toUpperCase())
        .collect();

    t.deepEqual(v, keys);
});

test('num.sum', (t) => {
    const expected = 10;

    const actual = pipe(iter(1, 10, 2, 10, 3, 10, 4, 10, 5, 10, 6, 10))
        .$(iter.step(2, { takeFirst: true }))
        .$(iter.take(4))
        .collect(num.sum);

    t.deepEqual(actual, expected);
});

test('pipelines', (t) => {
    const expectedProjects = TEST_OBJ['employees']
        .map((e) => e['projects'])
        .flatMap((ps) => ps.map((p) => p.name));

    const actualProjects = pipe(TEST_OBJ['employees'])
        .$(iter.flatMap((el) => el.projects))
        .$$((el) => el.name)
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
        .$$((el) => el.name)
        .$(iter.reduce((acc, curr) => `${acc}, ${curr}`))
        .$(option.unwrapOr(''))
        .get();

    t.deepEqual(actualProjects, expectedProjects);
});
