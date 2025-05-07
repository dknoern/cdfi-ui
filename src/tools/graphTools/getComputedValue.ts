// Fixes display bug when there are too small and too large values in the same graph
export const getComputedValue = (
  currentValue: number,
  minimumBarUnitValue: number,
): number => {
  if (Math.abs(currentValue) < minimumBarUnitValue) {
    const value =
      currentValue < 0
        ? currentValue - minimumBarUnitValue
        : currentValue + minimumBarUnitValue;
    return currentValue === 0 || currentValue === null ? 0 : value;
  }
  return currentValue;
};
