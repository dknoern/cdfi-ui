import { FormProps } from 'antd/lib/form';

export type StepViewProps = Required<{
  handleNextClick: FormProps['onFinish'];
  onValuesChange: FormProps['onValuesChange'];
  initialValues: FormProps['initialValues'];
}>;
