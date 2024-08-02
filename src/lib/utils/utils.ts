import { iter } from '../iter/iter';
import { pipe } from '../pipe/pipe';

export function curry<T extends (...args: any) => any>(func: T) {
    const args = iter(func.toString());
    
}

curry(Math.pow);
