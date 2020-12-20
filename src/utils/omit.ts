export function omit(key: string, obj: Record<string, unknown>) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}
