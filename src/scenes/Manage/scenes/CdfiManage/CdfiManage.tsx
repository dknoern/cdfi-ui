import React, { FC } from 'react';
import { userStore } from 'store';
import { useCdfis } from '../../../../dataManagement';
import { CdfiContentWrapper } from '../../../Dashboard/scenes/CdfiDashboard/CdfiContentWrapper';
import { cdfiStore } from 'store';

export const CdfiManage: FC = () => {
  const { cdfiId: id } = cdfiStore;
  const { data: cdfis } = useCdfis();
  const cdfiName = cdfis?.find((item) =>
    item.id == id ? item.name : '',
  )?.name;

  return (
    <CdfiContentWrapper
      companyType={userStore.info.companyType}
      cdfiId={id}
      cdfiName={cdfiName ? cdfiName : ''}
    />
  );
};
