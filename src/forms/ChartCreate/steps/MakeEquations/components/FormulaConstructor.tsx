import React, { FC, useState, useCallback } from 'react';
import { Input } from 'antd';
import { GlobalMetric } from 'types';
import { metricsStore } from 'forms/ChartCreate/metricsStore';
import { ChooseItems } from './ChooseItems';
import { insertText } from './tools';
import styles from '../MakeEquations.module.scss';

type FormulaConstructorProps = {
  value?: string;
  onChange?: (value: string) => void;
  metrics?: GlobalMetric[];
};
export const FormulaConstructor: FC<FormulaConstructorProps> = ({
  value,
  onChange,
  metrics,
}) => {
  const [equationCursorPosition, setEquationCursorPosition] = useState<number>(
    0,
  );

  const addToFormula = useCallback(
    (insertPart: string) => {
      if (onChange) {
        onChange(insertText(value ?? '', insertPart, equationCursorPosition));
        setEquationCursorPosition(equationCursorPosition + insertPart.length);
      }
    },
    [onChange, value, equationCursorPosition],
  );

  return (
    <>
      <div className={styles.equationRow}>
        <div>=</div>
        <Input.TextArea
          id="equationInput"
          value={value}
          onChange={(event): void => {
            if (onChange) onChange(event.target.value);
          }}
          onClick={(event): void => {
            setEquationCursorPosition(event.currentTarget.selectionStart);
          }}
          onKeyUp={(event): void => {
            setEquationCursorPosition(event.currentTarget.selectionStart);
          }}
          rows={3}
          placeholder="Enter Formula"
          className={styles.equationInput}
        />
      </div>
      <ChooseItems
        metrics={metrics ?? (metricsStore.metrics || [])}
        addToEquation={addToFormula}
      />
    </>
  );
};
