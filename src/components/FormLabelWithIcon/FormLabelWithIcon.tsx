import React, { FC, ReactNode, ComponentType } from 'react';
import { Tooltip } from 'antd';
import { WithClass } from 'types';
import { getPopupContainer } from 'tools/antConfig';
import styles from './FormLabelWithIcon.module.scss';

type LabelWithIconProps = {
  text: ReactNode;
  description?: ReactNode;
  icon?: ComponentType;
  hint?: ReactNode;
  secondaryText?: ReactNode;
} & WithClass;

export const FormLabelWithIcon: FC<LabelWithIconProps> = ({
  text,
  icon: Icon,
  description,
  className,
  hint,
  secondaryText,
}) => {
  return (
    <div className={className}>
      <span> {text}</span>
      {!!hint && <span className={styles.hint}>{hint}</span>}
      {!!description && (
        <Tooltip
          title={description}
          getPopupContainer={getPopupContainer}
          placement="right"
          className={styles.icon}
        >
          {Icon && <Icon />}
        </Tooltip>
      )}
      {!!secondaryText && (
        <div className={styles.secondaryText}>{secondaryText}</div>
      )}
    </div>
  );
};
