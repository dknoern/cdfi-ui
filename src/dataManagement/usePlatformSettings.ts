import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import {
  PlatformSettingsManager,
  PlatformSettingsManagerResults,
  SupportRequestSubjectsManagerResults,
  SupportRequestSubjectsManager,
  LendingTypesManagerResults,
  LendingTypesManager,
  TargetBenefeficiariesManager,
  TargetBenefeficiariesResults,
  AreasServedManager,
  AreasServedResults,
  ImpactAreasManager,
  ImpactAreasResults,
  SubImpactAreasManager,
  SubImpactAreasResults,
  OrganizationTypesManager,
  OrganizationTypesResults,
} from './managers/PlatformSettingsManager';

type UsePlatformSettingsResult = DataHookResult & {
  data: PlatformSettingsManagerResults;
};

const mgr = dataMan.manager(
  ManagerName.platformSettings,
) as PlatformSettingsManager;

export const usePlatformSettings = (): UsePlatformSettingsResult => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => {
    return { ...(mgr.store as UsePlatformSettingsResult) };
  });
};

type UseSupportRequestSubjectsResult = DataHookResult & {
  data: SupportRequestSubjectsManagerResults;
};

const mgrSupportRequestSubjects = dataMan.manager(
  ManagerName.supportRequestSubjects,
) as SupportRequestSubjectsManager;

export const useSupportRequestSubjects = (): UseSupportRequestSubjectsResult => {
  useEffect(() => {
    mgrSupportRequestSubjects.init();
  }, []);

  return useObserver(() => {
    return {
      ...(mgrSupportRequestSubjects.store as UseSupportRequestSubjectsResult),
    };
  });
};

type UseLendingTypesResult = DataHookResult & {
  data: LendingTypesManagerResults;
};

const mgrLendingTypes = dataMan.manager(
  ManagerName.lendingTypes,
) as LendingTypesManager

export const useLendingTypes = (): UseLendingTypesResult => {
  useEffect(() => {
    mgrLendingTypes.init();
  }, []);

  return useObserver(() => {
    return {
      ...(mgrLendingTypes.store as UseLendingTypesResult),
    };
  });
};

type UseTargetBeneficiariesResult = DataHookResult & {
  data: TargetBenefeficiariesResults;
};

const mgrTargetBeneficiaries = dataMan.manager(
  ManagerName.targetBeneficiaries,
) as TargetBenefeficiariesManager

export const useTargetBeneficiaries = (): UseTargetBeneficiariesResult => {
  useEffect(() => {
    mgrTargetBeneficiaries.init();
  }, []);

  return useObserver(() => {
    return {
      ...(mgrTargetBeneficiaries.store as UseTargetBeneficiariesResult),
    };
  });
};


type UseAreasServedResult = DataHookResult & {
  data: AreasServedResults
}

const mgrAreasServed = dataMan.manager(
  ManagerName.areasServed,
) as AreasServedManager

export const useAreasServed = (): UseAreasServedResult => {
  useEffect(() => {
    mgrAreasServed.init();
  }, []);

  return useObserver(() => {
    return {
      ...(mgrAreasServed.store as UseAreasServedResult),
    };
  });
};

type UseImpactAreasResult = DataHookResult & {
  data: ImpactAreasResults
}

const mgrImpactAreas = dataMan.manager(
  ManagerName.impactAreas,
) as ImpactAreasManager

export const useImpactAreas = (): UseImpactAreasResult => {
  useEffect(()=>{
    mgrImpactAreas.init()
  }, [])
  return useObserver(()=> {
    return {
      ...(mgrImpactAreas.store as UseImpactAreasResult)
    }
  })
}

type UseSubImpactAreasResult = DataHookResult & {
  data: SubImpactAreasResults
}

const mgrSubImpactAreas = dataMan.manager(
  ManagerName.subImpactAreas,
) as SubImpactAreasManager

export const useSubImpactAreas = (): UseSubImpactAreasResult => {
  useEffect(()=>{
    mgrSubImpactAreas.init()
  }, [])
  return useObserver(()=> {
    return {
      ...(mgrSubImpactAreas.store as UseSubImpactAreasResult)
    }
  })
}

type UseOrganizationTypesResults = DataHookResult & {
  data: OrganizationTypesResults
}

const mgrOrganizationTypes = dataMan.manager(
  ManagerName.organizationTypes,
) as OrganizationTypesManager

export const useOrganizationTypes = (): UseOrganizationTypesResults => {
  useEffect(()=>{
    mgrOrganizationTypes.init()
  }, [])
  return useObserver(()=> {
    return {
      ...(mgrOrganizationTypes.store as UseOrganizationTypesResults)
    }
  })
}