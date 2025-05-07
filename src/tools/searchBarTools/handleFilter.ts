import { CustomDataReportData } from 'types';
import { getStatusLabel } from 'scenes/CustomDataReports/CustomDataReportsAdmin/constants';
export const handleFilter = <T>(textValue: string, data: Array<T>) => {
  let stringifiedObj: string = '';

  const filtered: Array<T> = data?.filter((item) => {
    stringifiedObj = Object.values(item).join('').toLowerCase();
    return stringifiedObj.includes(textValue);
  });

  return filtered;
};

export const handleFilterFile = (textValue: string, data: any) => {
  const filtered = data?.map((item: { children: any[]; }) => {
    // @ts-ignore
    const filterChildren = item?.children?.filter((item) => {
      return item.fileName.toLowerCase().includes(textValue);
    });
    return {...item, children: filterChildren};
  });
  // @ts-ignore
  return textValue.length > 0 ? filtered.filter(value => value.children.length > 0) : filtered;
};

export const handleFilterCustomDataReport = (
  textValue: string,
  data: Array<CustomDataReportData>,
) => {
  let stringifiedObj: string = '';

  const filtered: Array<CustomDataReportData> = data?.filter((item) => {
    stringifiedObj = Object.values(item).join('').toLowerCase();
    stringifiedObj += item.contact?.firstName + ' ' + item.contact?.lastName;
    stringifiedObj += item.generator?.firstName + ' ' + item.generator?.lastName;
    stringifiedObj += item.requester?.firstName + ' ' + item.requester?.lastName;
    stringifiedObj += getStatusLabel(item.status);
    stringifiedObj = stringifiedObj.toLowerCase();
    return stringifiedObj.includes(textValue);
  });

  return filtered;
};
