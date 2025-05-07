export const formatNumberWithCommas = (num: string | number): string => {
  const [round, decimals] = `${num}`.split('.', 2);
  const result = round.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return result.concat(decimals ? `.${decimals}` : '');
};
