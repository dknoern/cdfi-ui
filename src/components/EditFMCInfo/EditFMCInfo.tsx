import React, { FC, useEffect, useCallback, useState } from 'react';
import { Store } from 'antd/lib/form/interface';
import { useHistory, useLocation } from 'react-router-dom';
import { CompanyInfoBase } from 'types/company';
import { EDIT_MY_COMPANY_URL_HASH } from 'constants/misc';
import { uiText } from 'constants/uiText';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { FMCompanyManager } from 'dataManagement/managers/FMCompanyManager';
import { notifyUser, showAPIError } from 'tools';
import { ModalWithForm } from 'modals';
import { EditFMCInfo as Form } from 'forms';
import { uiStore } from 'store';

const companiesMgr = dataMan.manager(
  ManagerName.fmCompanies,
) as FMCompanyManager;

const FORM_ID = 'editMyCompany';
const OPERATION_LOAD = 'LOAD_COMPANY_INFO';
const OPERATION_SAVE = 'SAVE_COMPANY_INFO';

export const EditFMCInfo: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [initialValues, setInitialValues] = useState<CompanyInfoBase | null>(
    null,
  );

  const active = location.hash === `#${EDIT_MY_COMPANY_URL_HASH}`;

  const onCancel = useCallback(() => {
    history.push(location.pathname);
  }, [history, location.pathname]);

  useEffect(() => {
    if (active) {
      // load my company
      uiStore.addLoading(OPERATION_LOAD);
      companiesMgr
        .getMyCompanyInfo()
        .then((result) => {
          setInitialValues(result);
        })
        .catch(showAPIError(uiText('reportingEntities', 'infoLoadError')))
        .finally(() => {
          uiStore.endLoading(OPERATION_LOAD);
        });
      return;
    }

    setInitialValues(null);
  }, [active]);

  const onSave = useCallback(
    (values: Store) => {
      uiStore.addLoading(OPERATION_SAVE);
      companiesMgr
        .updateMyCompanyInfo(values as CompanyInfoBase)
        .then(() => {
          notifyUser.ok(uiText('reportingEntities', 'updateOk'));
          onCancel();
        })
        .catch(showAPIError(uiText('reportingEntities', 'updateError')))
        .finally(() => {
          uiStore.endLoading(OPERATION_SAVE);
        });
    },
    [onCancel],
  );

  return (
    <ModalWithForm
      visible={active && !!initialValues}
      title="Edit my company info"
      formId={FORM_ID}
      onCancel={onCancel}
      actionButtonText="Save"
      forceRender={false}
    >
      <Form
        initialValues={initialValues as CompanyInfoBase}
        formId={FORM_ID}
        onFinish={onSave}
      />
    </ModalWithForm>
  );
};
