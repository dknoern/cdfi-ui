import { Country } from 'types';
import { apiProcessor } from 'tools';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools/APITools';
import { ManagerDefault } from './ManagerDefault';

const listCountries = (): Promise<Country[]> =>
  apiProcessor.get('countriesList');

export class CountriesManager extends ManagerDefault {
  reload = (): void => {
    this.proceedReload(
      listCountries,
      showAPIError(uiText('countries', 'dataLoadError')),
    );
  };
}
