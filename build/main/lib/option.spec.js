"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const option_1 = require("./option");
(0, ava_1.default)('option', (t) => {
    const x = (0, option_1.Some)(12);
    const z = (0, option_1.None)();
    const y = x.unwrapOrElse(() => 2);
    const w = z.unwrapOr("a");
    const foo = (param) => {
        if (param % 2 == 0)
            return (0, option_1.Some)(param);
        return (0, option_1.None)();
    };
    const result = foo(1);
    t.true(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL29wdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBTXZCLHFDQUEyQztBQUUzQyxJQUFBLGFBQUksRUFBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuQixNQUFNLENBQUMsR0FBRyxJQUFBLGFBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztJQUVuQixNQUFNLENBQUMsR0FBRyxJQUFBLGFBQUksR0FBRSxDQUFDO0lBRWpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUxQixNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzVCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxJQUFBLGFBQUksRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QyxPQUFPLElBQUEsYUFBSSxHQUFFLENBQUE7SUFDZixDQUFDLENBQUE7SUFHRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIn0=