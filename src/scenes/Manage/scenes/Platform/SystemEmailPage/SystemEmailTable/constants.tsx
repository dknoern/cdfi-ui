import React, {ReactNode} from "react";
import { ColumnType } from 'antd/lib/table';
import {SystemEmailColumns, SystemEmailRowItem} from 'types';
import {systemEmailStore} from "../../../../../../store";
import {toJS} from "mobx";
import { format } from 'date-fns'
import {Button} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {Link} from "react-router-dom";

export const systemEmailColumns: ColumnType<SystemEmailRowItem>[] = [
  {
    key: 'category',
    title: 'Category',
    dataIndex: SystemEmailColumns.EMAIL_CATEGORY_ID,
    sorter: true,
    render: (value: number): ReactNode => {
      const { emailCategories } = systemEmailStore;
      if (toJS(emailCategories) === null) {
        return []
      }
      return toJS(emailCategories)?.find(item => item.id === value)?.name
    },
    defaultSortOrder: 'ascend',
  },
  {
    key: 'emailSubject',
    title: 'Email Subject',
    dataIndex: SystemEmailColumns.SUBJECT,
    sorter: true,
  },
  {
    key: 'lastUpdated',
    title: 'Last Updated',
    dataIndex: SystemEmailColumns.LAST_UPDATED,
    align: 'center',
    width: '15%',
    sorter: true,
    render: (value: string ): ReactNode => {
      return format(new Date(value), 'P')
    }
  },
  {
    key: 'updatedBy',
    title: 'Updated By',
    dataIndex: SystemEmailColumns.UPDATED_BY,
    align: 'center',
    width: '15%',
    sorter: true,
  },
  {
    key: 'enabled',
    title: 'Enabled?',
    dataIndex: SystemEmailColumns.ENABLED,
    align: 'center',
    width: '10%',
    render: (value: boolean ): ReactNode => {
      return value ? 'Yes' : 'No';
    },
    sorter: true
  },
  {
    key: 'code',
    title: 'Code',
    dataIndex: SystemEmailColumns.CODE,
    align: 'center',
    width: '10%',
  },
  {
    key: 'actionButtons',
    title: 'Action',
    width: 100,
    render: (record): ReactNode => {
      const {
        setSystemEmail,
        setIsEditCustomEmail,
        setIsDeleteSystemEmail,
        setIsEditForm
      } = systemEmailStore;
      return (
        <>
          <Link to={`/system-email/${record.id}`}>
            <Button
              type="link"
              onClick={() => {
                setIsEditCustomEmail(true)
                setIsEditForm(false)
                setSystemEmail(record);
              }}
              icon={<EditFilled />}
            />
          </Link>

          <Button
            onClick={() => {
              setIsDeleteSystemEmail(true)
              setSystemEmail(record);
            }}
            type="link"
            icon={<DeleteFilled />}
          />
        </>
      );
    },
  },
];

