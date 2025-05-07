import React, { FC } from 'react';
import { Form, Tabs } from 'antd';
import { FormProps } from 'types/form';
import { Tab } from '../types';
import styles from './FormTemplate.module.scss';

const { TabPane } = Tabs;

type FormTemplateProps = FormProps & {
  tabs: Tab[];
};

export const FormTemplate: FC<FormTemplateProps> = ({
  tabs,
  onFinish,
  initialValues,
  formId,
}) => {
  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      hideRequiredMark
      className={styles.form}
      initialValues={initialValues}
    >
      <Tabs defaultActiveKey="0" type="card">
        {tabs.map((tab) => {
          const Component = tab.component as React.ComponentType;
          return (
            <TabPane forceRender key={tab.key} tab={tab.name}>
              <Component />
            </TabPane>
          );
        })}
      </Tabs>
    </Form>
  );
};
