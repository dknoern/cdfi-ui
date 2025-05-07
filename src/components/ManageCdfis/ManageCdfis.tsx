import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CdfiEdit } from './CdfiEdit';
import { cdfiStore } from 'store';
import { useCdfiOrgDetails } from '../../dataManagement';
import { EditableCdfi } from 'forms/AdminForms/CdfiEdit/types';

export const ManageCdfis: FC = () => {
  const location = useLocation();
  const isUpdateForm = location.pathname.includes('update-cdfi');
  const { cdfiId } = cdfiStore;
  const { data: cdfiOrgDetails } = useCdfiOrgDetails(cdfiId);
  const [cdfiEditData, setCdfiEditData] = useState<EditableCdfi>();

  useEffect(() => {
    if (isUpdateForm) {
      setCdfiEditData(cdfiOrgDetails?.cdfi);
    }
  }, [cdfiOrgDetails]);

  if (isUpdateForm && !cdfiEditData) {
    return <></>;
  }

  return <CdfiEdit isEditForm={isUpdateForm} cdfiEditData={cdfiEditData}></CdfiEdit>;
};
