import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult, Country } from 'types';
import { dataMan, ManagerName } from 'dataManagement/managers';

const countriesManager = dataMan.manager(ManagerName.countries);

interface UseCountriesResult extends DataHookResult {
  data: Country[] | null;
}

export const useCountries = (): UseCountriesResult => {
  useEffect(countriesManager.init);

  return useObserver(() => countriesManager.store);
};
