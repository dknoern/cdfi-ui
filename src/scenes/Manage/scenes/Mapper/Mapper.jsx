import React, {
  useReducer,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from 'react';
import { Prompt } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { GRID_GUTTER } from 'constants/ui';
import { uiText } from 'constants/uiText';
import { typography } from 'constants/typography';
import { PageSectionWrapper } from 'components';
import { workDataStore } from 'store';
import { useCompanies, mapsManager } from 'scenes/Manage/tools';
import { Header, Constructor, InstructionsModal } from './components';
import { useReportings, useResize, isEquivalent } from './tools';
import { mapStore } from './store';
import styles from './Mapper.module.scss';

const { leavingPagePromptMessage } = typography('mapper');

const CONFIG_DEFAULT = {
  companyId: null,
  year: null,
  quarter: null,
};
const configReducer = (state, action) => ({
  ...(action.companyId ? CONFIG_DEFAULT : state),
  ...action,
});

const MapperFn = () => {
  const { metric2cells, savedMappings } = mapStore;

  const currentMappings = Object.entries(metric2cells);

  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showLeavingPagePrompt, setShowLeavingPagePrompt] = useState(false);

  const [reportingConfig, changeConfig] = useReducer(
    configReducer,
    CONFIG_DEFAULT,
  );
  const [isLoadingCompanies, companies, hasErrorCompanies] = useCompanies();
  const [isLoadingReportings, reportings, hasErrorReportings] = useReportings(
    reportingConfig.companyId,
  );
  const companyIdRef = useRef(null);
  const reportingsRef = useRef(null);
  const rootHeight = useResize();

  // reset store on leave
  useEffect(mapStore.reset, []);

  useEffect(() => {
    if (reportingsRef.current !== reportings && Array.isArray(reportings)) {
      reportingsRef.current = reportings;
      const { companyId } = reportingConfig;
      companyIdRef.current = companyId;
    }
  }, [reportingConfig, reportings]);

  // set first company
  useEffect(() => {
    if (!companies || !companies[0]) return;

    const { companyId } = reportingConfig;

    if (!companyId) {
      changeConfig({
        companyId: workDataStore.viewModeConfig.companyId || companies[0].id,
      });
      companyIdRef.current = companies[0].id;
    }
  }, [companies, reportingConfig]);

  // set first reporting
  useEffect(() => {
    const { companyId, quarter: currentQuarter } = reportingConfig;

    if (!reportings || !reportings[0] || companyId !== companyIdRef.current)
      return;

    if (!currentQuarter) {
      const { year, quarter } = reportings[0];
      changeConfig({ year, quarter });
    }
  }, [reportings, reportingConfig]);

  // reset store on company change
  useEffect(() => {
    const { companyId } = reportingConfig;
    if (companyId !== companyIdRef.current) {
      mapStore.reset();
    }
  }, [reportingConfig]);

  useEffect(() => {
    if (!isEquivalent(currentMappings, savedMappings)) {
      setShowLeavingPagePrompt(true);
    }

    return () => setShowLeavingPagePrompt(false);
  }, [currentMappings, savedMappings]);

  const mappingsSaveHandler = useCallback(() => {
    if (mapStore.allLabelsHasValues) {
      mapsManager
        .saveMappings(mapStore.prepareDataForSave())
        .then(mapStore.clearErrorInfo)
        .catch(mapStore.setErrorInfo);
      setShowLeavingPagePrompt(false);
    } else {
      toast(uiText('mapper', 'hasLabelWithoutValue'), { type: 'error' });
    }
  }, []);

  const configIsReady = useMemo(
    () => Object.values(reportingConfig).every((value) => !!value),
    [reportingConfig],
  );

  const hasReportings = useMemo(() => {
    const { companyId } = reportingConfig;
    return !!(
      companyId === companyIdRef.current &&
      reportings &&
      reportings.length
    );
  }, [reportingConfig, reportings]);

  if (hasErrorCompanies || hasErrorReportings) {
    return (
      <div className={styles.root}>{uiText('general', 'dataLoadingError')}</div>
    );
  }

  if (companies && !companies.length) {
    return (
      <div className={styles.root}>{uiText('mapper', 'errorNoCompanies')}</div>
    );
  }

  if (isLoadingCompanies || isLoadingReportings) {
    return (
      <div className={styles.root}>{uiText('general', 'dataLoading')}</div>
    );
  }

  return (
    <PageSectionWrapper
      title="Mapper"
      actionButtons={[
        <Button
          onClick={mappingsSaveHandler}
          type="primary"
          className={styles.saveBtn}
        >
          Save Changes
        </Button>,
      ]}
      withHelpIcon
      onHelpIconClick={() => setShowInstructionsModal(true)}
      className={styles.pageSection}
      titleClassName={styles.title}
      titleRowGutter={[GRID_GUTTER, 0]}
    >
      <div style={{ height: rootHeight }}>
        <Header
          reportingConfig={reportingConfig}
          reportings={reportings || []}
          onConfigChange={changeConfig}
          mappingsSaveHandler={mappingsSaveHandler}
        />
        {configIsReady && hasReportings && (
          <Constructor reportingConfig={reportingConfig} />
        )}
        {hasReportings && !configIsReady && (
          <div>{uiText('mapper', 'needConfig')}</div>
        )}
        {!hasReportings && <div>{uiText('mapper', 'errorNoReportings')}</div>}
        <InstructionsModal
          visible={showInstructionsModal}
          onCancel={() => setShowInstructionsModal(false)}
        />
        <Prompt
          when={showLeavingPagePrompt}
          message={leavingPagePromptMessage}
        />
      </div>
    </PageSectionWrapper>
  );
};

export const Mapper = React.memo(observer(MapperFn));
