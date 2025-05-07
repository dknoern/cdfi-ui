import React, { FC } from 'react';
import { store } from 'forms/ChartCreate/store';
import { store as stepStore } from 'forms/ChartCreate/equationsStore';
import { PreviewTable } from './components';
import styles from './components/PreviewTable.module.scss';

export const Table: FC = () => {
  return (
    <div className={styles.container}>
      <PreviewTable
        equations={store.data.equations}
        onDelete={stepStore.remove}
        onEdit={stepStore.startEdit}
      />
    </div>
  );
};
