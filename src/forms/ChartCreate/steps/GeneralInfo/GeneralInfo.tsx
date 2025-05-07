import React, { FC, useContext, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Store } from 'antd/lib/form/interface';
import { Company } from 'types/company';
import { uiText } from 'constants/uiText';
import { notifyUser, Log } from 'tools';
import { graphs } from 'dataManagement/graphs';
import { withPreviewArea } from 'forms/ChartCreate/components';
import { stepContext } from 'forms/ChartCreate/context';
import { store as formStore } from 'forms/ChartCreate/store';
import { StoreData } from 'forms/ChartCreate/types';
import { formatLoadedEquations } from 'forms/ChartCreate/tools';
import { workDataStore } from 'store';
import { StepView } from './StepView';

type GeneralInfoProps = {
  isEdit: boolean;
};

const GeneralInfoFn: FC<GeneralInfoProps> = ({ isEdit }) => {
  const { dispatch } = useContext(stepContext);
  const { portfolioId, companyId } = workDataStore.viewModeConfig;
  const { templateId, templateLoaded } = formStore;
  const {
    name,
    description,
    periodEnd,
    periodStart,
    frequency,
    pcIds,
  } = formStore.data;

  useEffect(() => {
    dispatch({ step: 0, type: 'available' });
    dispatch({ step: 1, type: 'available' });
  }, [dispatch]);

  // load template data
  useEffect(() => {
    if (!templateId) return;

    const isPortfolioView = !companyId;

    if (!templateLoaded) {
      formStore
        .initMetricsStore()
        .then(() =>
          graphs.loadTemplate(templateId, isPortfolioView ? portfolioId : null),
        )
        .then((data) => {
          let pcIdsList: Company['id'][] = [];

          if (companyId) {
            pcIdsList = [companyId];
          } else if (data.pcIds) {
            pcIdsList = data.pcIds;
          }

          formStore.initWithData({
            ...data,
            id: isEdit ? data.id : undefined,
            equations: formatLoadedEquations(data.equations, isEdit),
            pcIds: pcIdsList,
          });
          return data;
        })
        .catch((e) => {
          Log.error(e);
          notifyUser.error(uiText('graphs', 'templateLoadErr'));
        });
    }
  }, [companyId, isEdit, pcIds, portfolioId, templateId, templateLoaded]);

  // Populate pcIds when template was not used
  useEffect(() => {
    if (companyId) {
      formStore.parseData('pcIds', [companyId]);
    }
  }, [companyId, templateId]);

  const handleValuesChange = useCallback((changedValues: Store) => {
    Object.keys(changedValues).forEach((key) => {
      if (Array.isArray(changedValues[key])) {
        formStore.parseData(key as keyof StoreData, changedValues[key]);
        return;
      }

      if (typeof changedValues[key] === 'object') {
        formStore.parseDataPart(key as keyof StoreData, changedValues[key]);
        return;
      }

      formStore.parseData(key as keyof StoreData, changedValues[key]);
    });
  }, []);

  const handleNextClick = useCallback(() => {
    dispatch({ type: 'goNext' });
  }, [dispatch]);

  // for correct initial values
  if (templateId && !templateLoaded) {
    return <>Loading...</>;
  }

  return (
    <StepView
      isEdit={isEdit}
      initialValues={{
        name,
        description,
        periodStart,
        periodEnd,
        frequency,
        pcIds,
      }}
      onValuesChange={handleValuesChange}
      handleNextClick={handleNextClick}
    />
  );
};

export const GeneralInfo = withPreviewArea(observer(GeneralInfoFn));
