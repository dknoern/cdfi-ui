import React, { useEffect } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { observer } from 'mobx-react';
import { autoEmailStore } from 'store';
import { AutoEmailLogTable } from './EmailLog/AutoEmailLogTable';

export const AutoEmailPage = observer(() => {
  const { setPaginationEmailLog } = autoEmailStore;

  useEffect(() => {
    setPaginationEmailLog({ current: 0, pageSize: 20 });
  }, []);

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title="Manage Auto-generated Emails">
            <AutoEmailLogTable />
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
});
