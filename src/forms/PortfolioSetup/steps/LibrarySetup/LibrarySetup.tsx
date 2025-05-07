import React, { FC, useCallback, useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Select, Form } from 'antd';
import {
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { FormSecondaryLabel } from 'components';
import { useGlobalLibraries } from 'dataManagement';
import { formStore } from 'forms/PortfolioSetup/formStore';
import { stepContext } from 'forms/PortfolioSetup/context';
import { formName } from 'forms/PortfolioSetup/constants';
import { generateFormId } from 'tools/formTools';
import { StepTitle, StepIntro } from '../../components';
import { LibraryContent } from './LibraryContent';
import styles from './LibrarySetup.module.scss';

const STEP_IDX = 4;

const LibrarySetupFn: FC = () => {
  const { state, dispatch: dispatchStep } = useContext(stepContext);
  const {
    data: libraries,
    isLoading: isLoadingLibraries,
  } = useGlobalLibraries();

  const handleSelectLibrary = useCallback((libraryId) => {
    formStore.updateData({ libraryId });
  }, []);

  useEffect(() => {
    dispatchStep({ type: 'available', step: STEP_IDX });
  }, [dispatchStep]);

  // select first library
  useEffect(() => {
    if (libraries && libraries.length && !formStore.formData.libraryId) {
      handleSelectLibrary(libraries[0].id);
    }
  }, [libraries, handleSelectLibrary]);

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goToStep', step: state.step + 1 });
  }, [dispatchStep, state.step]);

  return (
    <Form id={generateFormId(formName, state.step)} onFinish={handleNextClick}>
      <StepTitle>Set up folders in the Document Library</StepTitle>
      <StepIntro>
        Select Existing Library Structures from the dropdown or create a new set
        of folders here.
      </StepIntro>
      <Row justify="space-between" align="top" gutter={[GRID_GUTTER, 0]}>
        <Col
          xs={GRID_COL_HALF_ROW_SPAN}
          lg={GRID_COL_THIRD_ROW_SPAN}
          xxl={GRID_COL_QUARTER_ROW_SPAN}
        >
          <Form.Item
            label={<FormSecondaryLabel text="Existing library structures" />}
            labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
          >
            <Select
              placeholder="Select an existing structure"
              onChange={handleSelectLibrary}
              value={formStore.formData.libraryId || undefined}
              loading={isLoadingLibraries}
              options={(libraries || []).map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              className={styles.select}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>
      </Row>
      <LibraryContent libraryId={formStore.formData.libraryId ?? 0} />
    </Form>
  );
};

export const LibrarySetup = observer(LibrarySetupFn);
