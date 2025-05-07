import React, { FC, useState, useCallback, useEffect } from 'react';
import { Store } from 'antd/lib/form/interface';
import { Company, FundManagerUpdate } from 'types';
import { uiText } from 'constants/uiText';
import { ModalWithForm } from 'modals';
import { FMCompanyEdit as FMCompanyEditForm } from 'forms/AdminForms';
import { showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { FMCompanyManager } from 'dataManagement/managers/FMCompanyManager';
import { FMCreateDefaultValues } from '../constants';
import { saveFM } from '../tools';

const mgr = dataMan.manager(ManagerName.fmCompanies) as FMCompanyManager;

const FORM_ID = 'FMAddForm';

type FMCompanyEditProps = {
  companyId?: Company['id'] | null;
  afterEdit: () => void;
};

export const FMCompanyEdit: FC<FMCompanyEditProps> = ({
  companyId,
  afterEdit,
}) => {
  const [data, setData] = useState<null | FundManagerUpdate>(null);

  const saveHandler = useCallback(
    (values: Store) => {
      saveFM(companyId, values).then(() => {
        setData(null);
        afterEdit();
      });
    },
    [afterEdit, companyId],
  );

  useEffect(() => {
    if (companyId === undefined) {
      setData(null);
      return;
    }

    // create flow
    if (!companyId) {
      setData({ ...FMCreateDefaultValues });
      return;
    }

    // edit flow
    mgr
      .getCompany(companyId)
      .then((FMCdata) => {
        setData(FMCdata as FundManagerUpdate);
      })
      .catch(showAPIError(uiText('clients', 'oneLoadError')));
  }, [companyId]);

  return (
    <ModalWithForm
      visible={companyId !== undefined}
      title={`${companyId ? 'Edit' : 'Add'} Aeris Client`}
      formId={FORM_ID}
      onCancel={afterEdit}
      actionButtonText={companyId ? 'Update' : 'Create'}
    >
      {data !== null && (
        <FMCompanyEditForm
          onFinish={saveHandler}
          initialValues={data as FundManagerUpdate}
          formId={FORM_ID}
        />
      )}
    </ModalWithForm>
  );
};
