import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { uiStore } from 'store';
import styles from './BlockingLoader.module.scss';

export const BlockingLoader: FC = observer(() =>
  uiStore.isLoading ? (
    <div className={styles.blockingLoaderOverlay}>
      <div className={styles.spinner} />
    </div>
  ) : null,
);
