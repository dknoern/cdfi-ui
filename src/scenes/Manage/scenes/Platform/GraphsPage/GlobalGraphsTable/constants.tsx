import React, { ReactNode } from 'react';
import { ColumnType } from 'antd/lib/table';
import { globalGraphsStore } from '../../../../../../store';
import { Button } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const globalGraphsColumns: ColumnType<any>[] = [
  {
    key: 'title',
    title: 'Title',
    dataIndex: 'title',
    width: 350,
    sorter: true,
    defaultSortOrder: 'ascend',
  },
  {
    key: 'code',
    title: 'Code',
    dataIndex: 'code',
    width: 100,
    sorter: true,
  },
  {
    key: 'graphType',
    title: 'Graph Type',
    dataIndex: 'graphType',
    width: 200,
    sorter: true,
  },
  {
    key: 'unitType',
    title: 'Unit Type',
    dataIndex: 'unitType',
    width: 200,
    sorter: true,
  },
  {
    key: 'notes',
    title: 'Notes',
    dataIndex: 'notes',
    width: 300,
  },
  {
    key: 'actionButtons',
    title: 'Action',
    width: 100,
    render: (record): ReactNode => {
      const {
        setGlobalGraph,
        setIsEditGraph,
        setIsDeleteGlobalGraph,
        isEditGraph,
      } = globalGraphsStore;
      return (
        <>
          <Link to={`/global-graphs/${record.id}`}>
            <Button
              type="link"
              onClick={() => {
                setIsEditGraph(true);
                setGlobalGraph(record);
                console.log(isEditGraph);
              }}
              icon={<EditFilled />}
              key={`edit-${record.id}`}
            />
          </Link>

          <Button
            onClick={() => {
              setIsDeleteGlobalGraph(true);
              setGlobalGraph(record);
            }}
            type="link"
            icon={<DeleteFilled />}
            key={`delete-${record.id}`}
          />
        </>
      );
    },
  },
];
