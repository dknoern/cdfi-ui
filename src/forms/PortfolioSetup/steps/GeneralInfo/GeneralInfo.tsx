import React, { FC, useContext, useMemo, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { portfolio as portfolioManager, useInvestments } from 'dataManagement';
import { stepContext } from 'forms/PortfolioSetup/context';
import { workDataStore } from 'store';
import { formStore } from '../../formStore';
import { StepData } from './types';
import { StepView } from './StepView';

const STEP_IDX = 0;

const GeneralInfoFn: FC = () => {
  const [form] = Form.useForm();
  const { state, dispatch: dispatchStep } = useContext(stepContext);
  const {
    data: allCompanies,
    isLoading: isLoadingCompanies,
  } = useInvestments();
  const history = useHistory();
  const { url } = useRouteMatch();

  const {
    viewModeConfig: { portfolioId },
  } = workDataStore;

  useEffect(() => {
    // check if it is a edit or create form
    // and get portfolio data if it is an edit form
    if (!portfolioId || formStore.dataLoaded) return;

    portfolioManager
      .getById(portfolioId)
      .then((data) => {
        formStore.initWithData({
          ...data,
          libraryId: data.library ?? 0,
          charts: data.graphs,
        });
      })
      .catch((e) => {
        showAPIError(uiText('portfolios', 'oneLoadError'))(e);
        history.push(url);
      });
  }, [portfolioId, history, url]);

  useEffect(() => {
    dispatchStep({ type: 'available', step: STEP_IDX });
  }, [dispatchStep]);

  const availableCompanies = useMemo(() => {
    if (!Array.isArray(allCompanies)) return [];

    return allCompanies;
  }, [allCompanies]);

  const companyOptions = useMemo(
    () =>
      availableCompanies.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [availableCompanies],
  );

  const onValuesChange = useCallback<
    NonNullable<FormProps<StepData>['onValuesChange']>
  >((changedValues: Partial<StepData>): void => {
    formStore.updateData(changedValues);
  }, []);

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goToStep', step: STEP_IDX + 1 });
  }, [dispatchStep]);

  // for correct initial values
  if (portfolioId && !formStore.dataLoaded) {
    return null;
  }

  return (
    <StepView
      stepIndex={state.step}
      formInstance={form}
      initialValues={{
        name: formStore.formData.name,
        tags: formStore.formData.tags,
        investments: formStore.formData.investments,
      }}
      onValuesChange={onValuesChange}
      handleNextClick={handleNextClick}
      companyOptions={companyOptions}
      isLoadingCompanies={isLoadingCompanies}
    />
  );
};

export const GeneralInfo = observer(GeneralInfoFn);
