import React, { FC, useEffect, useState } from 'react';

import { ContentLimiter, PageSectionWrapper } from 'components';
import { globalGraphsStore, userStore } from 'store';
import { Button, Spin } from 'antd';
// import { Link } from 'react-router-dom';
import styles from './GraphsPage/GraphsPage.module.scss';
// import plus from '../../../../assets/images/plus-circle.svg';
// import { GlobalGraphsTable } from './GraphsPage/GlobalGraphsTable/GlobalGraphsTable';

export const Graphs: FC = () => {
  const { setIsEditGraph, getGraphTypes, getUnitTypes, getPeriodTypes } =
    globalGraphsStore;
  const [loading, setLoading] = useState(true);
  setTimeout(function () {
    setLoading(false);
  }, 3000);
  const { setPagination } = globalGraphsStore;

  useEffect(() => {
    setPagination({ current: 0, pageSize: 20 });
    getGraphTypes();
    getUnitTypes();
    getPeriodTypes();
  }, []);

  // TODO: a 'Manage formula' CTA should be added
  //temporary returned to the old source link
  const url = `/graphs?token=${userStore.token}`;

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title="Graphs">
            <div className={styles.spin}>
              <Spin spinning={loading} />
            </div>
            <iframe src={url} width="100%" height="1000"></iframe>

            {/*<>*/}
            {/*  <Button*/}
            {/*    type="link"*/}
            {/*    className={styles.createGraphBtn}*/}
            {/*    onClick={() => {*/}
            {/*      setIsEditGraph(false);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <Link to={`/global-graphs/`}>*/}
            {/*      <img src={plus} height="32" alt="plus icon" /> Create new*/}
            {/*      Graph*/}
            {/*    </Link>*/}
            {/*  </Button>*/}
            {/*  <GlobalGraphsTable />*/}
            {/*  <Button*/}
            {/*    type="link"*/}
            {/*    className={styles.createGraphBtn}*/}
            {/*    onClick={() => {*/}
            {/*      setIsEditGraph(false);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <Link to={`/global-graphs/`}>*/}
            {/*      <img src={plus} height="32" alt="plus icon" /> Create new*/}
            {/*      Graph*/}
            {/*    </Link>*/}
            {/*  </Button>*/}
            {/*</>*/}
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
