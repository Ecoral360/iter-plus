import { iter } from '../iter';

export function curry<T extends (...args: any) => any>(func: T) {
    const argStr = iter(func.toString())
        .skipWhile((el) => el !== '(')
        .takeBalanced(
            (el) => el === '(',
            (el) => el === ')'
        )
        .skip(1)
        .collect(iter.str.join(''));

    const args = iter(argStr.split(',')).map((el) => el.trim());

    return args;
}
