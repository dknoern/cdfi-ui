import React, { FC, useState } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { taxJurisdictionStore } from 'store';
import { Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import styles from './TaxJurisdictionPage/TaxJurisdictionPage.module.scss';
import plus from '../../../../assets/images/plus-circle.svg';
import { TaxJurisdictionsTable } from './TaxJurisdictionPage/TaxJurisdictionsTable/TaxJurisdictionsTable';

export const TaxJurisdictions: FC = () => {
  const { setIsEditTaxJurisdiction } = taxJurisdictionStore;
  const [loading, setLoading] = useState(true);
  setTimeout(function () {
    setLoading(false);
  }, 3000);

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title="Tax Jurisdictions">
            <div className={styles.spin}>
              <Spin spinning={loading} />
            </div>
            <>
              <Button
                type="link"
                className={styles.createTaxJurisdictionBtn}
                onClick={() => {
                  setIsEditTaxJurisdiction(false);
                }}
              >
                <Link to="/tax-jurisdiction/">
                  <img src={plus} height="32" alt="plus icon" /> Create new Tax
                  Jurisdiction
                </Link>
              </Button>
              <TaxJurisdictionsTable />
              <Button
                type="link"
                className={styles.createTaxJurisdictionBtn}
                onClick={() => {
                  setIsEditTaxJurisdiction(false);
                }}
              >
                <Link to="/tax-jurisdiction/">
                  <img src={plus} height="32" alt="plus icon" /> Create new Tax
                  Jurisdiction
                </Link>
              </Button>
            </>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
