export const pick = <X extends Record<string, unknown>>(
  obj: X,
  keys: (keyof X)[],
): Partial<X> =>
  Object.fromEntries(
    Object.entries(obj).filter(([k]) => keys.includes(k)),
  ) as Partial<X>;
