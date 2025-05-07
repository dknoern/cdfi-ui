export const valuesSum = (values) => {
  return values.reduce(
    (accumulator, currentValue) =>
      accumulator + (Number(currentValue.replace(/[,£$%\s]/gi, '')) || 0),
    0,
  );
};
