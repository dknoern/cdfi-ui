import React, { useState } from 'react';
import { ModalWithForm } from '../../../modals';
import { Checkbox, Col, Form, Input, Row } from 'antd';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER } from '../../../constants/ui';
import { PhoneInput } from '../../../components';
import { userStore } from 'store';
import { UserProfilePasswordChange } from './UserProfilePasswordChange';
import { userFieldsRules } from '../../../constants/forms';
import { CurrentUserType } from '../components/Profile';
import { required } from '../../../tools/formRules';
import styles from './UserProfileUpdate.module.scss';

type UserProfileUpdateProps = {
  userData: CurrentUserType | null;
  handleSubmit: (arg: CurrentUserType) => void;
  setUserData: (arg: CurrentUserType | null) => void;
  isUpdateProfile: boolean;
};

const UserProfileUpdate = ({
  userData,
  handleSubmit,
  setUserData,
  isUpdateProfile
}: UserProfileUpdateProps) => {
  const [showPwChangeForm, setShowPwChangeForm] = useState(false);

  const initialValues = {
    username: userData?.username,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    phone: userData?.phone,
    phoneExtension: userData?.phoneExtension,
    emailReminders: userData?.emailReminders,
    uploadReminders: userData?.uploadReminders,
    title: userData?.title ? userData.title : '',
  };

  const checkedEmailReminders = userData?.emailReminders
    ? userData.emailReminders
    : false;
  const checkedUploadReminders = userData?.uploadReminders
    ? userData.uploadReminders
    : false;

  const startSubmit = (values: CurrentUserType) => {
    if (userStore.isAerisAdmin || userStore.isAerisAnalyst || userStore.isStaff || userStore.isContractor) {
      handleSubmit({
        ...values,
        emailReminders: checkedEmailReminders,
        uploadReminders: checkedUploadReminders,
      });
    } else if (userStore.isCdfi) {
      handleSubmit({
        ...values,
        emailReminders: checkedEmailReminders,
      });
    } else {
      handleSubmit({
        ...values,
        emailReminders: checkedEmailReminders,
        uploadReminders: checkedUploadReminders,
      });
    }
  };

  const checkBoxInfo = userStore.isCdfi
    ? { label: 'Upload Reminders', name: 'uploadReminders' }
    : { label: 'Subscription Reminders', name: 'emailReminders' };

  return (
    <ModalWithForm
      formId={'Update Profile'}
      actionButtonDisabled={showPwChangeForm}
      onCancel={() => {
        setUserData(null);
        setShowPwChangeForm(false);
      }}
      visible={!!userData && isUpdateProfile}
      title="User Profile Update"
    >
      <Form
        id={'Update Profile'}
        onFinish={startSubmit}
        layout="vertical"
        hideRequiredMark
        className={styles.form}
        initialValues={initialValues}
      >
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="username"
              rules={[required(), ...userFieldsRules.username]}
              label="Username"
            >
              <Input placeholder="Enter username" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="firstName"
              rules={[required(), ...userFieldsRules.name]}
              label="First Name"
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="lastName"
              rules={[required(), ...userFieldsRules.surname]}
              label="Last Name"
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item name="title" label="Job Title">
              <Input placeholder="Enter title" />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="email"
              rules={[required(), ...userFieldsRules.email]}
              label="Email"
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item name="phone" rules={userFieldsRules.phone} label="Phone">
              <PhoneInput placeholder="Enter phone" />
            </Form.Item>
          </Col>

          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="phoneExtension"
              rules={userFieldsRules.phoneExtension}
              label="Extension"
            >
              <Input placeholder="Ext #" size="large" />
            </Form.Item>
          </Col>
        </Row>
        {(userStore.isCdfi) && (
          <Row>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item name={checkBoxInfo.name} valuePropName="checked">
                <Checkbox>{checkBoxInfo.label}</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
      {userStore.info.impersonatingName ? null : (
        <Row>
          <span
            className={styles.changePasswordSpan}
            onClick={() => setShowPwChangeForm(!showPwChangeForm)}
          >
            {showPwChangeForm && 'Cancel '}Change Password
          </span>
        </Row>
      )}
      {showPwChangeForm && (
        <UserProfilePasswordChange
          username={userData?.username}
          setShowPwChangeForm={setShowPwChangeForm}
          setUserData={setUserData}
        />
      )}
    </ModalWithForm>
  );
};

export default UserProfileUpdate;
