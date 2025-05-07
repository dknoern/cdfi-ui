import React, { useEffect, useState } from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { OverlayTrigger } from 'react-bootstrap';
import { AutoSizer, Grid, ScrollSync } from 'react-virtualized';
import { uiText } from 'constants/uiText';
import { mapStore } from '../store';
import { cellRenderer, cellRendererCols, cellRendererRows } from './TableParts';
import { SelectModePopover } from './SelectModePopover';
import styles from './SourceTable.module.scss';

const HEADER_HEIGHT = 36;
const NUMBER_COL_WIDTH = 36;
const ROW_HEIGHT = 50;
const COL_WIDTH = 150;
const DISABLE_OVERFLOW_STYLE = {
  overflow: 'hidden',
  overflowX: 'hidden',
  overflowY: 'hidden',
};

const SourceTableFn = () => {
  const { errorInfo, page, pageData, mode, setMode } = mapStore;

  const [rendered, setRendered] = useState(0);

  useEffect(() => {
    return reaction(
      () => pageData,
      () => {
        setRendered(null);
      },
    );
  }, [pageData]);

  useEffect(() => {
    setTimeout(() => {
      setRendered(page);
    }, 100);
  }, [rendered, page]);

  if (rendered !== page) return <div>{uiText('general', 'dataLoading')}</div>;

  const colCnt = pageData[0] ? pageData[0].length : 0;
  const rowCnt = pageData.length;

  // needs to be rendered before overlay
  const searchModeSelector = SelectModePopover({
    mode,
    setMode,
  });

  return (
    <AutoSizer>
      {({ width, height }) => (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            position: 'relative',
          }}
          className={styles.container}
        >
          <>
            <div className={styles.topLeft}>
              <OverlayTrigger
                trigger="click"
                placement="bottom-end"
                overlay={searchModeSelector}
                rootClose
              >
                <button
                  type="button"
                  className={`btn btn-link ${styles.settingsBtn}`}
                >
                  <i className="fas fa-cog" />
                </button>
              </OverlayTrigger>
            </div>

            <ScrollSync>
              {({ onScroll, scrollLeft, scrollTop }) => (
                <>
                  <div className={styles.cols}>
                    <Grid
                      height={HEADER_HEIGHT}
                      width={width - NUMBER_COL_WIDTH}
                      cellRenderer={cellRendererCols}
                      columnCount={colCnt}
                      rowCount={1}
                      columnWidth={COL_WIDTH}
                      rowHeight={HEADER_HEIGHT}
                      scrollLeft={scrollLeft}
                      className={styles.colsGrid}
                      style={DISABLE_OVERFLOW_STYLE}
                    />
                  </div>
                  <div className={styles.rows}>
                    <Grid
                      height={height - HEADER_HEIGHT}
                      width={NUMBER_COL_WIDTH}
                      cellRenderer={cellRendererRows}
                      columnCount={1}
                      rowCount={rowCnt}
                      columnWidth={NUMBER_COL_WIDTH}
                      rowHeight={ROW_HEIGHT}
                      scrollTop={scrollTop}
                      style={DISABLE_OVERFLOW_STYLE}
                    />
                  </div>
                  <div className={styles.table}>
                    <Grid
                      height={height - HEADER_HEIGHT}
                      width={width - NUMBER_COL_WIDTH}
                      cellRenderer={cellRenderer(page, errorInfo)}
                      columnCount={colCnt}
                      rowCount={rowCnt}
                      columnWidth={COL_WIDTH}
                      rowHeight={ROW_HEIGHT}
                      onScroll={onScroll}
                      scrollTop={scrollTop}
                    />
                  </div>
                </>
              )}
            </ScrollSync>
          </>
        </div>
      )}
    </AutoSizer>
  );
};

export const SourceTable = observer(SourceTableFn);
