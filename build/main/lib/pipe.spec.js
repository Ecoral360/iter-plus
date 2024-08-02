"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const pipe_1 = require("./pipe/pipe");
const obj_test_json_1 = __importDefault(require("./obj.test.json"));
const iter_1 = require("./iter");
const option_1 = require("./option");
(0, ava_1.default)('obj', (t) => {
    const keys = Object.keys(obj_test_json_1.default).map((k) => k.toUpperCase());
    const v = (0, pipe_1.pipe)(obj_test_json_1.default)
        .$(Object.keys)
        .$$((k) => k.toUpperCase())
        .collect();
    t.deepEqual(v, keys);
});
(0, ava_1.default)('iter', (t) => {
    const keys = Object.keys(obj_test_json_1.default).map((k) => k.toUpperCase());
    const v = (0, pipe_1.pipe)(obj_test_json_1.default)
        .$(Object.keys)
        .$$((k) => k.toUpperCase())
        .collect();
    t.deepEqual(v, keys);
});
(0, ava_1.default)('pipelines', (t) => {
    const expectedProjects = obj_test_json_1.default['employees']
        .map((e) => e['projects'])
        .flatMap((ps) => ps.map((p) => p.name));
    const actualProjects = (0, pipe_1.pipe)(obj_test_json_1.default['employees'])
        .$(iter_1.iter.flatMap((el) => el.projects))
        .$$((el) => el.name)
        .collect();
    t.deepEqual(actualProjects, expectedProjects);
});
(0, ava_1.default)('pipelines 2', (t) => {
    const expectedProjects = obj_test_json_1.default['employees']
        .map((e) => e['projects'])
        .flatMap((ps) => ps.map((p) => p.name))
        .reduce((acc, curr) => `${acc}, ${curr}`);
    const actualProjects = (0, pipe_1.pipe)(obj_test_json_1.default['employees'])
        .$(iter_1.iter.flatMap((el) => el.projects))
        .$$((el) => el.name)
        .$(iter_1.iter.reduce((acc, curr) => `${acc}, ${curr}`))
        .$(option_1.opt.unwrapOr(''))
        .get();
    t.deepEqual(actualProjects, expectedProjects);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9waXBlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBdUI7QUFFdkIsc0NBQW1DO0FBRW5DLG9FQUF1QztBQUN2QyxpQ0FBOEI7QUFDOUIscUNBQStCO0FBRS9CLElBQUEsYUFBSSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUUvRCxNQUFNLENBQUMsR0FBRyxJQUFBLFdBQUksRUFBQyx1QkFBUSxDQUFDO1NBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUIsT0FBTyxFQUFFLENBQUM7SUFFZixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsYUFBSSxFQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2YsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUUvRCxNQUFNLENBQUMsR0FBRyxJQUFBLFdBQUksRUFBQyx1QkFBUSxDQUFDO1NBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENB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