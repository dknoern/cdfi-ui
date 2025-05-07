import React, { FC } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { WithClass } from 'types';
import styles from './Button.module.scss';

type LinkButtonProps = ButtonProps &
  WithClass & {
    title?: string;
  };

export const LinkButton: FC<LinkButtonProps> = ({
  title,
  className,
  ...restProps
}) => {
  return (
    <Button
      {...restProps}
      type="link"
      className={`${className} ${styles.linkButton}`}
    >
      {title}
    </Button>
  );
};
