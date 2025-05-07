import React, { FC } from 'react';
import { Form, Divider } from 'antd';
import { FormProps } from 'antd/lib/form';
import { Company } from 'types';
import { InvestmentCreateData } from 'types/investment';
import { TagsGroup } from 'forms/shared';
import { useCompanies } from 'dataManagement';
import { CommonInfo, ContactGroup, InvestmentsGroup } from './groups';
import styles from './formStyles.module.scss';

type CurrentStepData = InvestmentCreateData['generalInfo'];

type ComponentProps = FormProps<CurrentStepData> & {
  availableContacts: Company['contacts'];
  isEdit?: boolean;
};

export const InvestmentInfoForm: FC<ComponentProps> = ({
  availableContacts,
  isEdit = false,
  ...formProps
}) => {
  const { data: companies } = useCompanies();

  return (
    <Form<CurrentStepData> {...formProps}>
      <CommonInfo
        availableCompanies={companies ?? []}
        isEdit={isEdit}
        portfolioId={formProps.initialValues?.portfolioId}
      />
      <Divider className={styles.stepDivider} />
      <ContactGroup availableContacts={availableContacts} />
      <Divider className={styles.stepDivider} />
      <InvestmentsGroup />
      <Divider className={styles.stepDivider} />
      <TagsGroup num={10} />
    </Form>
  );
};
