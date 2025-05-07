import React, { FC, useCallback, useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'antd';
import { typography } from 'constants/typography';
import { FORM_ITEM_VERTICAL_LABEL_SPAN } from 'constants/ui';
import { generateFormId } from 'tools/formTools';
import { formName } from 'forms/ChartCreate/constants';
import { activateDispatchData } from 'forms/ChartCreate/tools';
import { store as formStore } from 'forms/ChartCreate/store';
import { stepContext } from '../../context';
import { withPreviewArea, StepTitle } from '../../components';
import { store as stepStore } from '../../equationsStore';
import { EquationForm } from './components';

const { createFormulaDescription } = typography('formulas');

const MakeEquationsFn: FC = () => {
  const { state, dispatch } = useContext(stepContext);
  const [form] = Form.useForm();

  const isEdit = !!formStore.data.id;
  useEffect(() => {
    dispatch(activateDispatchData(3, isEdit));
  }, [dispatch, isEdit]);

  const handleNextClick = useCallback(() => {
    dispatch({ type: 'goNext' });
  }, [dispatch]);

  // we need form here
  // to use submit button under step content
  return (
    <>
      <Form
        form={form}
        id={generateFormId(formName, state.step)}
        size="large"
        labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
        onFinish={handleNextClick}
        hideRequiredMark
      >
        <StepTitle
          title="Create Formula"
          description={createFormulaDescription}
        />
      </Form>

      <EquationForm
        onFinish={stepStore.updateItem}
        onCancel={stepStore.resetFields}
        currentItem={stepStore.activeItem}
      />
    </>
  );
};

export const MakeEquations = withPreviewArea(observer(MakeEquationsFn));
