// Calculate offset of graph legend based of number of items in legend
// Offset number depends on items number plus some increment
export const calculateLegendPosition = (items: number): number => {
  if (items < 3) return items * 10 + 70;
  if (items < 9) return items * 10 + 110;
  if (items < 15) return items * 10 + 160;
  return items * 10 + 220;
};

export const calculateLegendMargin = (items: number): number => {
  if (items < 3) return 100;
  if (items < 9) return 190;
  if (items < 15) return 280;
  return 460;
};
