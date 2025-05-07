import React, { FC } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { WithClass } from 'types';
import styles from './Button.module.scss';

type OutlineButtonProps = ButtonProps & {
  title: string;
} & WithClass;

export const OutlineButton: FC<OutlineButtonProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <Button
      type="default"
      className={`${className} ${styles.outlinedButton}`}
      {...props}
    >
      {title}
    </Button>
  );
};
