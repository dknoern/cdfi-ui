import React, { FC } from 'react';
import { Form, Divider } from 'antd';
import { FormProps } from 'antd/lib/form';
import { FORM_ITEM_VERTICAL_LABEL_SPAN } from 'constants/ui';
import { REInfoGroup, TagsGroup } from 'forms/shared';
import { GeneralInfoFormModel } from './types';
import { ContactGroup, InvestmentsGroup } from './components/formGroups';
import { prepareDataForSave } from './tools';
import styles from './CompanyInfoForm.module.scss';

type CompanyInfoFormProps = {
  formId: string;
  initialValues: GeneralInfoFormModel;
  onFinish: NonNullable<FormProps['onFinish']>;
  onValuesChange?: FormProps['onValuesChange'];
};

export const CompanyInfoForm: FC<CompanyInfoFormProps> = ({
  initialValues,
  onFinish,
  formId,
  onValuesChange,
}) => {
  return (
    <Form
      id={formId}
      size="large"
      hideRequiredMark
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      initialValues={initialValues}
      onFinish={(values): void => {
        onFinish(
          prepareDataForSave((values as unknown) as GeneralInfoFormModel),
        );
      }}
      onValuesChange={onValuesChange}
    >
      <REInfoGroup />
      <Divider className={styles.stepDivider} />
      <ContactGroup />
      <Divider className={styles.stepDivider} />
      <InvestmentsGroup />
      <Divider className={styles.stepDivider} />
      <TagsGroup num={10} />
    </Form>
  );
};
