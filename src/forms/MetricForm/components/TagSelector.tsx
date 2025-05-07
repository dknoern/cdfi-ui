import React, { FC } from 'react';
import { TreeSelect, Form, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TagGroup } from 'types';
import {
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { FormSecondaryLabel } from 'components';
import { maxLength } from 'tools/formRules';
import { TagTreeItem } from '../types';

enum LabelText {
  sdgs = 'SDGs',
  irisplus = 'IRIS+',
  custom = 'Custom tags',
}

type TagSelectorProps = {
  options?: TagTreeItem[];
  groupId: TagGroup;
};

export const TagSelector: FC<TagSelectorProps> = ({ options, groupId }) => {
  return (
    <Col sm={GRID_COL_FULL_ROW_SPAN / 3}>
      <Form.Item
        name={['tags', groupId]}
        label={<FormSecondaryLabel text={LabelText[TagGroup[groupId]]} />}
        labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
        rules={[maxLength(5, 'array')]}
      >
        <TreeSelect
          treeData={options}
          loading={false}
          treeCheckable
          switcherIcon={<DownOutlined />}
          showArrow
          showSearch
          multiple
          filterTreeNode
          treeNodeFilterProp="title"
          showCheckedStrategy="SHOW_ALL"
          placeholder="Select Tags"
          maxTagCount={0}
          maxTagPlaceholder={(values): React.ReactNode =>
            `Selected tags: ${values.length}`
          }
        />
      </Form.Item>
    </Col>
  );
};
