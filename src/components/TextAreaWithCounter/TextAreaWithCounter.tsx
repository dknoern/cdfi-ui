import React, { FC, useState } from 'react';
import { Input, Typography, Form } from 'antd';
import styles from './TextAreaWithCounter.module.scss';

const { Text } = Typography;

type TextAreaWithCounterProps = {
  formItemName?: string;
  limit?: number;
  resize?: boolean;
  rows?: number;
  placeholder?: string;
  initialLength?: number;
  counterModifier?: 'inside' | 'outside';
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export const TextAreaWithCounter: FC<TextAreaWithCounterProps> = ({
  formItemName,
  limit,
  resize,
  rows,
  placeholder,
  counterModifier,
  initialLength,
  onBlur,
}) => {
  const [symbolCount, setSymbolCount] = useState(initialLength ?? 0);

  return (
    <>
      <Form.Item name={formItemName} noStyle>
        <Input.TextArea
          placeholder={placeholder}
          id={formItemName}
          name={formItemName}
          rows={rows}
          maxLength={limit}
          style={{ resize: resize ? 'vertical' : 'none' }}
          onChange={(event): void => {
            setSymbolCount(event.target.value.length);
          }}
          onFocus={(event): void => {
            setSymbolCount(event.target.value.length);
          }}
          onBlur={onBlur}
        />
      </Form.Item>
      <div className={styles.textAreaCounterWrapper}>
        <Text className={ counterModifier == 'inside'? styles.textAreaCounter : styles.textAreaCounterOutside}>
          {symbolCount}/{limit}
        </Text>
      </div>
    </>
  );
};

TextAreaWithCounter.defaultProps = {
  formItemName: undefined,
  limit: 150,
  resize: false,
  rows: 3,
  placeholder: undefined,
  counterModifier: 'inside',
};
