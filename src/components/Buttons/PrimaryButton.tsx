import React, { FC } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { WithClass } from 'types';
import styles from './Button.module.scss';

type PrimaryButtonProps = ButtonProps & {
  title: string;
} & WithClass;

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <Button
      type="primary"
      className={`${className} ${styles.primaryButton}`}
      {...props}
    >
      {title}
    </Button>
  );
};
