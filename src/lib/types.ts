export type ElementOf<T> = T extends Iterable<infer E> ? E : never;

