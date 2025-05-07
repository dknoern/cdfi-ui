import { ManagerDefault } from './ManagerDefault';
import {
  getPlatformSettings,
  getSupportRequestSubjects,
  createSupportRequestSubject,
  deleteSupportRequestSubject,
  updateSupportRequestSubject,
  getLendingTypes,
  createLendingType,
  updateLendingType,
  getTargetBeneficiaries,
  createTargetBeneficiary,
  updateTargetBeneficiary,
  getAreasServed,
  createAreaServed,
  updateAreasServed,
  getImpactAreas,
  createImpactArea,
  updateImpactArea,
  getSubImpactAreas,
  createSubImpactArea,
  updateSubImpactArea,
  getOrganizationTypes,
  createOrganizationTypes,
  updateOrganizationTypes,
} from '../operations/platformSettingsOperations';
import { uiText } from 'constants/uiText';
import { PlatformSetting, SupportRequestSubject } from 'types';
import { notifyUser } from 'tools/notifyUser';
import { State, SubImpactArea, TaxType } from 'scenes/GlobalListContents/types';

export interface PlatformSettingsManagerResults {
  platformSettings: PlatformSetting[];
}

export class PlatformSettingsManager extends ManagerDefault<PlatformSettingsManagerResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getPlatformSettings()]).then(
          (values): PlatformSettingsManagerResults => ({
            platformSettings: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };
}

export interface SupportRequestSubjectsManagerResults {
  subjects: SupportRequestSubject[];
}

export class SupportRequestSubjectsManager extends ManagerDefault<SupportRequestSubjectsManagerResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getSupportRequestSubjects()]).then(
          (values): SupportRequestSubjectsManagerResults => ({
            subjects: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };

  createSupportRequestSubject: typeof createSupportRequestSubject = (data) => {
    return createSupportRequestSubject(data);
  };

  updateSupportRequestSubject: typeof updateSupportRequestSubject = (
    supportRequestSubjectId,
    data,
  ) => {
    return updateSupportRequestSubject(supportRequestSubjectId, data);
  };

  deleteSupportRequestSubject: typeof deleteSupportRequestSubject = (
    supportRequestSubjectId,
  ) => {
    return deleteSupportRequestSubject(supportRequestSubjectId);
  };
}

export interface LendingTypesManagerResults {
  lendingTypes: TaxType[];
}

export class LendingTypesManager extends ManagerDefault<LendingTypesManagerResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getLendingTypes()]).then(
          (values): LendingTypesManagerResults => ({
            lendingTypes: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };

  createLendingType: typeof createLendingType = (data) => {
    return createLendingType(data);
  };

  updateLendingType: typeof updateLendingType = (lendingTypeId, data) => {
    return updateLendingType(lendingTypeId, data);
  };
}

export interface TargetBenefeficiariesResults {
  taxBeneficiaries: TaxType[];
}

export class TargetBenefeficiariesManager extends ManagerDefault<TargetBenefeficiariesResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getTargetBeneficiaries()]).then(
          (values): TargetBenefeficiariesResults => ({
            taxBeneficiaries: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };

  createTargetBeneficiary: typeof createTargetBeneficiary = (data) => {
    return createTargetBeneficiary(data);
  };

  updateTargetBeneficiary: typeof updateTargetBeneficiary = (
    targetBeneficiaryId,
    data,
  ) => {
    return updateTargetBeneficiary(targetBeneficiaryId, data);
  };
}

export interface AreasServedResults {
  states: State[];
}

export class AreasServedManager extends ManagerDefault<AreasServedResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getAreasServed()]).then(
          (values): AreasServedResults => ({
            states: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };

  createAreaServed: typeof createAreaServed = (data) => {
    return createAreaServed(data);
  };

  updateAreasServed: typeof updateAreasServed = (areasServedId, data) => {
    return updateAreasServed(areasServedId, data);
  };
}

export interface ImpactAreasResults {
  impactAreas: TaxType[];
}

export class ImpactAreasManager extends ManagerDefault<ImpactAreasResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getImpactAreas()]).then(
          (values): ImpactAreasResults => ({
            impactAreas: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };

  createImpactArea: typeof createImpactArea = (data) => {
    return createImpactArea(data);
  };

  updateImpactArea: typeof updateImpactArea = (impactAreaId, data) => {
    return updateImpactArea(impactAreaId, data);
  };
}

export interface SubImpactAreasResults {
  subImpactAreas: SubImpactArea[];
}

export class SubImpactAreasManager extends ManagerDefault<SubImpactAreasResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getSubImpactAreas()]).then(
          (values): SubImpactAreasResults => ({
            subImpactAreas: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };

  createSubImpactArea: typeof createSubImpactArea = (data) => {
    return createSubImpactArea(data);
  };

  updateSubImpactArea: typeof updateSubImpactArea = (subImpactAreaId, data) => {
    return updateSubImpactArea(subImpactAreaId, data);
  };
}

export interface OrganizationTypesResults {
  organizationTypes: TaxType[];
}

export class OrganizationTypesManager extends ManagerDefault<OrganizationTypesResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getOrganizationTypes()]).then(
          (values): OrganizationTypesResults => ({
            organizationTypes: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('platformSettings', 'loadError'));
      },
    );
  };

  createOrganizationTypes: typeof createOrganizationTypes = (data) => {
    return createOrganizationTypes(data);
  };

  updateOrganizationTypes: typeof updateOrganizationTypes = (organizationTypesId, data) => {
    return updateOrganizationTypes(organizationTypesId, data);
  };
}