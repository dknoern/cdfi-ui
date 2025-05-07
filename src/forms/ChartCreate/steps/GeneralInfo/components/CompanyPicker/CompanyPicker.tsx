import React, { FC, ReactElement, useCallback } from 'react';
import { Col, Row, Select, Divider, Button } from 'antd';
import { Company } from 'types';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { SelectedCompanies } from './SelectedCompanies';
import styles from './CompanyPicker.module.scss';

type CompanyPickerProps = {
  options?: Company[];
  value?: Company['id'][];
  onChange?: (payload: Company['id'][]) => void;
};

export const CompanyPicker: FC<CompanyPickerProps> = ({
  options,
  value,
  onChange,
}) => {
  const isAllCompaniesSelected = value?.length === options?.length;

  const onSelect = useCallback(
    (selectedItem: Company['id']) => {
      if (onChange) onChange([...(value ?? []), selectedItem]);
    },
    [onChange, value],
  );

  const onDeselect = useCallback(
    (deselectedItem: Company['id']) => {
      if (onChange)
        onChange((value ?? []).filter((item) => item !== deselectedItem));
    },
    [onChange, value],
  );

  const onSelectAll = useCallback(() => {
    if (onChange)
      onChange(
        isAllCompaniesSelected ? [] : (options ?? []).map((item) => item.id),
      );
  }, [isAllCompaniesSelected, onChange, options]);

  return (
    <Row gutter={[GRID_GUTTER * 2, GRID_GUTTER / 2]}>
      <Col xs={GRID_COL_FULL_ROW_SPAN} xl={GRID_COL_HALF_ROW_SPAN}>
        <Select
          mode="multiple"
          showSearch
          showArrow
          disabled={!options}
          placeholder="Select Investments"
          maxTagCount={0}
          tagRender={(): ReactElement => <></>}
          optionFilterProp="label"
          options={(options ?? []).map(({ id, name }) => ({
            label: name,
            value: id,
          }))}
          value={value}
          onSelect={onSelect}
          onDeselect={onDeselect}
          dropdownRender={(menu): ReactElement => (
            <div id="portfolioCompaniesDropdown">
              <Button
                id="selectAllButton"
                type="link"
                onClick={onSelectAll}
                className={styles.buttonSelectAll}
              >
                {isAllCompaniesSelected ? 'Deselect All' : 'Select all'}
              </Button>
              <Divider style={{ margin: 0 }} />
              {menu}
            </div>
          )}
        />
      </Col>
      {!!value?.length && (
        <Col md={GRID_COL_FULL_ROW_SPAN} xl={GRID_COL_HALF_ROW_SPAN}>
          <SelectedCompanies
            companies={options}
            value={value}
            onDeselect={onDeselect}
          />
        </Col>
      )}
    </Row>
  );
};
