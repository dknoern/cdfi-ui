import React, { FC, useState } from 'react';
import { Button, Form, Input, Checkbox, Row, Col, InputNumber } from 'antd';
import { GRID_COL_FULL_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { FormSecondaryLabel } from 'components';
import { inputNumberParser } from 'tools';
import { maxLength, minValue, maxValue } from 'tools/formRules';
import styles from './AxesNGrids.module.scss';

enum Tabs {
  axes = 'axes',
  gridlines = 'gridlines',
}

const tabs = [
  { code: Tabs.axes, title: 'Axes' },
  { code: Tabs.gridlines, title: 'Gridlines' },
];

const checkboxes = [
  { code: 'gridHorizontal', title: 'Horizontal Lines', isChecked: true },
  { code: 'gridVertical', title: 'Vertical Lines', isChecked: false },
];

export const AxesNGrids: FC = () => {
  const [activeItem, setActiveItem] = useState<Tabs>(Tabs.axes);

  return (
    <>
      <nav className={styles.tabs}>
        <ul>
          {tabs.map((tabItem) => (
            <li
              key={tabItem.code}
              className={activeItem === tabItem.code ? styles.active : ''}
            >
              <Button
                type="link"
                onClick={(): void => {
                  setActiveItem(tabItem.code);
                }}
              >
                {tabItem.title}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.contentWrapper}>
        <div
          className={`${styles.contentItem} ${
            activeItem === Tabs.axes ? styles.contentItemActive : ''
          }`}
        >
          <Form.Item
            label={
              <FormSecondaryLabel
                text="Enter Axis Label"
                className={styles.formLabel}
              />
            }
            name={['formatChart', 'axisLabel']}
            rules={[maxLength(40)]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label={
              <FormSecondaryLabel text="Bounds" className={styles.formLabel} />
            }
          >
            <Form.Item
              name={['formatChart', 'boundMin']}
              label={<FormSecondaryLabel text="Minimum" />}
              className={styles.formItem}
              rules={[minValue(), maxValue()]}
            >
              <InputNumber
                decimalSeparator="."
                parser={inputNumberParser}
                className={styles.numberInput}
              />
            </Form.Item>
            <Form.Item
              name={['formatChart', 'boundMax']}
              label={<FormSecondaryLabel text="Maximum" />}
              className={styles.formItem}
              rules={[minValue(), maxValue()]}
            >
              <InputNumber
                decimalSeparator="."
                parser={inputNumberParser}
                className={styles.numberInput}
              />
            </Form.Item>
          </Form.Item>
        </div>
        <div
          className={`${styles.contentItem} ${
            activeItem === Tabs.gridlines ? styles.contentItemActive : ''
          }`}
        >
          <Form.Item
            label={
              <FormSecondaryLabel
                text="Select gridlines to be displayed in the chart."
                className={styles.formLabel}
              />
            }
          >
            {checkboxes.map((checkboxItem) => (
              <Row gutter={[0, GRID_GUTTER / 3]} key={checkboxItem.code}>
                <Col span={GRID_COL_FULL_ROW_SPAN}>
                  <Form.Item
                    name={['formatChart', checkboxItem.code]}
                    valuePropName="checked"
                    noStyle
                    className={styles.gridlineItem}
                  >
                    <Checkbox checked={checkboxItem.isChecked}>
                      {checkboxItem.title}
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            ))}
          </Form.Item>
        </div>
      </div>
    </>
  );
};
