import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import {
  AreasServedManager,
  ImpactAreasManager,
  LendingTypesManager,
  OrganizationTypesManager,
  SubImpactAreasManager,
  SupportRequestSubjectsManager,
  TargetBenefeficiariesManager,
} from 'dataManagement/managers/PlatformSettingsManager';
import { SupportRequestSubjectsFormData } from './SupportRequestSubjectsEditForm';
import { LendingTypePayloadData } from './LendingTypesModal';
import { TargetBeneficiaryPayloadData } from './TargetBeneficiariesModal';
import { AreasServedPayloadData } from './AreasServedModal';
import { ImpactAreasPayloadData } from './ImpactAreasModal';
import { SubImpactAreasPayloadData } from './SubImpactAreasModal';
import { OrganizationTypePayloadData } from './OrganizationTypesModal';

const mgr = dataMan.manager(
  ManagerName.supportRequestSubjects,
) as SupportRequestSubjectsManager;

interface SaveFn {
  (data: SupportRequestSubjectsFormData): Promise<void>;
}

export const createSupportRequestSubject: SaveFn = (data) => {
  const proceedSave = (): ReturnType<typeof mgr.createSupportRequestSubject> =>
    mgr.createSupportRequestSubject(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('supportRequestSubject', 'createOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('supportRequestSubject', 'createError');
      showAPIError(message)(error);
    });
};

interface DeleteFn {
  (supportRequestSubjectId: number): Promise<void>;
}

export const deleteSupportRequestSubject: DeleteFn = (
  supportRequestSubjectId,
) => {
  const proceedDelete = (): ReturnType<
    typeof mgr.deleteSupportRequestSubject
  > => mgr.deleteSupportRequestSubject(supportRequestSubjectId);

  return proceedDelete()
    .then(() => {
      notifyUser.ok(uiText('supportRequestSubject', 'deleteOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('supportRequestSubject', 'deleteError');
      showAPIError(message)(error);
    });
};

interface UpdateFn {
  (
    supportRequestSubjectId: number,
    data?: SupportRequestSubjectsFormData | undefined,
  ): Promise<void>;
}

export const updateSupportRequestSubject: UpdateFn = (
  supportRequestSubjectId,
  data,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgr.updateSupportRequestSubject
  > => mgr.updateSupportRequestSubject(supportRequestSubjectId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('supportRequestSubject', 'updateOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('supportRequestSubject', 'updateError');
      showAPIError(message)(error);
    });
};

const mgrLendingType = dataMan.manager(
  ManagerName.lendingTypes,
) as LendingTypesManager;

export const createLendingType = (data: LendingTypePayloadData) => {
  const proceedSave = (): ReturnType<typeof mgrLendingType.createLendingType> =>
    mgrLendingType.createLendingType(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('lendingType', 'createOk'));
      mgrLendingType.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('lendingType', 'createError');
      showAPIError(message)(error);
    });
};

export const updateLendingType = (
  lendingTypeId: number | undefined,
  data: LendingTypePayloadData,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrLendingType.updateLendingType
  > => mgrLendingType.updateLendingType(lendingTypeId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('lendingType', 'updateOk'));
      mgrLendingType.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('lendingType', 'updateError');
      showAPIError(message)(error);
    });
};

const mgrTargetBeneficiaries = dataMan.manager(
  ManagerName.targetBeneficiaries,
) as TargetBenefeficiariesManager;

export const createTargetBeneficiary = (data: TargetBeneficiaryPayloadData) => {
  const proceedSave = (): ReturnType<
    typeof mgrTargetBeneficiaries.createTargetBeneficiary
  > => mgrTargetBeneficiaries.createTargetBeneficiary(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('targetBeneficiaries', 'createOk'));
      mgrTargetBeneficiaries.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('targetBeneficiaries', 'createError');
      showAPIError(message)(error);
    });
};

