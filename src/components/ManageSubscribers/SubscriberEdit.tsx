import React, { FC, useCallback} from 'react';
import { ContentLimiter, PageSectionWrapper } from '..';
import { SubscriberEditForm } from 'forms/AdminForms/SubscriberEdit';
import { EditableSubscriber } from 'forms/AdminForms/SubscriberEdit/types';
import { SubscriberEditFormData } from 'types';
import { saveSubscriber } from '../../scenes/Dashboard/scenes/Organizations/tools';
import { Form } from 'antd';
import { subscriberStore } from 'store';
import { useSubscribers } from '../../dataManagement';
import { useHistory } from 'react-router-dom';

interface SubscriberEdit {
  subscriberEditData: EditableSubscriber | undefined;
  isEditForm: boolean;
}

export const SubscriberEdit: FC<SubscriberEdit> = (props) => {

  const { subscriberId } = subscriberStore;
  const { data: subscribers } = useSubscribers();
  const subscriber = subscribers?.find((subscriber) => subscriber.id == subscriberId);

  const onFinishEdit = useCallback(() => {
    form.resetFields();

    if (props.isEditForm) {
      history.push(`/manage/subscriber/${subscriberId}/org-details`);
    }
  }, []);

  const saveHandler = useCallback((values: SubscriberEditFormData) => {
    const proceedSave = (): ReturnType<typeof saveSubscriber> =>
    saveSubscriber(subscriberId, values, props.isEditForm);
    proceedSave().then(onFinishEdit);
  }, []);

  const history = useHistory();
  const onCancel = useCallback(() => {
    history.push(`/manage/subscriber/${subscriberId}/org-details`);
  }, []);

  const [form] = Form.useForm();

  return (
    <ContentLimiter>
      <PageSectionWrapper
        title={
          props.isEditForm
            ? 'Update Organization Details for ' + subscriber?.name
            : 'Create New Subscriber'
        }
      >
        <SubscriberEditForm
          onFinish={saveHandler}
          onCancel={onCancel}
          form={form}
          isEditForm={props.isEditForm}
          initialValues={props.subscriberEditData}
        ></SubscriberEditForm>
      </PageSectionWrapper>
    </ContentLimiter>
  );
};
