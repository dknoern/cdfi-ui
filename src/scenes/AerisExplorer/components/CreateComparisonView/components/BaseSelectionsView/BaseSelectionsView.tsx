import React from 'react';
import { extractName } from '../../createComparisonViewHelpers';
import styles from './BaseSelectionsView.module.scss';

type BaseSelectionsViewProps = {
  portfoliosAgainst: string | undefined;
  peerGroupsAgainst: string | undefined;
};

export const BaseSelectionsView = ({
  portfoliosAgainst,
  peerGroupsAgainst,
}: BaseSelectionsViewProps) => {
  if (!portfoliosAgainst && !peerGroupsAgainst) {
    return (
      <p className={styles.hintText}>
        You have not selected a Portfolio Segment or Peer Group to compare
        against
      </p>
    );
  }

  return (
    <>
      {portfoliosAgainst && (
        <>
          <h4 className={styles.listTitle}>Portfolio Segment</h4>
          <div className={styles.listItem}>
            {extractName(portfoliosAgainst)}
          </div>
        </>
      )}

      {peerGroupsAgainst && (
        <>
          <h4 className={styles.listTitle}>Peer Group</h4>
          <div className={styles.listItem}>
            {extractName(peerGroupsAgainst)}
          </div>
        </>
      )}
    </>
  );
};
