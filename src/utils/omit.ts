export function omit<R, K extends keyof R>(
  key: K,
  obj: R,
): Omit<R, K> {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}
