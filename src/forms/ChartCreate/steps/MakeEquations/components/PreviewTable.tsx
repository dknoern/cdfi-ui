import React, { FC, useState, useEffect } from 'react';
import { Col, Row, Button } from 'antd';
import { GRID_COL_THIRD_ROW_SPAN } from 'constants/ui';
import { FormPrimaryLabel } from 'components';
import { Equation } from 'forms/ChartCreate/types';
import styles from './PreviewTable.module.scss';

type PreviewTableProps = {
  equations: Equation[];
  onDelete: (id: Equation['id']) => void;
  onEdit: (id: Equation['id']) => void;
};

export const PreviewTable: FC<PreviewTableProps> = ({
  equations,
  onDelete,
  onEdit,
}) => {
  const [chosenEquationId, setChosenEquationId] = useState<number | null>();

  useEffect(() => {
    if (equations.length === 1) {
      setChosenEquationId(equations[0].id);
    }
  }, [equations]);

  return (
    <>
      <FormPrimaryLabel text="Formulas applied" />
      <div className={styles.previewTableBlock}>
        <Row className={styles.titleRow}>
          <Col span={GRID_COL_THIRD_ROW_SPAN} className={styles.titleCol}>
            Formula Name
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN * 2} className={styles.titleCol}>
            Formula Breakdown
          </Col>
        </Row>
        <Row>
          <Col
            span={GRID_COL_THIRD_ROW_SPAN}
            className={styles.equationNameCol}
            id="createdEquationsList"
          >
            {equations.map((equation) => (
              <Button
                key={equation.id}
                onClick={(): void => {
                  setChosenEquationId(equation.id);
                }}
                className={`${styles.equationName} ${
                  equation.id === chosenEquationId
                    ? styles.equationNameChosen
                    : ''
                }`}
              >
                {equation.name}
              </Button>
            ))}
          </Col>
          <Col
            span={GRID_COL_THIRD_ROW_SPAN * 2}
            className={styles.equationBreakdownCol}
          >
            <Row>
              <p id="equationBreakdown" className={styles.equationFormula}>
                {
                  equations.find((equation) => equation.id === chosenEquationId)
                    ?.formula
                }
              </p>
            </Row>
            {!!chosenEquationId && (
              <Row className={styles.buttonRow}>
                <Button
                  id="removeEquationButton"
                  type="primary"
                  ghost
                  onClick={(): void => {
                    onDelete(chosenEquationId as number);
                    setChosenEquationId(null);
                  }}
                >
                  Remove
                </Button>
                <Button
                  id="editEquationButton"
                  type="primary"
                  onClick={(): void => {
                    onEdit(chosenEquationId as number);
                  }}
                >
                  Edit formula
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};
