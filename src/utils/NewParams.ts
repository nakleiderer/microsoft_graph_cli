import { AnyFunction } from "./AnyFunction.ts";

export type NewParams<T extends AnyFunction, R> = [
  Parameters<T>[0] & R,
  unknown,
];
