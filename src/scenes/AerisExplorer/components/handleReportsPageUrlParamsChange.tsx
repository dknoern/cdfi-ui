import { aerisExplorerPeerGroupStore } from 'store';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CompareAggregate } from '../constants';

const { reportsPageUrlParams, setReportsPageUrlParams, setCompareAggregate } =
  aerisExplorerPeerGroupStore;

export const handleCheckboxChange = (
  checkedValues: CheckboxValueType[],
  checkboxOptions: { label: string; value: string }[],
) => {
  const newParams: { [key: string]: boolean | undefined } = {
    ...reportsPageUrlParams,
  };
  const allYearsWasChecked = newParams.allYears;

  checkboxOptions.forEach((option) => {
    if (Object.prototype.hasOwnProperty.call(newParams, option.value)) {
      newParams[option.value] = checkedValues.includes(option.value);
    }
  });

  if (checkedValues.includes('allYears')) {
    newParams.showIncomplete = true;
  } else if (allYearsWasChecked) {
    newParams.showIncomplete = false;
  }

  setReportsPageUrlParams(newParams);
};

export const handleCompareAggregateToggle = (checked: boolean) => {
  setCompareAggregate(
    checked ? CompareAggregate.CDFI : CompareAggregate.Quartile,
  );
  return checked;
};
