import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools/APITools';
import { listAcceptedMetrics } from 'dataManagement/operations/acceptedMetricsOperations';
import { ManagerDefault } from './ManagerDefault';

export class AcceptedMetricsManager extends ManagerDefault {
  reload = (): void => {
    this.proceedReload(
      listAcceptedMetrics,
      showAPIError(uiText('metrics', 'loadError')),
    );
  };
}
