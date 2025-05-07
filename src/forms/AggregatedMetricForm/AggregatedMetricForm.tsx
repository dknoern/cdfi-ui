import React, { FC, useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { FormSubmitFn } from 'types/form';
import {
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { MAX_LENGTH_TEXT } from 'constants/validation';
import { typography } from 'constants/typography';
import { FormLabelWithIcon, TextAreaWithCounter } from 'components';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import styles from './AggregatedMetricForm.module.scss';
import { useGlobalMetrics } from '../../dataManagement';
import { Metric } from '../../types';
import { globalGraphsStore } from '../../store';
import { aggregatedMetricDefaultValues } from '../../scenes/Metrics/AggregatedMetrics/constants';

const { Option } = Select;
const uiText = typography('aggregatedMetricForm');

type AggregatedMetricFormProps = {
  formId: string;
  onFinish: FormSubmitFn;
  initialValues?: Store;
};

type GroupedMetrics = {
  [grandParentCategoryName: string]: {
    [parentCategoryName: string]: Metric[];
  };
};

export const AggregatedMetricForm: FC<AggregatedMetricFormProps> = ({
  formId,
  onFinish,
  initialValues = aggregatedMetricDefaultValues,
}) => {
  const [form] = Form.useForm();
  const isEditMode = !!initialValues?.id;
  const { data: metrics } = useGlobalMetrics();
  const { unitTypes, getUnitTypes, setUnitTypes } = globalGraphsStore;
  const [selectedGrandParents, setSelectedGrandParents] = useState<string[]>(
    [],
  );
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const initialMetricIds = initialValues?.metricIds || [];
  const [selectedMetricIds, setSelectedMetricIds] =
    useState<number[]>(initialMetricIds);

  const groupedMetrics = (metrics || []).reduce<GroupedMetrics>(
    (acc, metric) => {
      const grandParentName = metric.grandParentCategoryName ?? 'Other';
      const parentName = metric.parentCategoryName ?? 'Other';

      if (!acc[grandParentName]) {
        acc[grandParentName] = {};
      }
      if (!acc[grandParentName][parentName]) {
        acc[grandParentName][parentName] = [];
      }
      acc[grandParentName][parentName].push(metric as Metric);
      return acc;
    },
    {},
  );

  useEffect(() => {
    getUnitTypes();
  }, [getUnitTypes]);

  useEffect(() => {
    form.setFieldsValue({ metricIds: selectedMetricIds });
  }, [form, selectedMetricIds]);

  const handleGrandParentChange = (grandParents: string[]) => {
    setSelectedGrandParents(grandParents);
    setSelectedParents((currentParents) => {
      return currentParents.filter((parent) =>
        grandParents.some(
          (gp) =>
            groupedMetrics[gp] &&
            Object.keys(groupedMetrics[gp]).includes(parent),
        ),
      );
    });
    setSelectedMetricIds((currentMetricIds) => {
      const filteredMetrics = getFilteredMetrics(grandParents, selectedParents);
      const filteredMetricIds = filteredMetrics.map((metric) => metric.id);
      return currentMetricIds.filter(
        (id) =>
          initialMetricIds.includes(id) ||
          ((grandParents.length > 0 || selectedParents.length > 0) &&
            filteredMetricIds.includes(id)),
      );
    });
  };

  const handleParentChange = (parents: string[]) => {
    setSelectedParents(parents);
    setSelectedMetricIds((currentMetricIds) => {
      const filteredMetrics = getFilteredMetrics(selectedGrandParents, parents);
      const filteredMetricIds = filteredMetrics.map((metric) => metric.id);
      return currentMetricIds.filter(
        (id) => initialMetricIds.includes(id) || filteredMetricIds.includes(id),
      );
    });
  };

  const handleMetricIdsChange = (selectedItems: number[]) => {
    setSelectedMetricIds(selectedItems);
    if (selectedItems.length >= 2) {
      form.validateFields(['metricIds']);
    }
  };

  const getFilteredMetrics = (
    grandParents: string[],
    parents: string[],
  ): Metric[] => {
    const filteredMetrics: Metric[] = [];
    if (grandParents.length > 0) {
      grandParents.forEach((grandParent) => {
        if (groupedMetrics[grandParent]) {
          // Check if parents exist and have entries under the current grandparent
          const parentsInGrandParent = parents.filter(
            (parent) => groupedMetrics[grandParent][parent],
          );

          if (parentsInGrandParent.length > 0) {
            // If there are valid parents, include only metrics under those parents
            parentsInGrandParent.forEach((parent) => {
              filteredMetrics.push(...groupedMetrics[grandParent][parent]);
            });
          } else {
            // Otherwise, include all metrics under this grandparent
            Object.values(groupedMetrics[grandParent]).forEach((metrics) => {
              filteredMetrics.push(...metrics);
            });
          }
        }
      });
    } else {
      Object.values(groupedMetrics).forEach((grandParent) =>
        Object.values(grandParent).forEach((metric) =>
          filteredMetrics.push(...metric),
        ),
      );
    }
    return filteredMetrics.sort((a, b) =>
      a.accountCode.localeCompare(b.accountCode),
    );
  };

  return (
    <Form
      id={formId}
      form={form}
      size="middle"
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      onFinish={onFinish(form)}
      initialValues={initialValues}
      className={styles.form}
      requiredMark={false}
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col sm={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="name"
            rules={[
              required(),
              maxLength(MAX_LENGTH_TEXT),
              minLength(),
              restrictWhitespace(),
            ]}
            label={
              <FormLabelWithIcon
                text={uiText.metricNameLabel}
                icon={QuestionCircleOutlined}
                description={uiText.metricNameDescription}
                className={styles.label}
              />
            }
          >
            <Input
              placeholder="Enter name"
              onBlur={(e) => {
                form.setFieldsValue({ name: e.target.value.trim() });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className={styles.forDivider} />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col sm={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="definition"
            rules={[
              maxLength(MAX_LENGTH_TEXT),
              minLength(),
              restrictWhitespace(),
            ]}
            label={
              <FormLabelWithIcon
                hint={isEditMode ? undefined : 'Optional'}
                text={uiText.metricDescriptionLabel}
                icon={QuestionCircleOutlined}
                description={uiText.metricDescriptionDescription}
                className={styles.label}
              />
            }
          >
            <TextAreaWithCounter
              placeholder="Enter Description"
              formItemName="definition"
              limit={255}
              resize
              counterModifier="outside"
              initialLength={initialValues?.notes?.length}
              onBlur={(e) => {
                form.setFieldsValue({ definition: e.target.value.trim() });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className={styles.forDivider} />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col sm={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="unitType"
            rules={[{ required: true, message: 'Please select a unit type!' }]}
            label={
              <FormLabelWithIcon
                text={uiText.metricUnitTypeLabel}
                icon={QuestionCircleOutlined}
                description={uiText.metricUnitTypeDescription}
                className={styles.label}
              />
            }
          >
            <Select placeholder="Select a unit type">
              {unitTypes.map((unitType) => (
                <Option key={unitType} value={unitType}>
                  {unitType}
                </Option>
              ))}
              onChange=
              {(value: string): void => {
                setUnitTypes(value);
              }}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className={styles.forDivider} />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col sm={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="metricIds"
            label={
              <FormLabelWithIcon
                text={uiText.metricIncludedMetricsLabel}
                icon={QuestionCircleOutlined}
                description={uiText.metricIncludedMetricsDescription}
                className={styles.label}
              />
            }
            rules={[
              {
                validator: async (_, value) => {
                  if (!value || value.length < 2) {
                    return Promise.reject(
                      new Error('Please select at least two metrics'),
                    );
                  }
                },
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Filter by Grandparent Categories"
              onChange={handleGrandParentChange}
              style={{ width: '100%', marginBottom: 8 }}
            >
              {Object.keys(groupedMetrics).map((gp) => (
                <Option key={gp} value={gp}>
                  {gp}
                </Option>
              ))}
            </Select>
            {selectedGrandParents.length > 0 && (
              <Select
                mode="multiple"
                allowClear
                placeholder="Filter by Parent Categories"
                onChange={handleParentChange}
                value={selectedParents}
                style={{ width: '100%', marginBottom: 8 }}
              >
                {selectedGrandParents.flatMap((gp) =>
                  Object.keys(groupedMetrics[gp]).map((pc) => (
                    <Option key={pc} value={pc}>
                      {pc}
                    </Option>
                  )),
                )}
              </Select>
            )}
            <Select
              mode="multiple"
              showSearch
              placeholder="Select Metrics"
              value={selectedMetricIds} // Set the selected metrics value
              onChange={handleMetricIdsChange} // Directly update metric IDs
              filterOption={(input, option) =>
                option?.children?.toLowerCase().indexOf(input.toLowerCase()) >=
                0
              }
              style={{ width: '100%' }}
            >
              {getFilteredMetrics(selectedGrandParents, selectedParents).map(
                (metric) => (
                  <Option key={metric.id} value={metric.id}>
                    {`${metric.accountCode} - ${metric.name}`}
                  </Option>
                ),
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
