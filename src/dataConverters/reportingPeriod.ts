import { FiscalQuarter, ReportingPeriod } from 'types/reportedData';

const month2Quarter = (month: number): FiscalQuarter => {
  let quarter: FiscalQuarter = 4;

  switch (true) {
    case month < 4:
      quarter = 1;
      break;
    case month < 7:
      quarter = 2;
      break;
    case month < 10:
      quarter = 3;
      break;
    default:
      break;
  }

  return quarter;
};

const quarter2Month = (quarter: FiscalQuarter): number => {
  let month = 1;

  switch (quarter) {
    case 4:
      month = 10;
      break;
    case 3:
      month = 7;
      break;
    case 2:
      month = 4;
      break;
    default:
      break;
  }

  return month;
};

// 12/31/2016 -> { quarter: 4, year: 2016 }
const dateStr2ReportingPeriod = (dateStr: string): ReportingPeriod => {
  const [month, , year] = dateStr.split('/').map(Number);
  const quarter = month2Quarter(month);

  return { year, quarter };
};

// { quarter: 4, year: 2016 } -> 2016 Q4
const reportingPeriod2Str = ({ year, quarter }: ReportingPeriod): string =>
  `${year} Q${quarter}`;

const reportingPeriod2DateStr = ({ year, quarter }: ReportingPeriod): string =>
  `${quarter2Month(quarter)}/1/${year}`;

export const reportingPeriodConverters = {
  dateStr2ReportingPeriod,
  reportingPeriod2Str,
  reportingPeriod2DateStr,
};
