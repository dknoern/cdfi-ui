import { observer } from 'mobx-react';
import { Col, InputNumber, Row, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THREE_QUARTERS_ROW_SPAN,
} from '../../../constants';
import styles from '../CdfiSelector.module.scss';
import { useDebouncedCallback } from 'use-debounce';

// TODO: need a formatting function to format values and to receive dynamic slider ranges

type SliderFilterProps = {
  filterName?: string;
  disabled?: boolean;
  values?: [number, number];
  onAfterChange?: (value: [number, number] | undefined) => void;
  format?: string;
};

export const NumericSliderFilter = observer((props: SliderFilterProps) => {
  // const defaultSliderValues: [number, number] = [0, 1521020000];
  const [sliderValues, setSliderValues] = useState<
    [number, number] | undefined
  >();

  const onAfterChange = (value: [number, number] | undefined): void => {
    if (props.onAfterChange !== undefined) {
      props.onAfterChange(value);
    }
  };

  const handleSliderChange = (values: [number, number]) => {
    setSliderValues(values);
  };

  const handleMinChange = useDebouncedCallback(
    (value: number | undefined | null | string) => {
      const values: [number, number] = [
        value as number,
        sliderValues?.[1] as number,
      ];
      setSliderValues(values);
      onAfterChange(values);
    },
    300,
  );

  const handleMaxChange = useDebouncedCallback(
    (value: number | undefined | null | string) => {
      const values: [number, number] = [
        sliderValues?.[0] as number,
        value as number,
      ];
      setSliderValues(values);
      onAfterChange(values);
    },
    300,
  );

  const numberInputFormatter = (value: number, format: string) => {
    switch (format) {
      case 'DOLLAR':
        return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      case 'PERCENTAGE':
        return `${value}%`;
      case 'NUMBER':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  const numberInputParser = (value: any, format: string) => {
    switch (format) {
      case 'DOLLAR':
        return value?.replace(/\$\s?|(,*)/g, '') as unknown as number;
      case 'PERCENTAGE':
        return value?.replace('%', '') as unknown as number;
      case 'NUMBER':
        return value as unknown as number;
      default:
        return undefined;
    }
  };

  useEffect(() => {
    if (props.values === undefined) {
      setSliderValues(props.values);
    }
  }, [props.values]);

  return (
    <>
      <label
        htmlFor="slider-label"
        className={styles.lightBlue}
        aria-label="slider-label"
      >
        {/* {props.filterName} */}
      </label>
      <div id="slider-label">
        {/* <Slider
          range
          value={sliderValues}
          max={1521020000}
          defaultValue={defaultSliderValues}
          onChange={handleSliderChange}
          onAfterChange={(values) => {
            onAfterChange(values);
          }}
          tipFormatter={(value?: number) => {
            return value !== undefined
              ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(value)
              : '';
          }}
          disabled={props.disabled}
        /> */}

        <Row>
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <p className={styles.lightBlue}>Min:</p>
          </Col>
          <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
            <InputNumber
              className={styles.multiSelect}
              aria-label="minimum-number-input"
              min={0}
              max={1521020000}
              value={sliderValues ? sliderValues[0] : undefined}
              onChange={handleMinChange}
              formatter={(value) =>
                numberInputFormatter(
                  value as number,
                  props.format as string,
                ) as string
              }
              parser={(value) =>
                numberInputParser(
                  value as string,
                  props.format as string,
                ) as number
              }
              disabled={props.disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <p className={styles.lightBlue}>Max:</p>
          </Col>
          <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
            <InputNumber
              className={styles.multiSelect}
              aria-label="maximum-number-input"
              min={0}
              max={1521020000}
              value={sliderValues ? sliderValues[1] : undefined}
              onChange={handleMaxChange}
              formatter={(value) =>
                numberInputFormatter(
                  value as number,
                  props.format as string,
                ) as string
              }
              parser={(value) =>
                numberInputParser(
                  value as string,
                  props.format as string,
                ) as number
              }
              disabled={props.disabled}
            />
          </Col>
        </Row>
      </div>
    </>
  );
});
