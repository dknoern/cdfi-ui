import React from 'react';
import styles from './SeparatorLine.module.scss';

export const SeparatorLine = () => (
    <hr style={{height:3, margin:10}} className={styles.line}/>
);