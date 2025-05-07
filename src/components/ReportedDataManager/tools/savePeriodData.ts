import { Company } from 'types';
import { ReportingPeriod } from 'types/reportedData';
import { uiText } from 'constants/uiText';
import { showAPIError, notifyUser } from 'tools';
import { reportedData as reportedDataMgr } from 'dataManagement';
import { PeriodData } from '../types';

export const savePeriodData = ({
  newPeriodConfig,
  newPeriodData,
  companyId,
}: {
  newPeriodConfig: ReportingPeriod;
  newPeriodData: PeriodData;
  companyId?: Company['id'];
}): Promise<void> => {
  const { year, quarter } = newPeriodConfig;

  return reportedDataMgr
    .savePeriodData({
      year,
      quarter,
      values: Array.from(newPeriodData.entries()).map((entry) => ({
        metricId: entry[0],
        value: entry[1],
      })),
      pcId: companyId,
    })
    .then((result) => {
      notifyUser.ok(uiText('directEntry', 'saveOk'));
      return result;
    })
    .catch((e) => {
      showAPIError(uiText('directEntry', 'saveError'))(e);
      throw e;
    });
};
