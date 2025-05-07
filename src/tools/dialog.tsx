import React from 'react';
import { Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { ModalFuncProps } from 'antd/lib/modal';

const { confirm, error, success, info } = Modal;

type DialogProps = Partial<ModalFuncProps>;

const makeDialogProps = ({
  content,
  okButtonProps,
  cancelButtonProps,
  ...restProps
}: DialogProps): DialogProps => {
  return {
    ...restProps,
    content: <div id="dialogContent">{content}</div>,
    okButtonProps: {
      id: 'dialogOkButton',
      ...okButtonProps,
    },
    cancelButtonProps: {
      id: 'dialogCancelButton',
      ...cancelButtonProps,
    },
  };
};

export class Dialog {
  static confirm(props: DialogProps = {}): void {
    const defaultProps = {
      icon: <ExclamationCircleOutlined />,
      title: 'Confirm',
      content: 'Please, confirm action',
    };

    confirm(makeDialogProps({ ...defaultProps, ...props }));
  }

  static error(props: DialogProps = {}): void {
    const defaultProps = {
      icon: <CloseCircleOutlined />,
      title: 'Error',
      content: 'An error occurred',
    };

    error(makeDialogProps({ ...defaultProps, ...props }));
  }

  static success(props: DialogProps = {}): void {
    const defaultProps = {
      icon: <CheckCircleOutlined />,
      title: 'Success',
      content: 'Action performed successfully',
    };

    success(makeDialogProps({ ...defaultProps, ...props }));
  }

  static info(props: DialogProps = {}): void {
    const defaultProps = {
      icon: <InfoCircleOutlined />,
      title: 'Info',
      content: 'Action performed successfully',
    };

    info(makeDialogProps({ ...defaultProps, ...props }));
  }
}
