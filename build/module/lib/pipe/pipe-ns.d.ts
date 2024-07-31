export declare namespace string { }
export declare namespace obj {
    function prop<N extends string, V, T extends {
        [key in N]: V;
    }>(name: N): (obj: T) => T[N];
}
