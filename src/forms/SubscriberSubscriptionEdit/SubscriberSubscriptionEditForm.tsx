import React, { FC, useEffect, useState } from 'react';
import {
  Col,
  Form,
  Row,
  Checkbox,
  Select,
  DatePicker,
  Divider,
  Badge,
  AutoComplete,
  Button,
} from 'antd';
import { SubscriberSubscriptionEditFormData, SubscriptionCdfi } from 'types';
import { SubscriberSubscriptionFormProps } from 'types/form';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_GUTTER,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THREE_QUARTERS_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { useCdfis, useSubscribers } from 'dataManagement';
import { subscriberStore } from 'store';
import { SUBSCRIPTION_DATE_FORMAT } from '../../constants';
import { TextAreaWithCounter } from 'components/TextAreaWithCounter';
import styles from './SubscriberSubscriptionEditForm.module.scss';
import { RangePickerProps } from 'antd/lib/date-picker';
import {
  getSubscriberSubscription,
  getSubscriberSubscriptions,
} from 'dataManagement/operations/subscriberOperations';

const checkboxStyle = {
  fontWeight: 'bold',
};

const mapCdfis = (cdfis: any): SubscriptionCdfi[] => {
  const result = cdfis.map((cdfi: any) => {
    if (typeof cdfi === 'string') {
      return cdfi;
    } else {
      return cdfi.name;
    }
  }) as unknown as SubscriptionCdfi[];
  return result;
};

export const SubscriberSubscriptionEditForm: FC<
  SubscriberSubscriptionFormProps<SubscriberSubscriptionEditFormData>
