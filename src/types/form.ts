import React from 'react';
import { FormInstance, FormProps as AntFormProps } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';

export type FormSubmitFn<
  ReturnValueType = void,
  DataValueType extends Store = {},
> = (form: FormInstance) => (values: DataValueType) => ReturnValueType;

export type LoginFormResult = {
  username: string;
  password: string;
};

export type ChangePasswordFormResult = {
  new: string; // password
  newRepeated: string;
};

export type ResetPasswordFormResult = ChangePasswordFormResult & {
  resetCode: string;
};

export type AntFieldProps<T> = {
  value?: T;
  onChange?: (newValue: T) => void;
};

export type CustomAntInput<T, AdditionalProps = {}> = React.FC<
  AntFieldProps<T> & AdditionalProps
>;

export type FormProps<T = Store> = {
  onFinish: AntFormProps<T>['onFinish'];
  initialValues?: Partial<T>;
  formId: string;
};

export type SubscriberSubscriptionFormProps<T = Store> = {
  onFinish: AntFormProps<T>['onFinish'];
  initialValues?: Partial<T>;
  formId: string;
  form: FormInstance;
  onCancel: () => void;
  actionButtonDisabled: boolean;
  actionButtonText: string;
  setIsAtLeastOneCheckboxChecked: (checked: boolean) => void;
};

export type CustomDataReportFormProps<T = Store> = {
  onFinish: AntFormProps<T>['onFinish'];
  initialValues?: Partial<T>;
  formId: string;
  form: FormInstance;
  setFilePresented: (filePresented: boolean) => void;
  filePresented: boolean;
};

export type SupportHistoryEmailFormProps<T = Store> = {
  onFinish: AntFormProps<T>['onFinish'];
  formId: string;
  form: FormInstance;
};

export type GlobalListContentsFormProps<T = Store> = {
  onFinish: AntFormProps<T>['onFinish'];
  formId: string;
  form: FormInstance;
  initialValues?: Partial<T>;
  setFinishedButtonClicked?: (value: boolean) => void;
};

export type PeerGroupsFormProps<T = Store> = {
  onFinish: AntFormProps<T>['onFinish'];
  formId: string;
  form: FormInstance;
  onValuesChange: AntFormProps<T>['onValuesChange'];
};
