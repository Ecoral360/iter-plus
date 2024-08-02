import { iter } from '../iter/iter';

export function curry<T extends (...args: any) => any>(func: T) {
    const args = iter(func.toString());
    
}

curry(Math.pow);
