import React, { ReactNode } from 'react';
import { ColumnType } from 'antd/lib/table';
import { taxJurisdictionStore } from 'store';
import { Button } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const taxJurisdictionsColumns: ColumnType<any>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    width: 200,
    sorter: true,
    defaultSortOrder: 'ascend',
  },
  {
    key: 'language',
    title: 'Language',
    dataIndex: 'language',
    width: 200,
    sorter: true,
  },
  {
    key: 'country',
    title: 'Country',
    dataIndex: 'country',
    width: 200,
    sorter: true,
  },
  {
    key: 'actionButtons',
    title: 'Action',
    width: 100,
    render: (record): ReactNode => {
      const {
        setTaxJurisdiction,
        setIsEditTaxJurisdiction,
        setIsDeleteTaxJurisdiction,
        isEditTaxJurisdiction,
      } = taxJurisdictionStore;
      return (
        <>
          <Link to={`/tax-jurisdiction/${record.id}`}>
            <Button
              type="link"
              onClick={() => {
                setIsEditTaxJurisdiction(true);
                setTaxJurisdiction(record);
                console.log(isEditTaxJurisdiction);
              }}
              icon={<EditFilled />}
              key={`edit-${record.id}`}
            />
          </Link>

          <Button
            onClick={() => {
              setIsDeleteTaxJurisdiction(true);
              setTaxJurisdiction(record);
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
