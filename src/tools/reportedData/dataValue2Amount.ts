export const dataValue2Amount = (value: string): number | null => {
  const go = value
    .replace('%', '')
    .replace('$', '')
    .replace(/,/g, '')
    .replace(/\(([0-9.]+)\)/i, '-$1')
    .trim();

  return go.length && !Number.isNaN(Number(go)) ? parseFloat(go) : null;
};
