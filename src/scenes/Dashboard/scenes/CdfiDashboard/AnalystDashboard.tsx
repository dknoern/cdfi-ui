import React, { FC, useEffect, useState } from 'react';
import { WithCompanyTypeProps, Analyst } from './types';
import { ContentLimiter, PageSectionWrapper } from '../../../../components';
import { Table, Button } from 'antd';
import { analystsColumns } from './constants';
import { useAnalysts, useCdfis } from '../../../../dataManagement';
import { User } from '../../../../types';
import { cdfiStore } from 'store';
import ManageAnalysts from './ManageAnalysts';
import { useAllAnalysts } from '../../../../dataManagement/useAllAnalysts';
import styles from './AnalystDashboard.module.scss';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './LogoHeader';
import tableStyles from 'components/ManageTableStyles.module.scss';

export function addIndexAsKey(data: User[]): User[] {
  return data.map((analyst, index) => ({ key: index, ...analyst }));
}

export const AnalystDashboard: FC<WithCompanyTypeProps> = (props) => {
  const { cdfiId } = cdfiStore;
  const { data: analysts } = useAnalysts(cdfiId);

  const [currentAnalysts, setCurrentAnalysts] = useState<User[] | undefined>(
    undefined,
  );

  const { data: cdfiOrgs } = useCdfis();
  const cdfiName = cdfiOrgs?.find((cdfi) => cdfi.id == cdfiId)?.name as string;

  const [analystList, setAnalystList] = useState<Analyst[] | undefined>(
    undefined,
  );

  const { data } = useAllAnalysts();
  const allAnalysts = data ? data.analysts : undefined;

  const mngAnalystBtn = [
    <Button
      className={styles.actionButton}
      onClick={() => setAnalystList(allAnalysts)}
    >
      Manage Analysts
    </Button>,
  ];

  useEffect(() => {
    setCurrentAnalysts(addIndexAsKey(analysts ? analysts.analysts : []));
  }, [analysts, cdfiId]);

  const logo = useCdfiLogo(cdfiId)

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper
            title={'Aeris Analysts'}
            actionButtons={mngAnalystBtn}
            ratings
            topTitle={<LogoHeader imgPath={logo} subTitle={cdfiName}/>}
          >
            <ManageAnalysts
              isVisible={!!analystList}
              onCancel={() => setAnalystList(undefined)}
              data={analystList}
              currentAnalysts={currentAnalysts}
              cdfiName={cdfiName}
              cdfiId={cdfiId}
              setCurrentAnalysts={setCurrentAnalysts}
            />
            <Table
              dataSource={currentAnalysts}
              columns={analystsColumns}
              pagination={{ showSizeChanger: true }}
              size={'small'}
              scroll={{ y: '50vh' }}
              className={tableStyles.table}
            />
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
