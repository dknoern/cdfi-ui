import React, {FC, useEffect, useState, useMemo, ChangeEvent} from 'react';
import { Form, Row, Col, Input, Radio, Select, Checkbox } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import {Metric, MetricType} from 'types';
import { FormSubmitFn } from 'types/form';
import {
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { MAX_LENGTH_ACCOUNT_CODE } from 'constants/validation';
import { typography } from 'constants/typography';
import { FormLabelWithIcon } from 'components';
import {
  maxLength,
  restrictWhitespace,
  required,
  minLength,
  matchesRegex,
  isNumericWithDecimal,
} from 'tools/formRules';
import { useAppConfig } from 'useAppConfig';
import { metricDependenciesStore } from 'store';
import { TagsMapType } from './types';
import {
  initTagsMap,
  initialValues4Company as formInitialValues,
} from './constants';
import { makeTagsTree } from './tools';
import styles from './MetricForm.module.scss';
import {duplicateNameCheck} from "./metricRules";

const { Option } = Select;

const uiText = typography('metricForm');

type MetricFormProps = {
  formId: string;
  onFinish: FormSubmitFn;
  initialValues?: Store;
  isGlobal?: boolean;
};
export const MetricForm: FC<MetricFormProps> = ({
  formId,
  onFinish,
  initialValues = formInitialValues,
  isGlobal,
}) => {
  const { METRIC_VARIANCE_ENABLED } = useAppConfig();

  const [form] = Form.useForm();
  const [onceRendered, setOnceRendered] = useState(false);
  const [formState, setFormState] = useState<Store>(initialValues);
  const [tagsMap, setTagsMap] = useState<TagsMapType>(initTagsMap);
  const [varianceDisabled, setVarianceDisabled] = useState(true);

  const {
    categories: rootCats,
    allCategories: metricCategories,
    allTagCategories: tagsCats,
  } = metricDependenciesStore;

  const isAddForm = useMemo(() => !initialValues.id, [initialValues]);

  useEffect(() => {
    setTimeout(() => {
      setOnceRendered(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (Array.isArray(tagsCats)) {
      setTagsMap(makeTagsTree(tagsCats));
    }
  }, [tagsCats]);

  const subCats = useMemo(() => {
    if (!formState.grandParentId || !metricCategories) return [];
    return metricCategories.filter(
      (cat) => cat.parentId === formState.grandParentId,
    );
  }, [metricCategories, formState.grandParentId]);

  const changeRootCat = (rootCat: number | string): void => {
    const subCat = (metricCategories || []).find(
      (cat) => cat.parentId === rootCat,
    );
    if (subCat) {
      form.setFieldsValue({ parentId: subCat.id });
    } else {
      form.setFieldsValue({ parentId: null });
    }
  };

  const onVarianceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isEmpty = !(e.currentTarget.value);
    setVarianceDisabled(isEmpty);
  };

  useEffect(() => {
    if (!isAddForm) {
      if (formState.maximumVariance) {
        form.setFieldsValue({
          maximumVariance: (formState.maximumVariance * 100).toString(),
        });
      }
    }
  }, [isAddForm]);

  useEffect(() => {
    if (!formState.maximumVariance) {
      form.setFieldsValue({
        checkVarianceIncrease: false,
        varianceComparePeriod: undefined,
      });
      setFormState((prevState) => ({
        ...prevState,
        checkVarianceIncrease: false,
        varianceComparePeriod: undefined,
      }));
    }
  }, [formState.maximumVariance, form]);

  return (
    <Form
      id={formId}
      form={form}
      size="middle"
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      onValuesChange={(changedValues, allValues): void => {
        setFormState((prevState) => ({
          ...allValues,
          checkVarianceIncrease: prevState.checkVarianceIncrease,
        }));
      }}
      onFinish={onFinish(form)}
      initialValues={initialValues}
      className={styles.form}
      hideRequiredMark
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col sm={GRID_COL_FULL_ROW_SPAN / 3}>
          <Form.Item
            name="name"
            rules={[
              required(),
              maxLength(),
              minLength(),
              restrictWhitespace(),
              duplicateNameCheck(initialValues as Metric),
            ]}
            label={
              <>
                <FormLabelWithIcon
                  text={uiText.metricNameLabel}
                  icon={QuestionCircleOutlined}
                  description={uiText.metricNameDescription}
                  className={styles.label}
                />
              </>
            }
          >
            <Input placeholder="Enter name" />
          </Form.Item>
        </Col>
        <Col sm={(GRID_COL_FULL_ROW_SPAN * 2) / 3}>
          <Form.Item
            name="type"
            rules={[required()]}
            label={
              <>
                <FormLabelWithIcon
                  text={uiText.metricTypeLabel}
                  icon={QuestionCircleOutlined}
                  description={uiText.metricTypeDescription}
                  className={styles.label}
                />
              </>
            }
          >
            <Radio.Group disabled={!isAddForm}>
              <Radio value={MetricType.NUMERIC}>Numeric</Radio>
              <Radio value={MetricType.TEXT}>Text</Radio>
              <Radio value={MetricType.BOTH}>Both</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row className={styles.forDivider} />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col sm={GRID_COL_FULL_ROW_SPAN / 3}>
          <Form.Item
            name="accountCode"
            rules={[
              maxLength(MAX_LENGTH_ACCOUNT_CODE),
              minLength(),
              restrictWhitespace(),
              matchesRegex.accountCode,
            ]}
            label={
              <>
                <FormLabelWithIcon
                  text={uiText.metricCodeLabel}
                  icon={QuestionCircleOutlined}
                  description={uiText.metricCodeDescription}
                  className={styles.label}
                />
              </>
            }
          >
            <Input placeholder="Enter Code" disabled />
          </Form.Item>
        </Col>
        <Col sm={(GRID_COL_FULL_ROW_SPAN * 2) / 3}>
          <Form.Item
            name="isPublic"
            rules={[{ required: true, message: 'Field is required' }]}
            label={
              <>
                <FormLabelWithIcon
                  text={uiText.metricAccessLabel}
                  icon={QuestionCircleOutlined}
                  description={uiText.metricAccessDescription}
                  className={styles.label}
                />
              </>
            }
          >
            <Radio.Group disabled={!isAddForm}>
              <Radio value={true}>Public</Radio>
              <Radio value={false}>Private</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row className={styles.forDivider} />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col sm={GRID_COL_FULL_ROW_SPAN / 3}>
          <Form.Item
            name="grandParentId"
            rules={[{ required: true, message: 'Category is required' }]}
            label={
              <>
                <FormLabelWithIcon
                  text={
                    isGlobal
                      ? uiText.metricCategoryLabel4Global
                      : uiText.metricCategoryLabel
                  }
                  icon={QuestionCircleOutlined}
                  description={uiText.metricCategoryDescription}
                  className={styles.label}
                />
              </>
            }
          >
            <Select
              onChange={changeRootCat}
              showSearch
              optionFilterProp="children"
            >
              <Option value="">None</Option>
              {rootCats
                .filter((item) => item.id !== 42)
                .map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col sm={GRID_COL_FULL_ROW_SPAN / 3}>
          <Form.Item
            name="parentId"
            label={
              <>
                <FormLabelWithIcon
                  text={
                    isGlobal
                      ? uiText.metricSubcategoryLabel4Global
                      : uiText.metricSubcategoryLabel
                  }
                  hint="Optional"
                  icon={QuestionCircleOutlined}
                  description={uiText.metricSubcategoryDescription}
                  className={styles.label}
                />
              </>
            }
          >
            <Select
              disabled={subCats.length < 1}
              showSearch
              optionFilterProp="children"
            >
              <Option value="">None</Option>
              {subCats.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {METRIC_VARIANCE_ENABLED && (
        <>
          <Row className={styles.forDivider} />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col sm={GRID_COL_FULL_ROW_SPAN / 3}>
              <Form.Item
                name="maximumVariance"
                label={
                  <>
                    <FormLabelWithIcon
                      text={uiText.metricMaxVarianceLabel}
                      hint="Optional"
                      icon={QuestionCircleOutlined}
                      description={uiText.metricMaxVarianceDescription}
                      className={styles.label}
                    />
                  </>
                }
                rules={[isNumericWithDecimal(), maxLength(10)]}
                normalize={(value, preVal, prevVals) => value.trim()}
              >
                <Input placeholder="Enter Maximum Variance" onChange={onVarianceChange} suffix="%" />
              </Form.Item>
            </Col>
            <Col sm={(GRID_COL_FULL_ROW_SPAN * 2) / 3}>
              <Form.Item
                name="varianceComparePeriod"
                rules={[
                  { required: !varianceDisabled, message: 'Field is required' },
                ]}
                label={
                  <>
                    <FormLabelWithIcon
                      text={uiText.metricComparePreviousLabel}
                      icon={QuestionCircleOutlined}
                      description={uiText.metricComparePreviousDescription}
                      className={
                        !formState.maximumVariance
                          ? styles.disabledLabel
                          : styles.label
                      }
                    />
                  </>
                }
              >
                <Radio.Group disabled={!formState.maximumVariance}>
                  <Radio value="Quarter">Quarter</Radio>
                  <Radio value="Year">Year</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.forDivider} />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col sm={GRID_COL_FULL_ROW_SPAN / 3}>
              <Form.Item
                name="checkVarianceIncrease"
                label={
                  <>
                    <FormLabelWithIcon
                      text={uiText.metricVarianceIncreaseLabel}
                      icon={QuestionCircleOutlined}
                      description={uiText.metricVarianceIncreaseDescription}
                      className={
                        !formState.maximumVariance
                          ? styles.disabledLabel
                          : styles.label
                      }
                    />
                  </>
                }
              >
                <Checkbox
                  defaultChecked={formState.checkVarianceIncrease}
                  disabled={!formState.maximumVariance}
                  onChange={(e): void => {
                    const isChecked = e.target.checked;
                    form.setFieldsValue({ checkVarianceIncrease: isChecked });
                    setFormState((prevState) => ({
                      ...prevState,
                      checkVarianceIncrease: isChecked,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};
