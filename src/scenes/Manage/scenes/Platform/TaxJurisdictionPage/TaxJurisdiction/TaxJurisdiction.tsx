import React, { FC, useCallback, useState } from 'react';
import { VoidFn } from 'types';
import { taxJurisdictionStore } from 'store';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { TaxJurisdictions } from 'types/taxJurisdiction';
import { TaxJurisdictionForm } from './TaxJurisdictionForm';
import { PageSectionWrapper } from '../../../../../../components';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

type TaxJurisdictionProps = { onFinish: VoidFn };

export const TaxJurisdiction: FC<TaxJurisdictionProps> = observer(
  ({ onFinish }) => {
    const {
      setIsEditTaxJurisdiction,
      isEditTaxJurisdiction,
      getUpdateTaxJurisdiction,
      getCreateTaxJurisdiction,
      taxJurisdiction,
    } = taxJurisdictionStore;
    const formId = 'EDIT_TAX_JURISDICTION';
    const history = useHistory();
    const [
      isEditTaxJurisdictionModalVisible,
      setEditTaxJurisdictionModalVisibility,
    ] = useState<any>(false);
    const saveHandler = useCallback(
      (values: TaxJurisdictions) => {
        if (isEditTaxJurisdiction && taxJurisdiction?.id !== null) {
          getUpdateTaxJurisdiction(values).then(onFinish);
          setIsEditTaxJurisdiction(false);
        } else {
          getCreateTaxJurisdiction(values).then(onFinish);
          setIsEditTaxJurisdiction(false);
        }
        history.goBack();
      },
      [
        getCreateTaxJurisdiction,
        getUpdateTaxJurisdiction,
        history,
        isEditTaxJurisdiction,
        onFinish,
        setIsEditTaxJurisdiction,
        taxJurisdiction,
      ],
    );

    const goBack = () => {
      if (isEditTaxJurisdiction) {
        setEditTaxJurisdictionModalVisibility(true);
      } else {
        setIsEditTaxJurisdiction(false);
        history.goBack();
      }
    };

    const closeConfirmEditTaxJurisdiction = async () => {
      setEditTaxJurisdictionModalVisibility(false);
      setIsEditTaxJurisdiction(false);
      history.goBack();
    };

    return (
      <PageSectionWrapper
        title={
          isEditTaxJurisdiction
            ? 'Manage Tax Jurisdiction'
            : 'Create New Tax Jurisdiction'
        }
      >
        <TaxJurisdictionForm
          onFinish={saveHandler}
          formId={formId}
          onCancel={goBack}
        />
        <ConfirmModal
          visible={isEditTaxJurisdictionModalVisible}
          onClose={(): void => setEditTaxJurisdictionModalVisibility(false)}
          onClick={closeConfirmEditTaxJurisdiction}
          text="Do you really want to cancel? All data entered will be lost."
          buttonText="Yes"
        />
      </PageSectionWrapper>
    );
  },
);
