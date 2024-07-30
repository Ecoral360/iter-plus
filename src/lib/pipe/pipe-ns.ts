export namespace string {}

export namespace obj {
  export function prop<N extends string, V, T extends { [key in N]: V }>(
    name: N
  ): (obj: T) => T[N] {
    return (obj) => obj[name];
  }
}
