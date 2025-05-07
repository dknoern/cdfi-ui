import React, { FC, useCallback, useState, useEffect } from 'react';
import { ExplorerFilter, manageExplorerStore } from 'store/manageExplorerStore';
import { notifyUser } from 'tools';
import { VoidFn } from 'types';
import { ModalWithForm } from 'modals';
import { MODAL_WIDTH } from 'constants/ui';
import { Checkbox, Form } from 'antd';
import { Equation } from '../../../../../forms/ChartCreate/types';
import styles from './ManageExplorerFilters.module.scss';

type ManageExplorerFiltersEditModalProps = {
  availableFilters: Equation[];
  explorerFilters: ExplorerFilter[];
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  formId: string;
};

export const ManageExplorerFiltersEditModal: FC<
  ManageExplorerFiltersEditModalProps
> = ({
  visible,
  onClose,
  onFinish,
  formId,
  availableFilters,
  explorerFilters,
}) => {
  const { createExplorerFilter, getExplorerFilters } = manageExplorerStore;
  const [form] = Form.useForm();
  const [filteredAvailable, setFilteredAvailable] = useState<Equation[]>([]);

  const onSubmitExplorerFilter = useCallback(
    (formValues: any) => {
      const addedFilters = Object.entries(formValues)
        .filter(([_, checked]) => checked)
        .map(([stringified, _]) => JSON.parse(stringified));

      const promises = addedFilters.map((filter) =>
        createExplorerFilter(filter),
      );

      Promise.all(promises)
        .then(() => {
          getExplorerFilters();
          notifyUser.ok('manageExplorerFilters', 'createOk');
          onClose();
        })
        .catch(() => notifyUser.error('manageExplorerFilters', 'createError'));
    },
    [onFinish],
  );

  useEffect(() => {
    setFilteredAvailable(
      availableFilters.filter(
        (available) =>
          !explorerFilters.find(
            (equation) => equation.equationId === available.id,
          ),
      ),
    );
  }, [availableFilters, explorerFilters]);

  return (
    <>
      <ModalWithForm
        formId={formId}
        title="Add Filters"
        visible={visible}
        onCancel={onClose}
        actionButtonText="Add"
        width={MODAL_WIDTH.SMALL}
      >
        <Form
          id={formId}
          onFinish={onSubmitExplorerFilter}
          layout="vertical"
          form={form}
          requiredMark={false}
        >
          <div className={styles.listContainer}>
            {filteredAvailable.map((eq) => (
              <Form.Item
                className={styles.checkboxItem}
                key={eq.id}
                name={JSON.stringify({ equationId: eq.id })}
                valuePropName="checked"
              >
                <Checkbox>{eq.name}</Checkbox>
              </Form.Item>
            ))}
          </div>
        </Form>
      </ModalWithForm>
    </>
  );
};
