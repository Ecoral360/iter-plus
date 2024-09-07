import test from 'ava';

import { pipe } from './pipe/pipe';

import TEST_OBJ from './obj.test.json';
import { iter } from './iter';
import { option } from '..';

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
