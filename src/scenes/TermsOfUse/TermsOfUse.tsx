import React, { FC, useEffect } from 'react';
import { activateTermsOfServiceFlow } from 'components/Layout/parts/tools';
import { TermsOfUse as TermsOfUseWindow } from 'flows';
import styles from './TermsOfUse.module.scss';

export const TermsOfUse: FC = () => {
  useEffect(activateTermsOfServiceFlow, []);

  return (
    <>
      <div className={styles.container} />
      <TermsOfUseWindow />
    </>
  );
};
