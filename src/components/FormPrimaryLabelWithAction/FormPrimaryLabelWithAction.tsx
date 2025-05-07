import React, { FC, ReactNode } from 'react';
import { Button } from 'antd';
import { VoidFn, WithClass } from 'types';
import { FormPrimaryLabel } from '../FormPrimaryLabel';

type Props = {
  icon: ReactNode;
  text: React.ReactText;
  stepKey: string;
  onActionClick?: VoidFn;
  num?: React.ReactText;
} & WithClass;

export const FormPrimaryLabelWithAction: FC<Props> = ({
  text,
  icon,
  onActionClick,
  className,
  stepKey,
  num,
}) => {
  return (
    <div className={className}>
      <FormPrimaryLabel num={num} text={text} />
      <Button
        id={`${stepKey}_editButton`}
        type="link"
        icon={icon}
        onClick={onActionClick}
      />
    </div>
  );
};
