/** Property name or function that reads a value from an item. */
export type AcpSearchSelectAccessor<T, R> = keyof T | ((item: T) => R);

/** Context of the `#option` template. */
export interface AcpSearchSelectOptionContext<T> {
  $implicit: T;
  group: T | null;
}

/** Payload of `optionSelected`. */
export interface AcpSearchSelectSelection<T, V = unknown> {
  value: V;
  item: T;
  group: T | null;
}
