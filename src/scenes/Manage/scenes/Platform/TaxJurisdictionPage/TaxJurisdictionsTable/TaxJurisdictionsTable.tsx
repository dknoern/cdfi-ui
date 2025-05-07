import React, { FC, useEffect } from 'react';
import { Spin, Table } from 'antd';
import { observer } from 'mobx-react';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { toJS } from 'mobx';
import { taxJurisdictionStore } from 'store';
import { getPopupContainer } from '../../../../../../tools/antConfig';
import { taxJurisdictionsColumns } from './constants';
import styles from '../TaxJurisdictionPage.module.scss';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import {TaxJurisdictions} from "../../../../../../types/taxJurisdiction";

const pageSizeOptions = ['5', '10', '20'];

export const TaxJurisdictionsTable: FC = observer(() => {
  const {
    getTaxJurisdictionList,
    taxJurisdictionList,
    setPagination,
    pagination,
    loadingTaxJurisdictionList,
    setIsDeleteTaxJurisdiction,
    getDeleteTaxJurisdiction,
    isDeleteTaxJurisdiction,
    taxJurisdiction,
    setTaxJurisdiction,
  } = taxJurisdictionStore;

  useEffect(() => {
    window.scrollTo(0, 0);
    getTaxJurisdictionList(0, 20, { order: 'ascend', field: 'name' });
  }, [getTaxJurisdictionList]);

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<TaxJurisdictions> | SorterResult<TaxJurisdictions>[],
  ) => {
    const pageNumber =
      pagination.current !== undefined
        ? pagination.current - 1
        : pagination.current;
    setPagination({
      current: pageNumber,
      pageSize: pagination.pageSize,
    });
    getTaxJurisdictionList(pageNumber, pagination.pageSize, sorter);
  };

  const clickConfirmDeleteTaxJurisdiction = async () => {
    getDeleteTaxJurisdiction(taxJurisdiction?.id);
    setIsDeleteTaxJurisdiction(false);
    setTaxJurisdiction({});
  };

  return (
    taxJurisdictionList && (
      <>
        {loadingTaxJurisdictionList ? (
          <div className={styles.spin}>
            <Spin spinning />
          </div>
        ) : null}

        <Table
          tableLayout="fixed"
          rowKey="id"
          showSorterTooltip
          onChange={onTableChange}
          pagination={{
            ...toJS(pagination),
            showSizeChanger: true,
            pageSizeOptions,
            total: taxJurisdictionList.totalElements,
          }}
          dataSource={taxJurisdictionList.content}
          columns={taxJurisdictionsColumns}
          getPopupContainer={getPopupContainer}
          scroll={{ x: 'max-content' }}
        />
        <ConfirmModal
          visible={isDeleteTaxJurisdiction}
          onClose={(): void => setIsDeleteTaxJurisdiction(false)}
          onClick={clickConfirmDeleteTaxJurisdiction}
          text="Do you really want to delete this tax jurisdiction?"
          buttonText="Yes"
        />
      </>
    )
  );
});
