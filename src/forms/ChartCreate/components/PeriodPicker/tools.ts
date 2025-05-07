import moment from 'moment';
import { DatePickerProps as AntDatePickerProps } from 'antd/lib/date-picker';
import { store } from 'forms/ChartCreate/store';

const { data } = store;

export const disabledDate = (
  type: string,
): AntDatePickerProps['disabledDate'] => {
  switch (type) {
    case 'periodEnd':
      return (currentDate): boolean => currentDate > moment(data.periodEnd);

    case 'periodStart':
    default:
      return (currentDate): boolean => currentDate < moment(data.periodStart);
  }
};
