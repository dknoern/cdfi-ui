import React, { FC, useCallback, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'antd';
import { FORM_ITEM_VERTICAL_LABEL_SPAN } from 'constants/ui';
import { formName } from 'forms/ChartCreate/constants';
import { activateDispatchData } from 'forms/ChartCreate/tools';
import { store as formStore } from 'forms/ChartCreate/store';
import { generateFormId } from 'tools/formTools';
import { stepContext } from '../../context';
import { withPreviewArea, StepTitle } from '../../components';
import { FormulaOrder } from './components';
import styles from './FormatTable.module.scss';

const FormatTableFn: FC = () => {
  const { state, dispatch } = useContext(stepContext);

  const isEdit = !!formStore.data.id;
  useEffect(() => {
    dispatch(activateDispatchData(4, isEdit));
  }, [dispatch, isEdit]);

  const handleNextClick = useCallback(() => {
    dispatch({ type: 'goNext' });
  }, [dispatch]);

  return (
    <Form
      id={generateFormId(formName, state.step)}
      size="large"
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      onFinish={handleNextClick}
    >
      <StepTitle title="Format Data Table View" />
      <div className={styles.formGroup}>
        <FormulaOrder
          items={formStore.sortingItems}
          onSwap={formStore.swapDataItems}
        />
      </div>
    </Form>
  );
};
export const FormatTable = withPreviewArea(observer(FormatTableFn));
