export const isEquivalent = (a: any, b: any): boolean =>
  JSON.stringify(a) === JSON.stringify(b);
