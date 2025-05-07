import React from 'react';

type CustomFilterHeaderProps = {
  appliedAdditionalFiltersValues: [number, number] | undefined;
  format?: string;
};

export const CustomFilterHeader: React.FC<CustomFilterHeaderProps> = ({
  appliedAdditionalFiltersValues,
  format = 'DOLLAR',
}) => {
  const [minVal, maxVal] = appliedAdditionalFiltersValues;

  const formatted = (value: number) => {
    switch (format) {
      case 'DOLLAR':
        return `$${value.toLocaleString()}`;
      case 'PERCENTAGE':
        return `${value * 100}%`;
      case 'NUMBER':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  return (
    <>
      <span>{minVal ? `Min: ${formatted(minVal)}` : undefined}</span>
      <span>{maxVal ? `Max: ${formatted(maxVal)}` : undefined}</span>
    </>
  );
};
