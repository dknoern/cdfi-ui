import React from 'react';
import { Checkbox, Form, Modal, Button } from 'antd';
import { CheckboxOptionType } from 'antd/es/checkbox';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { Analyst } from './types';
import { User } from '../../../../types';
import { addIndexAsKey } from './AnalystDashboard';
import styles from './ManageAnalysts.module.scss';
import { updateCdfiAnalysts } from 'dataManagement/operations/cdfiOperations';

type ManageAnalystsProps = {
  isVisible: boolean;
  onCancel: () => void;
  data: Analyst[] | undefined;
  currentAnalysts: User[] | undefined;
  cdfiName: string;
  cdfiId: number;
  setCurrentAnalysts: (arg: User[]) => void;
};

const ManageAnalysts = ({
  isVisible,
  onCancel,
  data,
  currentAnalysts,
  cdfiName,
  cdfiId,
  setCurrentAnalysts,
}: ManageAnalystsProps) => {
  const currentAnalystsIds = currentAnalysts?.map((analyst) =>
    analyst.id.toString(),
  );

  const sortTagsArray = (a: Analyst, b: Analyst) => {
    let aFirstName = a.firstName.toLowerCase();
    let bFirstName = b.firstName.toLowerCase();
    let aLastName = a.lastName.toLowerCase();
    let bLastName = b.lastName.toLowerCase();

    if (aFirstName !== bFirstName) {
      if (aFirstName < bFirstName) {
        return -1;
      }
      if (aFirstName > bFirstName) {
        return 1;
      }
      return 0;
    } else {
      if (aLastName < bLastName) {
        return -1;
      }
      if (aLastName > bLastName) {
        return 1;
      }
      return 0;
    }
  };

  const options: CheckboxOptionType[] | undefined = data?.sort(sortTagsArray).map(
    (analyst: Analyst) => {
      return {
        label: `${analyst.firstName} ${analyst.lastName}`,
        value: `${analyst.id}`,
      };
    },
  );

  const handleSubmit = (values: any) => {
    updateCdfiAnalysts(cdfiId, { analystIds: values.checkboxes })
      .then((res) => {
        notifyUser.ok(uiText('updateAllAnalysts', 'updateOk'));
        setCurrentAnalysts(addIndexAsKey(res ? res : []));
      })
      .catch((e) =>
        notifyUser.error(uiText('updateAllAnalysts', 'updateError')),
      );
    onCancel();
  };

  const title = (
    <div>
      <h2 className={styles.title}>Assign Analysts</h2>
      <h3 className={styles.subTitle}>Assign analyst(s) for {cdfiName}.</h3>
    </div>
  );

  const FORM_ID = 'mngAnalysts';

  return (
    <Modal
      visible={isVisible}
      onCancel={onCancel}
      wrapClassName={styles.modalWrap}
      destroyOnClose
      centered
      closable={true}
      title={title}
      footer={[
        <Button
          key="cancelBtn"
          htmlType="reset"
          type="default"
          onClick={onCancel}
          className={styles.cancelBtn}
        >
          Cancel
        </Button>,
        <Button
          key="actionBtn"
          htmlType="submit"
          form={FORM_ID}
          type="primary"
          className={styles.actionBtn}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        id={FORM_ID}
        onFinish={handleSubmit}
        initialValues={{ checkboxes: currentAnalystsIds }}
      >
        <Form.Item name="checkboxes">
          <Checkbox.Group
            className={styles.list}
            options={options}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManageAnalysts;
