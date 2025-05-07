import { SupportRequestSubjectsFormData } from 'scenes/GlobalListContents/SupportRequestSubjectsEditForm';
import { apiProcessor } from 'tools/apiProcessor';
import { PlatformSetting, SupportRequestSubject } from 'types';
import { performRequest } from 'tools/APITools';
import { State, SubImpactArea, TaxType } from 'scenes/GlobalListContents/types';
import { LendingTypePayloadData } from 'scenes/GlobalListContents/LendingTypesModal';
import { TargetBeneficiaryPayloadData } from 'scenes/GlobalListContents/TargetBeneficiariesModal';
import { AreasServedPayloadData } from 'scenes/GlobalListContents/AreasServedModal';
import { ImpactAreasPayloadData } from 'scenes/GlobalListContents/ImpactAreasModal';
import { OrganizationTypePayloadData } from 'scenes/GlobalListContents/OrganizationTypesModal';
import { SubImpactAreasPayloadData } from 'scenes/GlobalListContents/SubImpactAreasModal';

export const getPlatformSettings = (): Promise<PlatformSetting[]> => {
  return apiProcessor.get('platformSettings');
};

export const getSupportRequestSubjects = (): Promise<
  SupportRequestSubject[]
> => {
  return apiProcessor.get(
    'platformSettingsParameter',
    'support-request-subjects',
  );
};

export const createSupportRequestSubject = (
  data: SupportRequestSubjectsFormData,
): Promise<void> => {
  return performRequest<void>('platformSettingsParameter', (operationName) =>
    apiProcessor.post(operationName, 'support-request-subjects', {
      ...data,
    }),
  );
};

export const updateSupportRequestSubject = (
  supportRequestSubjectId: number,
  data?: SupportRequestSubjectsFormData,
): Promise<void> => {
  return performRequest<void>('supportRequestSubject', (operationName) =>
    apiProcessor.put(operationName, supportRequestSubjectId, {
      ...data,
    }),
  );
};

export const deleteSupportRequestSubject = (
  supportRequestSubjectId: number,
): Promise<void> => {
  return apiProcessor.delete('supportRequestSubject', supportRequestSubjectId);
};

export const getLendingTypes = (): Promise<TaxType[]> => {
  return apiProcessor.get('lendingTypes');
};

export const createLendingType = (data: LendingTypePayloadData): Promise<void> => {
  return performRequest<void>('lendingTypes', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateLendingType = (
  lendingTypeId: number | undefined,
  data: LendingTypePayloadData,
): Promise<void> => {
  return performRequest<void>('updateLendingType', (operationName) =>
    apiProcessor.put(operationName, lendingTypeId, {
      ...data,
    }),
  );
};

export const getTargetBeneficiaries = (): Promise<TaxType[]> => {
  return apiProcessor.get('targetBeneficiaries');
};

export const createTargetBeneficiary = (data: TargetBeneficiaryPayloadData): Promise<void> => {
  return performRequest<void>('targetBeneficiaries', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateTargetBeneficiary = (
  targetBeneficiaryId: number | undefined,
  data: TargetBeneficiaryPayloadData,
): Promise<void> => {
  return performRequest<void>('updateTargetBeneficiaries', (operationName) =>
    apiProcessor.put(operationName, targetBeneficiaryId, {
      ...data,
    }),
  );
};

export const getAreasServed = ():Promise<State[]> => {
  return apiProcessor.get('areasServed')
}

export const createAreaServed = (data: AreasServedPayloadData): Promise<void> => {
  return performRequest<void>('areasServed', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateAreasServed = (
  areasServedId: number | undefined,
  data: AreasServedPayloadData,
): Promise<void> => {
  return performRequest<void>('updateAreasServed', (operationName) =>
    apiProcessor.put(operationName, areasServedId, {
      ...data,
    }),
  );
};

export const getImpactAreas = ():Promise<TaxType[]> => {
  return apiProcessor.get('impactAreas')
}

export const createImpactArea = (data: ImpactAreasPayloadData): Promise<void> => {
  return performRequest<void>('impactAreas', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateImpactArea = (
  impactAreaId: number | undefined,
  data: ImpactAreasPayloadData,
): Promise<void> => {
  return performRequest<void>('updateImpactAreas', (operationName) =>
    apiProcessor.put(operationName, impactAreaId, {
      ...data,
    }),
  );
};

export const getSubImpactAreas = ():Promise<SubImpactArea[]> => {
  return apiProcessor.get('subImpactAreas')
}

export const createSubImpactArea = (data: SubImpactAreasPayloadData): Promise<void> => {
  return performRequest<void>('subImpactAreas', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateSubImpactArea = (
  subImpactAreaId: number | undefined,
  data: SubImpactAreasPayloadData,
): Promise<void> => {
  return performRequest<void>('updateSubImpactAreas', (operationName) =>
    apiProcessor.put(operationName, subImpactAreaId, {
      ...data,
    }),
  );
};

export const getOrganizationTypes = () => {
  return apiProcessor.get('organizationTypes')
}

export const createOrganizationTypes = (data: OrganizationTypePayloadData): Promise<void> => {
  return performRequest<void>('organizationTypes', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateOrganizationTypes = (
  organizationTypesId: number | undefined,
  data: OrganizationTypePayloadData,
): Promise<void> => {
  return performRequest<void>('updateOrganizationTypes', (operationName) =>
    apiProcessor.put(operationName, organizationTypesId, {
      ...data,
    }),
  );
};