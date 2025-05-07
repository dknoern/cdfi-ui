import React from 'react';
import { observer } from 'mobx-react';
import { typography } from 'constants/typography';
import { PageSectionWrapper } from 'components';
import { SourceTable } from './SourceTable';
import { SpreadsheetScroll } from './SpreadsheetScroll';
import { mapStore } from '../store';
import styles from './Constructor.module.scss';

const { tableSectionTitle } = typography('mapper');

const SourceColFn = () => (
  <PageSectionWrapper
    title={tableSectionTitle}
    className={styles.pageSection}
    titleClassName={styles.title}
  >
    {mapStore.spreadSheetLoaded ? (
      <>
        <div className={styles.sourceTableContainer}>
          <SourceTable />
        </div>
        <SpreadsheetScroll />
      </>
    ) : null}
  </PageSectionWrapper>
);
export const SourceCol = React.memo(observer(SourceColFn));
