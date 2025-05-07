export const isSuitableAsNumber = (value: number | string | null): boolean =>
  Number.isFinite(value);