export const updateTargetBeneficiary = (
  targetBeneficiaryId: number | undefined,
  data: TargetBeneficiaryPayloadData,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrTargetBeneficiaries.updateTargetBeneficiary
  > => mgrTargetBeneficiaries.updateTargetBeneficiary(targetBeneficiaryId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('targetBeneficiaries', 'updateOk'));
      mgrTargetBeneficiaries.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('targetBeneficiaries', 'updateError');
      showAPIError(message)(error);
    });
};

const mgrAreasServed = dataMan.manager(
  ManagerName.areasServed,
) as AreasServedManager;

export const createAreaServed = (data: AreasServedPayloadData) => {
  const proceedSave = (): ReturnType<typeof mgrAreasServed.createAreaServed> =>
    mgrAreasServed.createAreaServed(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('areasServed', 'createOk'));
      mgrAreasServed.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('areasServed', 'createError');
      showAPIError(message)(error);
    });
};

export const updateAreasServed = (
  areasServedId: number | undefined,
  data: AreasServedPayloadData,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrAreasServed.updateAreasServed
  > => mgrAreasServed.updateAreasServed(areasServedId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('areasServed', 'updateOk'));
      mgrAreasServed.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('areasServed', 'updateError');
      showAPIError(message)(error);
    });
};

const mgrImpactAreas = dataMan.manager(
  ManagerName.impactAreas,
) as ImpactAreasManager;

export const createImpactArea = (data: ImpactAreasPayloadData) => {
  const proceedSave = (): ReturnType<typeof mgrImpactAreas.createImpactArea> =>
    mgrImpactAreas.createImpactArea(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('impactArea', 'createOk'));
      mgrImpactAreas.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('impactArea', 'createError');
      showAPIError(message)(error);
    });
};

export const updateImpactArea = (
  impactAreaId: number | undefined,
  data: ImpactAreasPayloadData,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrImpactAreas.updateImpactArea
  > => mgrImpactAreas.updateImpactArea(impactAreaId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('impactArea', 'updateOk'));
      mgrImpactAreas.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('impactArea', 'updateError');
      showAPIError(message)(error);
    });
};

const mgrSubImpactAreas = dataMan.manager(
  ManagerName.subImpactAreas,
) as SubImpactAreasManager;

export const createSubImpactArea = (data: SubImpactAreasPayloadData) => {
  const proceedSave = (): ReturnType<typeof mgrSubImpactAreas.createSubImpactArea> =>
    mgrSubImpactAreas.createSubImpactArea(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('subImpactArea', 'createOk'));
      mgrSubImpactAreas.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subImpactArea', 'createError');
      showAPIError(message)(error);
    });
};

export const updateSubImpactArea = (
  subImpactAreaId: number | undefined,
  data: SubImpactAreasPayloadData,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrSubImpactAreas.updateSubImpactArea
  > => mgrSubImpactAreas.updateSubImpactArea(subImpactAreaId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('subImpactArea', 'updateOk'));
      mgrSubImpactAreas.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subImpactArea', 'updateError');
      showAPIError(message)(error);
    });
};

const mgrOrganizationTypes = dataMan.manager(
  ManagerName.organizationTypes,
) as OrganizationTypesManager

export const createOrganizationType = (data: OrganizationTypePayloadData) => {
  const proceedSave = (): ReturnType<typeof mgrOrganizationTypes.createOrganizationTypes> =>
    mgrOrganizationTypes.createOrganizationTypes(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('organizationType', 'createOk'));
      mgrOrganizationTypes.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('organizationType', 'createError');
      showAPIError(message)(error);
    });
};

export const updateOrganizationType = (
  subImpactAreaId: number | undefined,
  data: OrganizationTypePayloadData,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrOrganizationTypes.updateOrganizationTypes
  > => mgrOrganizationTypes.updateOrganizationTypes(subImpactAreaId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('organizationType', 'updateOk'));
      mgrOrganizationTypes.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('organizationType', 'updateError');
      showAPIError(message)(error);
    });
};