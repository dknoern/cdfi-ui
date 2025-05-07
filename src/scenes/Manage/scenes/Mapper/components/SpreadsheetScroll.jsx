import React, { useState, useRef, useEffect, useReducer, useMemo } from 'react';
import { autorun } from 'mobx';
import { mapStore } from '../store';
import styles from './SpreadsheetScroll.module.scss';

const calculateWidths = ({
  listRef,
  wrapperRef,
  setListWidth,
  setContainerWidth,
}) => {
  setListWidth(listRef.current.scrollWidth);
  setContainerWidth(wrapperRef.current.clientWidth);
};

export const SpreadsheetScroll = () => {
  const wrapperRef = useRef();
  const listRef = useRef();
  const [listWidth, setListWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeItemId, setActiveItemId] = useState(0);
  // this only for scroll
  const [firstItemIndex, moveFirstItemIndex] = useReducer(
    (index, direction) => {
      return { left: index - 1, right: index + 1, 0: 0 }[direction];
    },
    0,
  );
  const [items, setItems] = useState([]);

  useEffect(
    () =>
      autorun(() => {
        setItems(
          mapStore.spreadSheetData.map((page, index) => ({
            id: index,
            name: page.name,
          })),
        );
      }),
    [],
  );

  useEffect(() => {
    calculateWidths({ listRef, wrapperRef, setListWidth, setContainerWidth });
    setActiveItemId(0);
  }, [items]);

  const setPage = (item) => {
    mapStore.setPage(item.id);
    setActiveItemId(item.id);
  };

  const listOffset = useMemo(() => {
    if (!listRef.current || !listRef.current.children.length) return 0;

    const min = containerWidth - listWidth;
    return Math.max(
      min,
      -1 * listRef.current.children[firstItemIndex].offsetLeft,
    );
  }, [containerWidth, firstItemIndex, listWidth]);

  const allowScrollingLeft = useMemo(() => firstItemIndex > 0, [
    firstItemIndex,
  ]);
  const allowScrollingRight = useMemo(() => {
    if (listWidth <= containerWidth) return false;
    if (listWidth + listOffset <= containerWidth) return false;
    return true;
  }, [listOffset, containerWidth, listWidth]);

  return (
    <div className={styles.spreadsheetScrollContainer}>
      <div className={styles.listContainer} ref={wrapperRef}>
        <ul ref={listRef} style={{ transform: `translate(${listOffset}px)` }}>
          {items.map((item) => (
            <li key={`scrollBtn${item.id}`}>
              <button
                type="button"
                className={item.id === activeItemId ? styles.active : ''}
                onClick={() => setPage(item)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {(allowScrollingLeft || allowScrollingRight) && (
        <div className={styles.scrollBtnGroup}>
          <button
            type="button"
            disabled={!allowScrollingLeft}
            onClick={() => {
              moveFirstItemIndex('left');
            }}
          >
            <i className="fas fa-caret-left" />
          </button>
          <button
            type="button"
            disabled={!allowScrollingRight}
            onClick={() => {
              moveFirstItemIndex('right');
            }}
          >
            <i className="fas fa-caret-right" />
          </button>
        </div>
      )}
    </div>
  );
};
