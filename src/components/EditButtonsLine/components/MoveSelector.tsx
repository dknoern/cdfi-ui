import React, { FC } from 'react';
import { DirectoryTreeProps } from 'antd/lib/tree';
import { Form, Button, Tree } from 'antd';
import { FolderFilled } from '@ant-design/icons';
import { VoidFn } from 'types';
import { isSelected } from 'tools/formRules';
import { withMovePrefix } from './tools';
import styles from '../Popover.module.scss';

const { DirectoryTree } = Tree;

export type MoveSelectorProps = {
  onCancel: VoidFn;
  onSubmit: (id: number) => void;
  treeData: DirectoryTreeProps['treeData'];
};

export const MoveSelector: FC<MoveSelectorProps> = ({
  onCancel,
  onSubmit,
  treeData,
}) => {
  const [form] = Form.useForm();

  return (
    <div className={styles.container}>
      <Form
        onFinish={(values): void => {
          onSubmit(values.item);
        }}
        layout="vertical"
        size="middle"
        className={styles.moveForm}
        initialValues={{ item: undefined }}
        form={form}
        hideRequiredMark={true}
      >
        <Form.Item
          label="Select new folder for document:"
          name="item"
          rules={[isSelected()]}
        >
          <DirectoryTree
            onSelect={(keys): void => {
              form.setFieldsValue({ item: keys[0] });
            }}
            treeData={treeData}
            icon={<FolderFilled className={styles.folderIcon} />}
          />
        </Form.Item>
        <div className={styles.buttons}>
          <Button
            id={withMovePrefix('cancelButton')}
            htmlType="reset"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            id={withMovePrefix('updateButton')}
            htmlType="submit"
            type="primary"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
