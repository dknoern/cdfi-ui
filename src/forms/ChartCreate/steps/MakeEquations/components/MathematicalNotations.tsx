import React, { FC } from 'react';
import { Col, Row, Button } from 'antd';
import { GRID_COL_QUARTER_ROW_SPAN } from 'constants/ui';
import { FormPrimaryLabel } from 'components';
import { notations } from '../constants';
import styles from '../MakeEquations.module.scss';

type MathematicalNotationsProps = {
  addToEquation: (value: string) => void;
};

export const MathematicalNotations: FC<MathematicalNotationsProps> = ({
  addToEquation,
}) => {
  return (
    <>
      <FormPrimaryLabel text="Mathematical Notations" />
      <Row id="notationsList" className={styles.notationsRow}>
        {notations.map((notation) => (
          <Col
            key={notation.symbol}
            span={GRID_COL_QUARTER_ROW_SPAN}
            className={styles.notationsCol}
          >
            <Button
              id={`notation${notation.symbol}`}
              type="ghost"
              onClick={(): void => {
                addToEquation(notation.symbol);
              }}
              className={styles.notationBtn}
            >
              {notation.icon}
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};
