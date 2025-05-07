import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { getPopupContainer } from 'tools/antConfig';
import { FormPrimaryLabel } from 'components';
import { functionTooltipsText } from '../constants';
import styles from '../MakeEquations.module.scss';

type FunctionsProps = {
  addToEquation: (value: string) => void;
};

export const Functions: FC<FunctionsProps> = ({ addToEquation }) => {
  return (
    <>
      <FormPrimaryLabel text="Functions" />
      <div className={styles.listWrapper}>
        <ul id="functionsList" className={styles.list}>
          {Object.entries(functionTooltipsText).map(
            ([functionType, tooltipText]) => {
              const { usage, description } = tooltipText;

              return (
                <li key={functionType}>
                  <Tooltip
                    title={`Usage: ${usage}\nDescription: ${description}`}
                    getPopupContainer={getPopupContainer}
                    placement="left"
                    overlayClassName={styles.overlay}
                  >
                    <Button
                      id={functionType}
                      type="ghost"
                      onClick={(): void => {
                        addToEquation(`${functionType.toUpperCase()}()`);
                      }}
                      className={styles.functionButton}
                    >
                      {functionType}
                    </Button>
                  </Tooltip>
                </li>
              );
            },
          )}
        </ul>
      </div>
    </>
  );
};
