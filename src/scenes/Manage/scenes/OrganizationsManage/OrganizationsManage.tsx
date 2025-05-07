import React, { FC } from 'react';
import { PageSectionWrapper } from '../../../../components';
import { OrganizationsContentWrapper } from '../../../../scenes/Dashboard/scenes/Organizations/OrganizationsContentWrapper';

export const OrganizationsManage: FC = () => {
  return (
    <PageSectionWrapper title={'Organizations'}>
      <OrganizationsContentWrapper />
    </PageSectionWrapper>
  );
};
