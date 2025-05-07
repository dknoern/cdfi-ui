import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { useCountries } from 'dataManagement';

type CountrySelectProps = {
  value?: SelectProps<string>['value'];
  onChange?: SelectProps<string>['onChange'];
};

export const CountrySelectFn: FC<CountrySelectProps> = ({
  value,
  onChange,
}) => {
  const { data: countries, isLoading } = useCountries();

  const selectValue =
    value !== undefined && value?.length > 0 ? value : undefined;

  return (
    <Select
      value={selectValue}
      onChange={onChange}
      showSearch
      placeholder="Select Country"
      loading={isLoading}
    >
      {(countries ?? []).map((country) => (
        <Select.Option key={country.id} value={country.country}>
          {country.country}
        </Select.Option>
      ))}
    </Select>
  );
};

export const CountrySelect = observer(CountrySelectFn);
