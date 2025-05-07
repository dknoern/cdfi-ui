import React, { FC } from 'react';
import { Row, Col, Input, Radio, Button } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './OptionsMaker.module.scss';

type OptionsMakerValue = string[];
interface OptionsMakerProps {
  value?: OptionsMakerValue;
  onChange?: (value: OptionsMakerValue) => void;
}
const updatedValues = (
  oldValues: OptionsMakerValue,
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
): string[] => {
  const { value } = e.target;
  const values = [...oldValues];
  values[index] = value;
  return values;
};
export const OptionsMaker: FC<OptionsMakerProps> = ({ value, onChange }) => {
  if (!value || !onChange) return null;

  const canDelete = value.length > 2;

  const remove = (index: number): void => {
    const newArr = [...value];
    newArr.splice(index, 1);
    onChange(newArr);
  };

  return (
    <span>
      {value.map((item, index) => (
        <Row gutter={[0, 8]}>
          <Col>
            <Radio checked={false} />
          </Col>
          <Col flex="auto">
            <Input
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              placeholder="Enter option value"
              value={item}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                onChange(updatedValues(value, index, e));
              }}
              size="small"
              className={styles.input}
            />
          </Col>
          {canDelete && (
            <Col>
              <Button
                type="link"
                size="small"
                ghost
                icon={<CloseOutlined />}
                onClick={(): void => {
                  remove(index);
                }}
                className={styles.delBtn}
              />
            </Col>
          )}
        </Row>
      ))}
      <Button
        type="link"
        size="middle"
        icon={<PlusOutlined />}
        ghost
        onClick={(): void => {
          onChange([...value, '']);
        }}
        className={styles.addBtn}
      >
        Add option
      </Button>
    </span>
  );
};
