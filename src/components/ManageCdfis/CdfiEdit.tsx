import React, { FC, useCallback} from 'react';
import { ContentLimiter, PageSectionWrapper } from '..';
import { CdfiEditForm } from 'forms/AdminForms/CdfiEdit';
import { EditableCdfi } from 'forms/AdminForms/CdfiEdit/types';
import { CdfiEditFormData } from 'types';
import { saveCdfi } from '../../scenes/Dashboard/scenes/Organizations/tools';
import { Form } from 'antd';
import { cdfiStore } from 'store';
import { useCdfis } from './../../dataManagement';
import { useHistory } from 'react-router-dom';

interface CdfiEditProps {
  cdfiEditData: EditableCdfi | undefined;
  isEditForm: boolean;
}

export const CdfiEdit: FC<CdfiEditProps> = (props) => {

  const { cdfiId } = cdfiStore;
  const { data: cdfiOrgs } = useCdfis();
  const cdfi = cdfiOrgs?.find((cdfi) => cdfi.id == cdfiId);

  const onFinishEdit = useCallback(() => {
    form.resetFields();

    if (props.isEditForm) {
      history.push(`/manage/cdfi/${cdfiId}/org-details`);
    }
  }, []);

  const saveHandler = useCallback((values: CdfiEditFormData) => {
    const proceedSave = (): ReturnType<typeof saveCdfi> =>
      saveCdfi(cdfiId, values, props.isEditForm);
    proceedSave().then(onFinishEdit);
  }, []);

  const history = useHistory();
  const onCancel = useCallback(() => {
    history.push(`/manage/cdfi/${cdfiId}/org-details`);
  }, []);

  const [form] = Form.useForm();

  return (
    <ContentLimiter>
      <PageSectionWrapper
        title={
          props.isEditForm
            ? 'Update Organization Details for ' + cdfi?.name
            : 'Create New CDFI'
        }
      >
        <CdfiEditForm
          onFinish={saveHandler}
          onCancel={onCancel}
          form={form}
          isEditForm={props.isEditForm}
          initialValues={props.cdfiEditData}
        ></CdfiEditForm>
      </PageSectionWrapper>
    </ContentLimiter>
  );
};
