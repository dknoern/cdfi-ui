import React, { FC } from 'react';
import { WithCompanyTypeProps } from './types';
import { PageSectionWrapper } from '../../../../components';
import { Table } from 'antd';
import { subscriberColumns } from './constants';
import { useCdfiOrgDetails, useCdfiSubscribers } from 'dataManagement';
import { CdfiSubscriber } from 'types';
import { cdfiStore } from 'store';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './LogoHeader';
import tableStyles from 'components/ManageTableStyles.module.scss';

type CdfiSubscriberData = CdfiSubscriber & {
  key: React.Key;
};

function addIndexAsKey(data: CdfiSubscriber[]): CdfiSubscriberData[] {
  return data.map((subscriber, index) => ({ key: index, ...subscriber }));
}

export const SubscriberDashboard: FC<WithCompanyTypeProps> = () => {
  const { cdfiId: id } = cdfiStore;
  const { data: cdfiData } = useCdfiOrgDetails(id);
  const { data: subscribers } = useCdfiSubscribers(id);
  const subscribersWithIndex = addIndexAsKey(
    subscribers ? subscribers.subscribers : [],
  );

  const logo = useCdfiLogo(id);

  const sortSubscribers = () => {
    const sortData = subscribersWithIndex.sort((a, b) => {
      if (a.lastAccessedDate == undefined && b.lastAccessedDate == undefined) {
        if (a.companyName > b.companyName) {
          return 1;
        }
        if (a.companyName < b.companyName) {
          return -1;
        }
        return 0;
      }
      // @ts-ignore
      return ('' + b.lastAccessedDate).localeCompare(a.lastAccessedDate);
    });

    const dataWithDate = sortData.filter(
      (item) => item.lastAccessedDate !== undefined,
    );
    const dataWithOutDate = sortData.filter(
      (item) => item.lastAccessedDate === undefined,
    );

    return [...dataWithDate, ...dataWithOutDate];
  };

  return (
    <PageSectionWrapper
      title="Subscribers"
      ratings
      topTitle={<LogoHeader imgPath={logo} subTitle={cdfiData?.cdfi.name} />}
    >
      <h1>
        The following organizations have accessed an Aeris® Report for{' '}
        {cdfiData?.cdfi.name}.{' '}
      </h1>
      <br />

      <Table
        dataSource={subscribersWithIndex ? sortSubscribers() : []}
        columns={subscriberColumns}
        pagination={{ showSizeChanger: true, pageSize: 50 }}
        size={'small'}
        showSorterTooltip
        className={tableStyles.table}
      />
    </PageSectionWrapper>
  );
};
