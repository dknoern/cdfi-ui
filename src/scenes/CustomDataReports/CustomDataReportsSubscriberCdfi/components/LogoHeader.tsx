import React from 'react';
import { Image } from 'antd';
import styles from './LogoHeader.module.scss';

type LogoHeaderProps = {
  imgPath: string;
  subTitle?: string;
};

export const LogoHeader = ({ imgPath, subTitle }: LogoHeaderProps) => {
  return (
    <>
      {imgPath ? (
        <>
          <div>
            <Image
              className={styles.logo}
              width={150}
              src={imgPath}
              alt={`${subTitle} logo`}
            />
          </div>
          <span className={styles.title}>{subTitle}</span>
        </>
      ) : (
        <span className={styles.title}>{subTitle}</span>
      )}
    </>
  );
};
