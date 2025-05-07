import React, { FC } from 'react';
import styles from './TabPanel.module.scss';

type TabPanelProps = {
  activeKey: string;
  onChange: (key: string) => void;
  tabs: Record<string, string>;
};
export const TabPanel: FC<TabPanelProps> = ({ activeKey, onChange, tabs }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {Object.keys(tabs).map((key) => (
          <li
            key={key}
            className={`${styles.item} ${
              activeKey === key ? styles.active : ''
            }`}
          >
            <button
              id={`tableTabButton_${key}`}
              type="button"
              onClick={(): void => onChange(key)}
              className={styles.button}
            >
              {tabs[key]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
