import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { workDataStore } from 'store';
import styles from './EditButtonsLine.module.scss';

type EditButtonsLineProps = {
  textHelper: string;
};

const EditButtonsLineFn: FC<EditButtonsLineProps> = ({
  textHelper,
  children,
}) => {
  const { isCompanyViewMode } = workDataStore;

  return (
    <div
      id="ActionLine"
      className={`${styles.buttonsLine} ${
        isCompanyViewMode ? styles.buttonsLineLocal : styles.buttonsLineGlobal
      }`}
    >
      <span>{textHelper}</span>
      <div className={styles.buttons}>{children}</div>
    </div>
  );
};

export const EditButtonsLine = observer(EditButtonsLineFn);
