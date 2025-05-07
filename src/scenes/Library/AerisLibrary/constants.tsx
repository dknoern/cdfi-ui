import React, { ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Note } from 'types';
import moment from 'moment';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

export const makeNotesColumns = (
  setDeleteNoteId: (subscriptionId: number | undefined) => void,
): ColumnProps<Note>[] => {
  const onDeleteClick = (noteId: number) => () => {
    setDeleteNoteId(noteId);
  };

  return [
    {
      key: 'text',
      dataIndex: 'text',
      title: 'Note',
    },
    {
      key: 'dateStamp',
      dataIndex: 'dateStamp',
      title: 'Date',
      width: 100,
      render: (value): ReactNode => (
        <span>{moment(value).format('MM/DD/YYYY')}</span>
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      align: 'right',
      width: 50,
      render: (value, subscription): ReactNode => (
        <>
          <Button
            type="link"
            onClick={onDeleteClick(subscription.id)}
            name="delete"
            value={subscription.id}
            icon={<DeleteFilled />}
            title="Delete subscription"
          />
        </>
      ),
    },
  ];
};