> = ({
  actionButtonText,
  actionButtonDisabled,
  form,
  formId,
  initialValues,
  onCancel,
  onFinish,
  setIsAtLeastOneCheckboxChecked,
}) => {
  const isEditForm = formId === 'SUBSCRIBER_SUBSCRIPTION_EDIT';
  const { data: subscribers } = useSubscribers();
  const { subscriberId, setAllCdfisRatingReports } = subscriberStore;
  const subscriberName = subscribers?.find((item) =>
    item.id == subscriberId ? item.name : '',
  )?.name;
  const isSubscriptionActive = initialValues?.active;

  if (isEditForm && initialValues) {
    if (initialValues.cdfisRatingReports) {
      initialValues.cdfisRatingReports = mapCdfis(
        initialValues.cdfisRatingReports.sort(),
      );
    }
    if (initialValues.cdfisPerformanceMaps) {
      initialValues.cdfisPerformanceMaps = mapCdfis(
        initialValues.cdfisPerformanceMaps.sort(),
      );
    }
    if (initialValues.cdfisPeerGroups) {
      initialValues.cdfisPeerGroups = mapCdfis(
        initialValues.cdfisPeerGroups.sort(),
      );
    }
    if (initialValues.cdfisFactSheets) {
      initialValues.cdfisFactSheets = mapCdfis(
        initialValues.cdfisFactSheets.sort(),
      );
    }
    if (initialValues.cdfisLibrary) {
      initialValues.cdfisLibrary = mapCdfis(initialValues.cdfisLibrary.sort());
    }
    if (initialValues.cdfisImpactManagementReports) {
      initialValues.cdfisImpactManagementReports = mapCdfis(
        initialValues.cdfisImpactManagementReports.sort(),
      );
    }
  }

  /**
   * Variables
   */

  const standardOutputMaps = ['Standard US maps', 'Standard UK maps'];

  const isAtLeastOneCheckboxChecked = (): boolean => {
    if (
      form.getFieldValue('isRatingReports') ||
      form.getFieldValue('isPerformanceMaps') ||
      form.getFieldValue('isPeerGroups') ||
      form.getFieldValue('isShowPeerMetrics') ||
      form.getFieldValue('isFactSheets') ||
      form.getFieldValue('isLibrary')
    ) {
      return true;
    }
    return false;
  };

  const { data: cdfis } = useCdfis();
  const activeCdfis = cdfis?.filter((cdfi) => cdfi.active);
  const activeCdfisData = activeCdfis?.map((cdfi) => {
    const newCdfi: SubscriptionCdfi = {
      id: cdfi.id,
      active: cdfi.active,
      name: cdfi.name,
      companyType: 'CDFI',
    };
    return newCdfi;
  });

  const [isRatingReports, setIsRatingReports] = useState(false);
  const [isCustomDataReports, setIsCustomDataReports] = useState(false);
  const [isShowPeerMetrics, setIsShowPeerMetrics] = useState(false);
  const [isPerformanceMaps, setIsPerformanceMaps] = useState(false);
  const [isPeerGroups, setIsPeerGroups] = useState(false);
  const [isFactSheets, setIsFactSheets] = useState(true);
  const [isLibrary, setIsLibrary] = useState(false);
  const [isImpactManagementReports, setIsImpactManagementReports] =
    useState(false);

  const [cdfiRatingReportsCount, setCdfiRatingReportsCount] =
    useState<number>();
  const [cdfiPerformanceMapsCount, setCdfiPerformanceMapsCount] =
    useState<number>();
  const [cdfiPeerGroupsCount, setCdfiPeerGroupsCount] = useState<number>();
  const [cdfiFactSheetsCount, setCdfiFactSheetsCount] = useState<number>();
  const [cdfiLibraryCount, setCdfiLibraryCount] = useState<number>();
  const [
    cdfiImpactManagementReportsCount,
    setCdfiImpactManagementReportsCount,
  ] = useState<number>();
  const [explorerFiltersEnabled, setExplorerFiltersEnabled] = useState(false);

  const allCdfisData = activeCdfisData?.map((cdfi: SubscriptionCdfi) => ({
    value: cdfi.name,
    label: cdfi.name,
  }));

  const cdfisOptions = [
    ...[{ value: 'all', label: 'Select All CDFIs' }],
    // @ts-ignore
    ...allCdfisData,
  ];

  // @ts-ignore
  const defaultOptions = [...Array(1001).keys()]?.map((val, index) => {
    return index === 0
      ? { value: 'All', label: 'All' }
      : { value: val.toString(), label: val.toString() };
  });

  const [options, setOptions] = useState(defaultOptions);

  /**
   * Handlers
   */
  const handleValueChange = (changedValues: any) => {
    if (form.getFieldValue('isRatingReports')) {
      setIsRatingReports(true);
    } else {
      form.setFieldsValue({ cdfiCountRatingReports: undefined });
      form.setFieldsValue({ cdfisRatingReports: undefined });
      setIsRatingReports(false);
      setCdfiRatingReportsCount(undefined);
    }
    if (form.getFieldValue('isPerformanceMaps')) {
      setIsPerformanceMaps(true);
    } else {
      form.setFieldsValue({ cdfiCountPerformanceMaps: undefined });
      form.setFieldsValue({ cdfisPerformanceMaps: undefined });
      setIsPerformanceMaps(false);
      setCdfiPerformanceMapsCount(undefined);
    }
    if (form.getFieldValue('isPeerGroups')) {
      setIsPeerGroups(true);
    } else {
      form.setFieldsValue({ cdfiCountPeerGroups: undefined });
      form.setFieldsValue({ cdfisPeerGroups: undefined });
      form.setFieldsValue({ explorerFiltersEnabled: undefined });
      setIsPeerGroups(false);
      setCdfiPeerGroupsCount(undefined);
      setExplorerFiltersEnabled(false);
      form.setFieldsValue({ isShowPeerMetrics: false });
    }
    if (form.getFieldValue('isFactSheets')) {
      setIsFactSheets(true);
      form.setFieldsValue({ cdfiCountFactSheets: 'All' });
    } else {
      form.setFieldsValue({ cdfiCountFactSheets: undefined });
      form.setFieldsValue({ cdfisFactSheets: undefined });
      setCdfiFactSheetsCount(undefined);
      setIsFactSheets(false);
    }
    if (form.getFieldValue('isLibrary')) {
      setIsLibrary(true);
    } else {
      form.setFieldsValue({ cdfiCountLibrary: undefined });
      form.setFieldsValue({ cdfisLibrary: undefined });
      setCdfiLibraryCount(undefined);
      setIsLibrary(false);
    }
    if (form.getFieldValue('isImpactManagementReports')) {
      setIsImpactManagementReports(true);
    } else {
      form.setFieldsValue({ cdfiCountImpactManagementReports: undefined });
      form.setFieldsValue({ cdfisImpactManagementReports: undefined });
      setCdfiImpactManagementReportsCount(undefined);
      setIsImpactManagementReports(false);
    }

    setIsAtLeastOneCheckboxChecked(isAtLeastOneCheckboxChecked());
  };

  const onChangeCdfisRatingReports = (value: any, values: any) => {
    if (value.find((item: string) => item === 'all')) {
      // @ts-ignore
      const allCDFi = activeCdfis.map((item) => item.name);
      form.setFieldsValue({ cdfisRatingReports: allCDFi });
      value = ['all'];
    }

    // @ts-ignore
    if (value[0] === 'all') {
      setAllCdfisRatingReports(activeCdfisData);
      // @ts-ignore
      setCdfiRatingReportsCount(activeCdfis.length);
      return;
    } else {
      setCdfiRatingReportsCount(values.length);
    }
  };

  const onChangeCdfisPerformanceMaps = (value: any, values: any) => {
    if (value.find((item: string) => item === 'all')) {
      // @ts-ignore
      const allCDFi = activeCdfis.map((item) => item.name);
      form.setFieldsValue({ cdfisPerformanceMaps: allCDFi });
      value = ['all'];
    }
    // @ts-ignore
    if (value[0] === 'all') {
      setAllCdfisRatingReports(activeCdfisData);
      // @ts-ignore
      setCdfiPerformanceMapsCount(activeCdfis.length);
      return;
    } else {
      setCdfiPerformanceMapsCount(values.length);
    }
  };

  const onChangeCdfisPeerGroups = (value: any, values: any) => {
    if (value.find((item: string) => item === 'all')) {
      // @ts-ignore
      const allCDFi = activeCdfis.map((item) => item.name);
      form.setFieldsValue({ cdfisPeerGroups: allCDFi });
      value = ['all'];
    }
    // @ts-ignore
    if (value[0] === 'all') {
      setAllCdfisRatingReports(activeCdfisData);
      // @ts-ignore
      setCdfiPeerGroupsCount(activeCdfis.length);
      return;
    } else {
      setCdfiPeerGroupsCount(values.length);
    }
  };

  const onChangeCdfisFactSheets = (value: any, values: any) => {
    if (value.find((item: string) => item === 'all')) {
      // @ts-ignore
      const allCDFi = activeCdfis.map((item) => item.name);
      form.setFieldsValue({ cdfisFactSheets: allCDFi });
      value = ['all'];
    }
    // @ts-ignore
    if (value[0] === 'all') {
      setAllCdfisRatingReports(activeCdfisData);
      // @ts-ignore
      setCdfiFactSheetsCount(activeCdfis.length);
      return;
    } else {
      setCdfiFactSheetsCount(values.length);
    }
  };

  const onChangeCdfisLibrary = (value: any, values: any) => {
    if (value.find((item: string) => item === 'all')) {
      // @ts-ignore
      const allCDFi = activeCdfis.map((item) => item.name);
      form.setFieldsValue({ cdfisLibrary: allCDFi });
      value = ['all'];
    }
    // @ts-ignore
    if (value[0] === 'all') {
      setAllCdfisRatingReports(activeCdfisData);
      // @ts-ignore
      setCdfiLibraryCount(activeCdfis.length);
      return;
    } else {
      setCdfiLibraryCount(values.length);
    }
  };

  const onChangeCdfisImpactManagementReports = (value: any, values: any) => {
    if (value.find((item: string) => item === 'all')) {
      // @ts-ignore
      const allCDFi = activeCdfis.map((item) => item.name);
      form.setFieldsValue({ cdfisImpactManagementReports: allCDFi });
      value = ['all'];
    }
    // @ts-ignore
    if (value[0] === 'all') {
      setAllCdfisRatingReports(activeCdfisData);
      // @ts-ignore
      setCdfiImpactManagementReportsCount(activeCdfis.length);
      return;
    } else {
      setCdfiImpactManagementReportsCount(values.length);
    }
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    return (
      form.getFieldValue('startDate') &&
      current &&
      current < form.getFieldValue('startDate')
    );
  };

  const onSearch = () => {
    setOptions([...defaultOptions]);
  };

  const handleDatesChange = () => {
    if (form.getFieldValue('startDate')) {
      form.validateFields(['startDate']);
    }
  };

  const onCopyLastOptionsClick = async () => {
    const lastSubscriptionOptions: SubscriberSubscriptionEditFormData = (
      await getSubscriberSubscriptions(subscriberId, 1, 100, {
        field: 'expirationDate',
        order: 'descend',
      })
    ).content[0];

    try {
      const data = await getSubscriberSubscription(
        subscriberId,
        lastSubscriptionOptions.id,
      );

      form.setFieldsValue({
        cdfiCountRatingReports: data.cdfiCountRatingReports,
        cdfiCountPerformanceMaps: data.cdfiCountPerformanceMaps,
        cdfiCountPeerGroups: data.cdfiCountPeerGroups,
        cdfiCountFactSheets: data.cdfiCountFactSheets,
        cdfiCountLibrary: data.cdfiCountLibrary,
        cdfiCountImpactManagementReports: data.cdfiCountImpactManagementReports,
      });

      subscriberStore.setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
    const lastSubscription = subscriberStore.subscriptions;
    //set checkbox, count and options for Rating Reports
    form.setFieldsValue({
      isRatingReports: lastSubscription.isRatingReports,
    });
    setIsRatingReports(lastSubscription.isRatingReports);
    form.setFieldsValue({
      cdfisRatingReports: lastSubscriptionOptions.cdfisRatingReports
        .map((cdfi) => cdfi.name)
        .sort(),
    });
    //set checkbox, count and options for CustomDataReports
    form.setFieldsValue({
      isCustomDataReports: lastSubscription.isCustomDataReports,
    });
    setIsCustomDataReports(lastSubscription.isCustomDataReports);

    //set checkbox, count and options for ShowPeerMetrics
    form.setFieldsValue({
      isShowPeerMetrics: lastSubscription.isShowPeerMetrics,
    });
    setIsShowPeerMetrics(lastSubscription.isShowPeerMetrics);

    //set checkbox, count and options for PerformanceMaps

    form.setFieldsValue({
      isPerformanceMaps: lastSubscription.isPerformanceMaps,
    });
    setIsPerformanceMaps(lastSubscription.isPerformanceMaps);
    form.setFieldsValue({
      cdfisPerformanceMaps: lastSubscriptionOptions.cdfisPerformanceMaps
        .map((cdfi) => cdfi.name)
        .sort(),
    });
    //set checkbox, count and options for PeerGroups

    form.setFieldsValue({
      isPeerGroups: lastSubscription.isPeerGroups,
    });
    setIsPeerGroups(lastSubscription.isPeerGroups);
    form.setFieldsValue({
      cdfisPeerGroups: lastSubscriptionOptions.cdfisPeerGroups
        .map((cdfi) => cdfi.name)
        .sort(),
    });
    //set checkbox, count and options for FactSheets

    form.setFieldsValue({
      isFactSheets: lastSubscription.isFactSheets,
    });
    setIsFactSheets(lastSubscription.isFactSheets);
    form.setFieldsValue({
      cdfisFactSheets: lastSubscriptionOptions.cdfisFactSheets
        .map((cdfi) => cdfi.name)
        .sort(),
    });
    //set checkbox, count and options for Library

    form.setFieldsValue({
      isLibrary: lastSubscription.isLibrary,
    });
    setIsLibrary(lastSubscription.isLibrary);
    const sortedCdfis = lastSubscriptionOptions.cdfisLibrary
      .map((cdfi) => cdfi.name)
      .sort();
    form.setFieldsValue({
      cdfisLibrary: sortedCdfis,
    });

    //set checkbox, count and options for ImpactManagementReports

    form.setFieldsValue({
      isImpactManagementReports: lastSubscription.isImpactManagementReports,
    });
    setIsImpactManagementReports(lastSubscription.isImpactManagementReports);
    form.setFieldsValue({
      cdfisImpactManagementReports:
        lastSubscriptionOptions.cdfisImpactManagementReports
          .map((cdfi) => cdfi.name)
          .sort(),
    });
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (isEditForm && initialValues) {
      if (initialValues.isRatingReports) {
        setIsRatingReports(true);
        setCdfiRatingReportsCount(initialValues.cdfisRatingReports?.length);
      }
      if (initialValues.isPerformanceMaps) {
        setIsPerformanceMaps(true);
        setCdfiPerformanceMapsCount(initialValues.cdfisPerformanceMaps?.length);
      }
      if (initialValues.isPeerGroups) {
        setIsPeerGroups(true);
        setCdfiPeerGroupsCount(initialValues.cdfisPeerGroups?.length);
      }
      if (initialValues.isFactSheets) {
        setIsFactSheets(true);
        form.setFieldsValue({ cdfiCountFactSheets: 'All' });
        setCdfiFactSheetsCount(initialValues.cdfisFactSheets?.length);
      }
      if (initialValues.isLibrary) {
        setIsLibrary(true);
        setCdfiLibraryCount(initialValues.cdfisLibrary?.length);
      }
      if (initialValues.isImpactManagementReports) {
        setIsImpactManagementReports(true);
        setCdfiImpactManagementReportsCount(
          initialValues.cdfisImpactManagementReports?.length,
        );
      }
      // TODO Check if Show Peer Metrics and Custom Data reports also need to be set
    } else {
      form.setFieldsValue({ outputMapGroup: standardOutputMaps[0] });
      form.setFieldsValue({ cdfiCountRatingReports: undefined });
      form.setFieldsValue({ cdfiCountPerformanceMaps: undefined });
      form.setFieldsValue({ cdfiCountPeerGroups: undefined });
      form.setFieldsValue({ cdfiCountFactSheets: undefined });
      form.setFieldsValue({ cdfiCountLibrary: undefined });
      form.setFieldsValue({ cdfiCountImpactManagementReports: undefined });
      form.setFieldsValue({ cdfiCountFactSheets: 'All' });
    }

    setIsAtLeastOneCheckboxChecked(isAtLeastOneCheckboxChecked());
  }, [initialValues, isEditForm]);

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      initialValues={initialValues}
      form={form}
      onValuesChange={handleValueChange}
      hideRequiredMark
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          {isEditForm
            ? `Make changes to the Subscription for ${subscriberName}`
            : `Create a new Subscription for ${subscriberName}`}
        </Col>
        <Divider style={{ border: 'unset' }} />
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN} />
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Button
            key="cancelBtn"
            htmlType="reset"
            type="default"
            onClick={onCancel}
            className={styles.cancelBtn}
          >
            {'Cancel'}
          </Button>
          <Button
            key="actionBtn"
            htmlType="submit"
            form={formId}
            type="primary"
            className={styles.actionBtn}
            disabled={actionButtonDisabled}
          >
            {actionButtonText}
          </Button>
        </Col>
        <Divider style={{ border: 'unset' }} />

        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="startDate"
            label="Start Date"
            validateTrigger="onChange"
            rules={[
              {
                required: true,
                message: 'Please select a date.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value >= getFieldValue('expirationDate') &&
                    getFieldValue('expirationDate')
                  ) {
                    return Promise.reject(
                      new Error('Start Date must be prior to Expiration Date'),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              format={SUBSCRIPTION_DATE_FORMAT}
              disabled={!isSubscriptionActive && isEditForm}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="expirationDate"
            label="Expiration Date"
            validateTrigger="onChange"
            rules={[{ required: true, message: 'Please select a date.' }]}
          >
            <DatePicker
              format={SUBSCRIPTION_DATE_FORMAT}
              disabledDate={disabledDate}
              onChange={handleDatesChange}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="outputMapGroup"
            label="Map Layout"
            rules={[
              { required: true, message: 'Please select an output map group.' },
            ]}
          >
            <Select
              options={standardOutputMaps?.map((output) => ({
                value: output,
              }))}
              disabled={!isSubscriptionActive && isEditForm}
            />
          </Form.Item>
        </Col>
        {!isEditForm && (
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Button
              key="copyLastOptionsBtn"
              htmlType="button"
              type="primary"
              className={styles.copyLastSubscrptBtn}
              onClick={onCopyLastOptionsClick}
            >
              {'Copy Last Subscription'}
            </Button>
          </Col>
        )}
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item name="notes" label="Notes:" style={checkboxStyle}>
            <TextAreaWithCounter
              formItemName="notes"
              limit={5000}
              resize
              counterModifier="outside"
              initialLength={initialValues?.notes?.length}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          Select the products for this Subscription:
        </Col>
      </Row>
      <Divider style={{ border: 'unset' }} />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isRatingReports" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Rating Reports
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="cdfiCountRatingReports"
            validateTrigger="onBlur"
            rules={[
              {
                required: false,
              },
              {
                min: 0,
                max: 1000,
                message:
                  'Too many CDFIs selected.  Please enter a number between 1 and 1,000',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === '') {
                    return Promise.resolve();
                  }
                  if (value !== undefined && value !== 'All' && isNaN(value)) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  if (+value > 1000 || +value <= 0) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <AutoComplete
              options={options}
              onSearch={onSearch}
              filterOption
              disabled={
                !isRatingReports || (!isSubscriptionActive && isEditForm)
              }
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          <Badge
            count={cdfiRatingReportsCount}
            overflowCount={999}
            style={{ backgroundColor: '#417792' }}
          >
            <Form.Item name="cdfisRatingReports">
              <Select
                placeholder="Select CDFIs"
                mode="multiple"
                optionFilterProp="label"
                style={{ width: '650px' }}
                onChange={(value, values) => {
                  onChangeCdfisRatingReports(value, values);
                }}
                // @ts-ignore
                options={cdfisOptions}
                disabled={
                  !isRatingReports || (!isSubscriptionActive && isEditForm)
                }
              ></Select>
            </Form.Item>
          </Badge>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isPerformanceMaps" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Performance Maps
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="cdfiCountPerformanceMaps"
            validateTrigger="onBlur"
            rules={[
              {
                max: 1000,
                message:
                  'Too many CDFIs selected.  Please enter a number between 1 and 1,000',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === '') {
                    return Promise.resolve();
                  }
                  if (value !== undefined && value !== 'All' && isNaN(value)) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  if (+value > 1000 || +value <= 0) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <AutoComplete
              options={options}
              onSearch={onSearch}
              filterOption
              disabled={
                !isPerformanceMaps || (!isSubscriptionActive && isEditForm)
              }
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          <Badge
            count={cdfiPerformanceMapsCount}
            overflowCount={999}
            style={{ backgroundColor: '#417792' }}
          >
            <Form.Item name="cdfisPerformanceMaps">
              <Select
                placeholder="Select CDFIs"
                mode="multiple"
                // @ts-ignore
                options={cdfisOptions}
                optionFilterProp="label"
                style={{ width: '650px' }}
                onChange={(value, values) => {
                  onChangeCdfisPerformanceMaps(value, values);
                }}
                disabled={
                  !isPerformanceMaps || (!isSubscriptionActive && isEditForm)
                }
              />
            </Form.Item>
          </Badge>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isPeerGroups" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Aeris® Explorer / Peer Groups
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="cdfiCountPeerGroups"
            validateTrigger="onBlur"
            rules={[
              {
                max: 1000,
                message:
                  'Too many CDFIs selected.  Please enter a number between 1 and 1,000',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === '') {
                    return Promise.resolve();
                  }
                  if (value !== undefined && value !== 'All' && isNaN(value)) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  if (+value > 1000 || +value <= 0) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <AutoComplete
              options={options}
              onSearch={onSearch}
              filterOption
              disabled={!isPeerGroups || (!isSubscriptionActive && isEditForm)}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          <Badge
            count={cdfiPeerGroupsCount}
            overflowCount={999}
            style={{ backgroundColor: '#417792' }}
          >
            <Form.Item name="cdfisPeerGroups">
              <Select
                placeholder="Select CDFIs"
                mode="multiple"
                options={cdfisOptions}
                optionFilterProp="label"
                style={{ width: '650px' }}
                onChange={(value, values) => {
                  onChangeCdfisPeerGroups(value, values);
                }}
                disabled={
                  !isPeerGroups || (!isSubscriptionActive && isEditForm)
                }
              />
            </Form.Item>
          </Badge>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN} hidden={!isPeerGroups}>
          <Form.Item name="isShowPeerMetrics" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Show Peer Metrics
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN} hidden={!isPeerGroups}>
          <Form.Item name="explorerFiltersEnabled" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Enable Premium Filters
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isFactSheets" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Aeris® Fact Sheets
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="cdfiCountFactSheets"
            validateTrigger="onBlur"
            rules={[
              {
                max: 1000,
                message:
                  'Too many CDFIs selected.  Please enter a number between 1 and 1,000',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === '') {
                    return Promise.resolve();
                  }
                  if (value !== undefined && value !== 'All' && isNaN(value)) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  if (+value > 1000 || +value <= 0) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <AutoComplete
              options={options}
              onSearch={onSearch}
              filterOption
              disabled={!isFactSheets || (!isSubscriptionActive && isEditForm)}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          <Badge
            count={cdfiFactSheetsCount}
            overflowCount={999}
            style={{ backgroundColor: '#417792' }}
          >
            <Form.Item name="cdfisFactSheets">
              <Select
                placeholder="Select CDFIs"
                mode="multiple"
                options={cdfisOptions}
                optionFilterProp="label"
                style={{ width: '650px' }}
                onChange={(value, values) => {
                  onChangeCdfisFactSheets(value, values);
                }}
                disabled={
                  !isFactSheets || (!isSubscriptionActive && isEditForm)
                }
              />
            </Form.Item>
          </Badge>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isLibrary" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Library
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="cdfiCountLibrary"
            validateTrigger="onBlur"
            rules={[
              {
                max: 1000,
                message:
                  'Too many CDFIs selected.  Please enter a number between 1 and 1,000',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === '') {
                    return Promise.resolve();
                  }
                  if (value !== undefined && value !== 'All' && isNaN(value)) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  if (+value > 1000 || +value <= 0) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <AutoComplete
              options={options}
              onSearch={onSearch}
              filterOption
              disabled={!isLibrary || (!isSubscriptionActive && isEditForm)}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          <Badge
            count={cdfiLibraryCount}
            overflowCount={999}
            style={{ backgroundColor: '#417792' }}
          >
            <Form.Item name="cdfisLibrary">
              <Select
                placeholder="Select CDFIs"
                mode="multiple"
                options={cdfisOptions}
                optionFilterProp="label"
                style={{ width: '650px' }}
                onChange={(value, values) => {
                  onChangeCdfisLibrary(value, values);
                }}
                disabled={!isLibrary || (!isSubscriptionActive && isEditForm)}
              />
            </Form.Item>
          </Badge>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isImpactManagementReports" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Impact Management Reports
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="cdfiCountImpactManagementReports"
            validateTrigger="onBlur"
            rules={[
              {
                max: 1000,
                message:
                  'Too many CDFIs selected.  Please enter a number between 1 and 1,000',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === '') {
                    return Promise.resolve();
                  }
                  if (value !== undefined && value !== 'All' && isNaN(value)) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  if (+value > 1000 || +value <= 0) {
                    return Promise.reject(
                      new Error(
                        'Please enter a number from 1 to 1000 or "All"',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <AutoComplete
              options={options}
              onSearch={onSearch}
              filterOption
              disabled={
                !isImpactManagementReports ||
                (!isSubscriptionActive && isEditForm)
              }
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          <Badge
            count={cdfiImpactManagementReportsCount}
            overflowCount={999}
            style={{ backgroundColor: '#417792' }}
          >
            <Form.Item name="cdfisImpactManagementReports">
              <Select
                placeholder="Select CDFIs"
                mode="multiple"
                options={cdfisOptions}
                optionFilterProp="label"
                style={{ width: '650px' }}
                onChange={(value, values) => {
                  onChangeCdfisImpactManagementReports(value, values);
                }}
                disabled={
                  !isImpactManagementReports ||
                  (!isSubscriptionActive && isEditForm)
                }
              />
            </Form.Item>
          </Badge>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isCustomDataReports" valuePropName="checked">
            <Checkbox
              style={checkboxStyle}
              disabled={!isSubscriptionActive && isEditForm}
            >
              Custom Data Reports
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
