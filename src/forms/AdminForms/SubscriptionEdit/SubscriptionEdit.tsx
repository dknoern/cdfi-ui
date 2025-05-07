import React, { FC } from 'react';
import { FormProps } from 'types/form';
import { FormTemplate } from '../FormTemplate';
import { tabs } from './constants';

export const SubscriptionEdit: FC<FormProps> = ({ ...rest }) => {
  return <FormTemplate tabs={tabs} {...rest} />;
};
