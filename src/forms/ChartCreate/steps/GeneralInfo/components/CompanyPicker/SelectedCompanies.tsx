import React, { ReactElement, useMemo } from 'react';
import { Tag } from 'antd';
import { Company } from 'types';
import styles from './CompanyPicker.module.scss';

type SelectedCompaniesProps = {
  companies?: Company[];
  value: number[];
  onDeselect: (companyId: number) => void;
};

export const SelectedCompanies = ({
  companies,
  value,
  onDeselect,
}: SelectedCompaniesProps): ReactElement => {
  const companyNames = useMemo(() => {
    return new Map<number, string>(
      companies?.map((company) => [company.id, company.name]),
    );
  }, [companies]);

  const companiesToShow = useMemo(() => {
    return value
      .map((id) => {
        return { id, name: companyNames.get(id) || '' };
      })
      .reverse()
      .slice(0, 3);
  }, [value, companyNames]);

  return (
    <>
      {companiesToShow.map((company) => (
        <Tag
          id={String(company.id)}
          key={company.id}
          closable
          onClose={(): void => {
            onDeselect(company.id);
          }}
          className={styles.companyTag}
        >
          {company.name}
        </Tag>
      ))}
      {value.length > 3 && <Tag className={styles.companyTag}>...</Tag>}
    </>
  );
};
