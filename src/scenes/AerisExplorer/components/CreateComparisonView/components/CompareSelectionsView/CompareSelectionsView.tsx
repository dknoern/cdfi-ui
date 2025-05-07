import React from 'react';
import { extractName } from '../../createComparisonViewHelpers';
import styles from './CompareSelectionsView.module.scss';

type CompareSelectionsViewProps = {
  comparePeerGroupId: string | undefined;
  compareCdfis: string | undefined;
};

export const CompareSelectionsView = ({
  comparePeerGroupId,
  compareCdfis,
}: CompareSelectionsViewProps) => {
  const isCompareCdfiId = compareCdfis?.length
    ? compareCdfis.length > 0
    : false;

  if (isCompareCdfiId) {
    return (
      <>
        <h4 className={styles.listTitle}>CDFI</h4>
        <ul>
          <li className={styles.listItem}>{extractName(compareCdfis)}</li>
        </ul>
      </>
    );
  }

  if (comparePeerGroupId) {
    return (
      <>
        <h4 className={styles.listTitle}>Portfolio Segment</h4>
        <ul>
          <li className={styles.listItem}>{extractName(comparePeerGroupId)}</li>
        </ul>
      </>
    );
  }
  return (
    <p className={styles.hintText}>
      You have not slected a Portfolio Segment or CDFI(s) to compare
    </p>
  );
};
