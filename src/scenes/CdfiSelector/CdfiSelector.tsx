import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { aerisExplorerPeerGroupStore, userStore } from 'store';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useFilterSelectConfigs } from './useFilterSelectConfigs';
import {
  FilterEnum,
  filterSelectConfigs,
  transformAdditionalFiltersDataToUIInputs,
  transformFiltersDataToUISelections,
  transformTotalAssetsDataToUIValues,
  transformUIAdditionalFiltersToFiltersPayload,
  transformUISelectionsToFiltersPayload,
  transformUITotalAssetsToFilterPayload,
} from './constants';
import {
  cdfiSelectorListColumns,
  createPeerGroupCdfiListColumns,
} from './columns';
import {
  ContentLimiter,
  FormLabelWithIcon,
  PageSectionWrapper,
} from 'components';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_THREE_QUARTERS_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Steps,
  Table,
  Tooltip,
  Checkbox,
} from 'antd';
import { notifyUser } from 'tools';
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { handleServerFormError } from 'tools/formTools';
import { maxLength, minLength, required } from 'tools/formRules';
import { SelectValue } from 'antd/lib/select';
import {
  GroupType,
  PeerCdfi,
  PeerGroupName,
  PeerPortfolioSegment,
} from 'types/peerGroups';
import styles from './CdfiSelector.module.scss';
import { NumericSliderFilter } from './FilterComponents/NumericSliderFilter';
import { CustomFilterHeader } from './FilterComponents/CustomFilterHeader';
import { Equation } from '../../types/equation';
import { CreatePeerGroupInstructions } from './Instructions/CreatePeerGroupInstructions';
import { CreatePortfolioSegmentInstructions } from './Instructions/CreatePortfolioSegmentInstructions';
import { useDebouncedCallback } from 'use-debounce';
import { CdfiSelectorInstructions } from './Instructions/CdfiSelectorInstructions';
import { subscriptionStore } from '../../store/subscriptionStore';
import AddToAccountModal from './AddToAccountModal';
import {
  Subscription,
  SubscriptionProductStatusVM,
  SubscriptionType,
} from '../../types';
import {
  addToMyCloud,
  getAvailableProductsByCompany,
} from '../../dataManagement/operations/subscriptionOperations';

const { Step } = Steps;
const { TextArea } = Input;
const { Panel } = Collapse;

export const CdfiSelector = observer(() => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { id, groupType, companyId, userType } = useParams();
  const cdfiId = userType === 'cdfi' ? Number(companyId) : undefined;
  const subscriberId =
    userType === 'subscriber' ? Number(companyId) : undefined;
  const paramId = id === 'CREATE' ? undefined : id;
  const subscriberUser = userStore.isSubscriber;
  const analystUser = userStore.isAerisAnalyst;
  const createPeerOrPortfolio = !(
    id === undefined &&
    groupType === undefined &&
    companyId === undefined &&
    userType === undefined
  );

  const {
    targetBeneficiaries,
    impactAreas,
    lendingTypes,
    subImpactAreas,
    areasServed,
    irisOptions,
    sdgOptions,
    cdfiLocationsOptions,
  } = useFilterSelectConfigs();
  const {
    getCdfis,
    getCdfisForSelector,
    cdfis,
    createPeerGroup,
    updatePeerGroup,
    getPeerGroup,
    peerGroup,
    setPeerGroup,
    getEquationFilters,
    checkPeerGroupName,
  } = aerisExplorerPeerGroupStore;

  const initialModalData: SubscriptionProductStatusVM = {
    financialsAvailable: '0',
    peerGroupsAvailable: '0',
    ratingsAvailable: '0',
    financialsEligible: false,
    financialsSelected: false,
    financialsCheckboxVisible: false,
    peerGroupsEligible: false,
    peerGroupsSelected: false,
    peerGroupsCheckboxVisible: false,
    ratingsEligible: false,
    ratingsSelected: false,
    ratingsCheckboxVisible: false,
  };

  const isPeerGroupCreate = groupType === GroupType.PEER_GROUP;
  const [loadingCdfiList, setLoadingCdfiList] = useState(false);
  const [filteredData, setFilteredData] = useState(toJS(cdfis));
  const [filterSelections, setFilterSelections] = useState<
    Record<string, string[]>
  >({});
  const [sliderValues, setSliderValues] = useState<
    [number, number] | undefined
  >();
  const [selectedCdfis, setSelectedCdfis] = useState<any[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [stepState, setStepState] = useState(0);
  const [additionalFilters, setAdditionalFilters] = useState<Equation[]>([]);
  const [appliedAdditionalFilters, setAppliedAdditionalFilters] = useState<
    Record<string, [number, number] | undefined>
  >({});
  const [searchBarQuery, setSearchBarQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const { getActiveSubscriptions } = subscriptionStore;
  const [subscriptionTypeAll, setSubscriptionTypeAll] = useState(false);
  const [isOnlyFactSheetSubscription, setOnlyFactSheetSubscription] =
    useState(false);
  const [isAnonymous, setAnonymous] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] =
    useState<SubscriptionProductStatusVM>(initialModalData);
  const [selectedCdfiId, setSelectedCdfiId] = useState<number | null>(null);
  const [subscriptionTypeAllId, setSubscriptionTypeAllId] = useState<
    number | undefined
  >(undefined);
  const [cdfiIds, setCdfiIds] = useState<number[]>([]);
  const [ratedSelected, setRatedSelected] = useState(false);
  const showModal = async (modalCdfiId: number) => {
    if (!subscriptionTypeAllId || !modalCdfiId) return;
    try {
      const availableProducts = await getAvailableProductsByCompany(
        modalCdfiId,
        subscriptionTypeAllId,
      );
      setModalData(availableProducts);
      setSelectedCdfiId(modalCdfiId);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Failed to show modal:', error);
    }
  };

  const handleModalConfirm = useCallback(
    async (selectedProducts) => {
      if (!selectedCdfiId || !subscriptionTypeAllId) return;
      const updatedData = {
        ...modalData,
        ...selectedProducts,
      };
      try {
        await addToMyCloud(
          selectedCdfiId,
          subscriptionTypeAllId,
          selectedProducts,
        );
        setCdfiIds((prevCdfiIds) => [...prevCdfiIds, selectedCdfiId]);
        setModalData(updatedData);
        setIsModalVisible(false);
        await getCdfisForSelector();
      } catch (error) {
        console.error('Error adding to my cloud:', error);
      }
    },
    [getCdfisForSelector, modalData, selectedCdfiId, subscriptionTypeAllId],
  );

  const getOptions = useCallback(
    (title: string) => {
      switch (title) {
        case 'Impact Areas':
          return impactAreas;
        case 'Target Beneficiaries':
          return targetBeneficiaries;
        case 'Sub Impact Areas':
          return subImpactAreas;
        case 'Lending Type':
          return lendingTypes;
        case 'Primary Lending Type':
          return lendingTypes;
        case 'CDFI Location':
          return cdfiLocationsOptions;
        case 'Area(s) Served':
          return areasServed;
        case 'IRIS+':
          return irisOptions;
        case 'SDGs':
          return sdgOptions;
        case 'Rated':
          return [
            { label: 'Rated', value: 'Rated' },
            { label: 'Not-Rated', value: 'Non-Rated' },
          ];
        case 'Impact Management Rating':
          return [
            { label: '★★★★', value: '★★★★' },
            { label: '★★★', value: '★★★' },
            { label: '★★', value: '★★' },
            { label: '★', value: '★' },
          ];
        case 'Financial Performance Rating':
          return [
            { label: 'AAA', value: 'AAA' },
            { label: 'AA+', value: 'AA+' },
            { label: 'AA', value: 'AA' },
            { label: 'AA-', value: 'AA-' },
            { label: 'A+', value: 'A+' },
            { label: 'A', value: 'A' },
            { label: 'A-', value: 'A-' },
            { label: 'BBB+', value: 'BBB+' },
            { label: 'BBB', value: 'BBB' },
            { label: 'BBB-', value: 'BBB-' },
            { label: 'BB+', value: 'BB+' },
            { label: 'BB', value: 'BB' },
            { label: 'BB-', value: 'BB-' },
            { label: 'B', value: 'B' },
          ];
        default:
          return [{ label: 'default', value: 'default' }];
      }
    },
    [
      impactAreas,
      targetBeneficiaries,
      subImpactAreas,
      lendingTypes,
      cdfiLocationsOptions,
      areasServed,
      irisOptions,
      sdgOptions,
    ],
  );

  const handleSteps = (buttonId: string) => {
    switch (buttonId) {
      case 'next':
        setStepState(stepState !== 1 ? stepState + 1 : 1);
        break;
      case 'back':
        if (stepState === 0) return;
        setStepState(stepState - 1);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (dataKey: string, value: SelectValue): void => {
    if (dataKey === 'rated') {
      const selectedValues = value as string[];
      setRatedSelected(selectedValues.includes('Rated'));
    }
    setFilterSelections((prevState) => ({
      ...prevState,
      [dataKey]: value as string[],
    }));
  };

  const rowSelection = {
    selectedRowKeys: selectedCdfis?.map((item) => item?.id),
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      const selectedPeers: any[] =
        cdfis?.filter((cdfi) => selectedRowKeys.includes(cdfi?.id)) ?? [];
      setSelectedCdfis(selectedPeers);
      form.setFieldsValue({ peers: selectedPeers });
    },
    onSelectAll: (isSelected: boolean) => {
      if (isSelected) {
        const selectedPeers: any[] | undefined = filteredData || cdfis;
        setSelectedCdfis(selectedPeers as any[]);
        form.setFieldsValue({ peers: selectedPeers });
      } else {
        setSelectedCdfis([]);
        form.setFieldsValue({ peers: [] });
      }
    },
  };

  const handleNameInput = (value: any) => {
    setNameInput(value);
    form.setFieldsValue({ name: value });
    checkName(value, peerGroup?.id ?? null);
  };

  const checkName = useCallback(
    useDebouncedCallback(async (name: string, id: number | null) => {
      if (name) {
        const payload: PeerGroupName = id ? { id, name } : { name };
        const response = await checkPeerGroupName(payload);
        if (response) {
          form.setFields([
            {
              name: 'name',
              errors: ['The name is not unique, please choose another name.'],
            },
          ]);
          setIsNameValid(false);
        } else {
          setIsNameValid(true);
        }
      }
    }, 300),
    [],
  );

  const handleDescriptionInput = (value: any) => {
    setDescriptionInput(value);
    form.setFieldsValue({ description: value });
  };

  const resetAllFilters = () => {
    setFilterSelections({});
    setSliderValues(undefined);
    setAppliedAdditionalFilters({});
  };

  const onCancel = () => {
    setFilterSelections({});
    setSelectedCdfis([]);
    setNameInput('');
    setDescriptionInput('');
    setSliderValues(undefined);
  };

  const handleSubmit = () => {
    setIsSaving(true);
    const values = form.getFieldsValue();

    const payload = { ...peerGroup } as PeerPortfolioSegment;
    payload.name = values.name;
    payload.description = values.description;
    payload.peers = values.peers.map((cdfi: PeerCdfi) => cdfi.id);
    payload.groupType = groupType;
    payload.filters =
      [
        ...transformUISelectionsToFiltersPayload(filterSelections),
        ...(sliderValues?.length === 2 && sliderValues[0] !== null && sliderValues[1] !== null
          ? [transformUITotalAssetsToFilterPayload(sliderValues)]
          : []),
        ...transformUIAdditionalFiltersToFiltersPayload(
          appliedAdditionalFilters,
        ),
      ] || [];

    // Have now set company/cdfi based on the flow.
    // TODO: verify creating, updating and viewing have correct id fields and values by manually using the UI for a bit.
    payload.cdfiId = peerGroup?.cdfiId || cdfiId;
    payload.companyId = peerGroup?.companyId || subscriberId;

    if (paramId) {
      updatePeerGroup(payload)
        .then(() => {
          notifyUser.ok(
            'aerisExplorer',
            `${
              isPeerGroupCreate
                ? 'updatePeerGroupOk'
                : 'updatePortfolioSegmentOk'
            }`,
          );
          history.push(`/reports-page/${paramId}`);
          onCancel();
        })
        .catch(
          handleServerFormError({
            form,
            category: 'common',
          }),
        )
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      createPeerGroup(payload)
        .then((res) => {
          notifyUser.ok(
            'aerisExplorer',
            `${
              isPeerGroupCreate
                ? 'createPeerGroupOk'
                : 'createPortfolioSegmentOk'
            }`,
          );
          history.push(`/reports-page/${res.id}`);
          onCancel();
        })
        .catch(
          handleServerFormError({
            form,
            category: 'common',
          }),
        )
        .finally(() => {
          setIsSaving(false);
        });
    }
  };

  const SelectFilters = useMemo(
    () =>
      filterSelectConfigs.map((config) => {
        if (
          (config.dataKey === 'impactManagementRating' ||
            config.dataKey === 'financialPerformanceRating') &&
          (!ratedSelected || !showRatings)
        ) {
          return null; // Only show these filters if "Rated" is selected
        }
        return (
          <Select
            mode="multiple"
            key={config.dataKey}
            allowClear
            className={config.className}
            placeholder={
              <>
                <RightOutlined className={styles.selectIcon} />
                {config.title}
              </>
            }
            options={getOptions(config.title)}
            onChange={(value): void =>
              handleSelectChange(config.dataKey, value)
            }
            value={filterSelections[config.dataKey] || []}
            loading={loadingCdfiList}
            disabled={loadingCdfiList}
          />
        );
      }),
    [getOptions, filterSelections, loadingCdfiList, ratedSelected],
  );

  const applyAdditionalFilter = (
    filter: Equation,
    values: [number, number] | undefined,
  ): void => {
    let parsedMin;
    let parsedMax;
    if (values) {
      if (values[0]) {
        parsedMin =
          filter.unitType === 'PERCENTAGE' ? values[0] / 100 : values[0];
      }
      if (values[1]) {
        parsedMax =
          filter.unitType === 'PERCENTAGE' ? values[1] / 100 : values[1];
      }
    }

    const parsedRange: [number | undefined, number | undefined] = [
      parsedMin,
      parsedMax,
    ];

    setAppliedAdditionalFilters((prevState) => ({
      ...prevState,
      [filter.id]: parsedRange,
    }));

    filterData();
  };

  const cdfiMatchesAllAppliedFilters = (
    cdfi: any,
    appliedFilters: Record<
      string,
      [number | undefined, number | undefined] | undefined
    >,
  ): boolean => {
    return Object.entries(appliedFilters).every(([equationId, range]) => {
      if (!range) return true;

      const [min, max] = range;

      if (cdfi.valueFacts === undefined) return false;

      const cdfiValueFacts = new Map<number, any>(
        Object.entries(cdfi.valueFacts).map(([key, value]) => [+key, value]),
      );

      const valueFact = cdfiValueFacts.get(Number(equationId));

      if (!valueFact?.amount) return false;

      const value = valueFact.amount;

      if (min !== undefined && max !== undefined) {
        return value >= min && value <= max;
      }
      if (min !== undefined) {
        return value >= min;
      }
      if (max !== undefined) {
        return value <= max;
      }

      return true;
    });
  };

  const filterData = useCallback(() => {
    let filtered = toJS(cdfis);

    if (searchBarQuery) {
      filtered = filtered?.filter(
        (cdfi) =>
          cdfi.name.toLowerCase().includes(searchBarQuery.toLowerCase()) ||
          cdfi.sectoralFocus.some((sector: any) =>
            sector.name.toLowerCase().includes(searchBarQuery.toLowerCase()),
          ),
      );
    }

    Object.keys(filterSelections).forEach((key) => {
      if (filterSelections[key].length > 0) {
        const filterKey = key === 'sdgs' || key === 'iris' ? 'tags' : key;
        if (
          key === 'impactManagementRating' ||
          key === 'financialPerformanceRating'
        ) {
          filtered = filtered?.filter((item) => {
            const ratingComponents = item.rating
              .split(/\s+/)
              .map((part: string) => part.trim());
            return filterSelections[key].some((selectedVal: string) => {
              return ratingComponents.includes(selectedVal);
            });
          });
        } else {
          filtered = filtered?.filter((item) =>
            filterSelections[key].some((filterVal: any) => {
              if (Array.isArray(item[filterKey])) {
                return item[filterKey]
                  .map((obj: { name: string }) => obj.name)
                  .includes(filterVal);
              }
              return filterSelections[key].includes(item[filterKey]);
            }),
          );
        }
      }
    });

    if (sliderValues !== undefined) {
      filtered = filtered?.filter((item) => {
        const [min, max] = sliderValues;
        if (min !== undefined && max !== undefined) {
          return item.totalAssets >= min && item.totalAssets <= max;
        }
        if (min !== undefined) {
          return item.totalAssets >= min;
        }
        if (max !== undefined) {
          return item.totalAssets <= max;
        }
        return true;
      });
    }

    filtered = filtered?.filter((cdfi) => {
      return cdfiMatchesAllAppliedFilters(cdfi, appliedAdditionalFilters);
    });
    setFilteredData(filtered);
  }, [
    appliedAdditionalFilters,
    cdfis,
    filterSelections,
    searchBarQuery,
    sliderValues,
  ]);

  useEffect(() => {
    getActiveSubscriptions().then((data: Subscription[] | undefined) => {
      if (data && data.length > 0) {
        // Check if there is a subscription with `subscriptionType === "All"`
        const allSubscription = data.find(
          (sub) =>
            sub.subscriptionType === SubscriptionType.ALL ||
            sub.subscriptionType === SubscriptionType.MULTIPLE,
        );
        if (allSubscription) {
          // If "All" subscription is found, set its ID
          setSubscriptionTypeAll(true);
          setSubscriptionTypeAllId(allSubscription.id);
          setCdfiIds(allSubscription.cdfis);
        } else {
          // If no "All" subscription is found, disable "Add to my account"
          setSubscriptionTypeAll(false);
          setSubscriptionTypeAllId(undefined);
          setCdfiIds([]);
        }

        const notOnlyFactSheetSubscription = data.some(
          (sub) => sub.isPeerGroups || sub.isRatingReports || sub.isPerformanceMaps
        );

        if (notOnlyFactSheetSubscription) {
          setShowRatings(true);
        } else {
          setOnlyFactSheetSubscription(true);
        }
      }
      if (userStore.isAerisAdmin) {
        setShowRatings(true);
      }
    });
  }, [getActiveSubscriptions, subscriberId]);

  useEffect(() => {
    setLoadingCdfiList(true);
    if (createPeerOrPortfolio) {
      getCdfis().finally(() => {
        setLoadingCdfiList(false);
      });
    } else {
      getCdfisForSelector().finally(() => {
        setLoadingCdfiList(false);
      });
    }
  }, [getCdfis, getCdfisForSelector, createPeerOrPortfolio]);

  useEffect(() => {
    filterData();
  }, [
    sliderValues,
    filterSelections,
    appliedAdditionalFilters,
    searchBarQuery,
    cdfis,
    filterData,
  ]);

  useEffect(() => {
    if (paramId) {
      getPeerGroup(paramId);
    }
    return setPeerGroup(undefined as unknown as PeerPortfolioSegment);
  }, [paramId, getPeerGroup, setPeerGroup]);

  useEffect(() => {
    getEquationFilters().then((data) => setAdditionalFilters(data));
  }, [getEquationFilters]);

  useEffect(() => {
    if (!paramId) {
      form.resetFields();
      setSelectedCdfis([]);
      setNameInput('');
      setDescriptionInput('');
    } else if (peerGroup && cdfis) {
      const selectedCdfisFromStore =
        peerGroup?.peers
          ?.map((peerId) => {
            return toJS(cdfis)?.find((cdfi) => cdfi.id === peerId);
          })
          .filter((item) => item !== undefined) || [];

      const filterItemsForSelects = peerGroup.filters
        ? peerGroup.filters.filter(
            (filterItem) => filterItem.filter !== FilterEnum.TOTAL_ASSETS,
          )
        : [];

      const transformedFilters = transformFiltersDataToUISelections(
        filterItemsForSelects as {
          filter: FilterEnum;
          values: string[];
          displayName: string;
        }[],
      );

      const additionalFiltersForInputs = peerGroup.filters
        ? peerGroup.filters.filter((filterItem) => filterItem.equationId)
        : [];

      const transformedAdditionalFilters =
        transformAdditionalFiltersDataToUIInputs(additionalFiltersForInputs);

      const totalAssetsFilter = peerGroup.filters
        ? peerGroup.filters.filter(
            (filterItem) => filterItem.filter === FilterEnum.TOTAL_ASSETS,
          )
        : [];

      const transformedTotalAssets: [number, number] | undefined =
        transformTotalAssetsDataToUIValues(
          totalAssetsFilter[0] as unknown as {
            filter: FilterEnum;
            values: string[];
            displayName: string;
          },
        );

      setSliderValues(transformedTotalAssets);
      setFilterSelections(transformedFilters);
      setAppliedAdditionalFilters(transformedAdditionalFilters);
      setSelectedCdfis(selectedCdfisFromStore);
      setNameInput(peerGroup.name);
      setDescriptionInput(peerGroup?.description || '');

      form.setFieldsValue({
        peers: selectedCdfisFromStore,
        name: peerGroup.name,
        description: peerGroup.description,
      });
    }
  }, [peerGroup, form, cdfis, paramId]);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <ContentLimiter>
        <PageSectionWrapper
          title={createPeerOrPortfolio ? 'CDFI Explorer' : 'CDFI Selector'}
          description={
            createPeerOrPortfolio && (
              <p>
                {peerGroup && paramId
                  ? `Edit "${peerGroup?.name}" `
                  : 'Create New '}
                {isPeerGroupCreate || !createPeerOrPortfolio
                  ? 'Peer Group'
                  : 'Portfolio Segment'}
              </p>
            )
          }
        >
          {createPeerOrPortfolio ? (
            isPeerGroupCreate ? (
              <CreatePeerGroupInstructions />
            ) : (
              <CreatePortfolioSegmentInstructions />
            )
          ) : (
            <CdfiSelectorInstructions />
          )}
          {createPeerOrPortfolio && (
            <Row gutter={GRID_GUTTER} className={styles.steps}>
              <Col span={GRID_COL_THIRD_ROW_SPAN}>
                <Steps size="small" current={stepState}>
                  <Step title="Select CDFI" description="" />
                  <Step title="Add Details and Save" description="" />
                </Steps>
              </Col>
            </Row>
          )}
          {createPeerOrPortfolio && (
            <Row gutter={GRID_GUTTER}>
              <Col span={GRID_COL_THIRD_ROW_SPAN} className={styles.buttonNav}>
                <Button
                  className={styles.cancelButton}
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
                <Button
                  id="back"
                  className={styles.backButton}
                  style={
                    stepState === 0
                      ? {
                          color: '#c8d6dd',
                          borderColor: '#c8d6dd',
                          cursor: 'not-allowed',
                        }
                      : {}
                  }
                  icon={<CaretLeftOutlined />}
                  onClick={(e) => handleSteps(e.currentTarget.id)}
                >
                  Back
                </Button>
                {stepState === 1 ? (
                  <>
                    <Button
                      className={styles.saveButton}
                      onClick={form.submit}
                      disabled={stepState !== 1 || isSaving || !isNameValid}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Tooltip
                    title={
                      ((isPeerGroupCreate && selectedCdfis?.length < 5) ||
                        selectedCdfis?.length < 1) && (
                        <span>
                          {isPeerGroupCreate && selectedCdfis?.length < 5
                            ? 'Please select at least 5 CDFIs'
                            : 'Please select at least 1 CDFI'}
                        </span>
                      )
                    }
                  >
                    <Button
                      id="next"
                      className={styles.nextButton}
                      style={
                        (isPeerGroupCreate && selectedCdfis?.length < 5) ||
                        selectedCdfis?.length < 1
                          ? {
                              color: '#c8d6dd',
                              borderColor: '#c8d6dd',
                              cursor: 'not-allowed',
                            }
                          : {}
                      }
                      icon={<CaretRightOutlined />}
                      onClick={(e) => {
                        if (
                          !(
                            (isPeerGroupCreate && selectedCdfis?.length < 5) ||
                            selectedCdfis?.length < 1
                          )
                        ) {
                          handleSteps(e.currentTarget.id);
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Tooltip>
                )}
              </Col>
            </Row>
          )}
          <Row gutter={GRID_GUTTER}>
            <Col span={GRID_COL_QUARTER_ROW_SPAN}>
              {stepState === 1 ? (
                <>
                  <Form.Item
                    name="name"
                    rules={[required(), minLength(2), maxLength(500)]}
                    label={
                      <FormLabelWithIcon
                        text={`${
                          isPeerGroupCreate ? 'Peer Group' : 'Portfolio Segment'
                        } Name`}
                        icon={QuestionCircleOutlined}
                        description={`Enter a meaningful title for your ${
                          isPeerGroupCreate ? 'Peer Group' : 'Portfolio Segment'
                        }`}
                        className={styles.label}
                      />
                    }
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <TextArea
                      id="name"
                      value={nameInput}
                      onChange={(e) => handleNameInput(e.target.value)}
                      autoSize={{ minRows: 1, maxRows: 5 }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label={
                      <FormLabelWithIcon
                        text="Description"
                        icon={QuestionCircleOutlined}
                        description="Enter a brief description."
                        className={styles.label}
                      />
                    }
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <TextArea
                      id="description"
                      rows={4}
                      value={descriptionInput}
                      onChange={(e) => handleDescriptionInput(e.target.value)}
                      placeholder="Enter a brief description."
                      maxLength={255}
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <p className={styles.marginBottom16}>Filter</p>
                  {SelectFilters}
                  <Collapse
                    bordered={false}
                    className={`${styles.customCollapse} ${styles.customCollapseItem}`}
                  >
                    <Panel
                      key="total assets"
                      header={
                        <div className={styles.flexColumn}>
                          <span className={styles.lightBlue}>Total Assets</span>
                          {sliderValues && (
                            <>
                              <span>
                                Min: ${sliderValues?.[0]?.toLocaleString()}
                              </span>
                              <span>
                                Max: ${sliderValues?.[1]?.toLocaleString()}
                              </span>
                            </>
                          )}
                        </div>
                      }
                    >
                      <div className={styles.flexColumn}>
                        <NumericSliderFilter
                          disabled={loadingCdfiList}
                          filterName="Total Assets"
                          onAfterChange={(values): void => {
                            setSliderValues(values);
                          }}
                          values={sliderValues}
                          format="DOLLAR"
                        />
                        <Button
                          size="small"
                          type="link"
                          onClick={() => setSliderValues(undefined)}
                        >
                          Clear Values
                        </Button>
                      </div>
                    </Panel>
                    {additionalFilters.map((filter) => {
                      return (
                        <Panel
                          key={filter.id}
                          header={
                            <div className={styles.flexColumn}>
                              <span className={styles.lightBlue}>
                                {filter.name}
                              </span>
                              {appliedAdditionalFilters?.[filter.id] && (
                                <CustomFilterHeader
                                  format={filter.unitType}
                                  appliedAdditionalFiltersValues={
                                    appliedAdditionalFilters[filter.id]
                                  }
                                />
                              )}
                            </div>
                          }
                        >
                          <div className={styles.flexColumn}>
                            <NumericSliderFilter
                              disabled={loadingCdfiList}
                              filterName={filter.name}
                              values={appliedAdditionalFilters[filter.id]}
                              onAfterChange={(values): void => {
                                applyAdditionalFilter(filter, values);
                              }}
                              format={filter.unitType}
                            />
                            <Button
                              size="small"
                              type="link"
                              onClick={() =>
                                setAppliedAdditionalFilters((prevState) => ({
                                  ...prevState,
                                  [filter.id]: undefined,
                                }))
                              }
                            >
                              Clear Values
                            </Button>
                          </div>
                        </Panel>
                      );
                    })}
                  </Collapse>
                  <Button
                    className={styles.resetAllFiltersButton}
                    onClick={resetAllFilters}
                  >
                    Reset All Filters
                  </Button>
                </>
              )}
            </Col>
            <Col
              span={GRID_COL_THREE_QUARTERS_ROW_SPAN}
              className={styles.tableContainer}
            >
              <Row className={styles.marginBottomHalfEm}>
                <Col span={GRID_COL_HALF_ROW_SPAN}>
                  {selectedCdfis?.length > 0 && (
                    <span className={styles.lightBlue}>{`${
                      selectedCdfis?.length
                    } selected CDFI${
                      selectedCdfis?.length > 1 ? 's' : ''
                    }`}</span>
                  )}
                </Col>
                <Col span={GRID_COL_HALF_ROW_SPAN}>
                  {stepState === 0 && (
                    <Input
                      onChange={(e) => setSearchBarQuery(e.target.value)}
                      placeholder="Search by CDFI Name or Impact Area"
                      allowClear
                      suffix={<SearchOutlined />}
                    />
                  )}
                </Col>
              </Row>
              <Form.Item
                name="peers"
                rules={
                  isPeerGroupCreate
                    ? [
                        {
                          min: 5,
                          type: 'array',
                          message: 'At least 5 CDFIs must be selected',
                        },
                      ]
                    : [
                        {
                          min: 1,
                          type: 'array',
                          message: 'At least 1 CDFI must be selected',
                        },
                      ]
                }
              >
                <Table
                  className={`${stepState === 1 ? '' : styles.hide}`}
                  columns={createPeerGroupCdfiListColumns(
                    isOnlyFactSheetSubscription,
                    isAnonymous,
                    showRatings,
                    analystUser,
                  )}
                  dataSource={selectedCdfis}
                  pagination={false}
                />
              </Form.Item>

              <Table
                className={`${styles.tableWithChecks} ${
                  stepState === 1 ? styles.hide : ''
                }`}
                rowKey="id"
                rowSelection={
                  createPeerOrPortfolio
                    ? {
                        type: 'checkbox',
                        ...rowSelection,
                        preserveSelectedRowKeys: true,
                      }
                    : undefined
                }
                loading={loadingCdfiList}
                columns={
                  createPeerOrPortfolio
                    ? createPeerGroupCdfiListColumns(
                        isOnlyFactSheetSubscription,
                        isAnonymous,
                        showRatings,
                        analystUser,
                      )
                    : cdfiSelectorListColumns(
                        subscriberUser,
                        analystUser,
                        subscriptionTypeAll,
                        isOnlyFactSheetSubscription,
                        isAnonymous,
                        showRatings,
                        showModal,
                        cdfiIds,
                      )
                }
                dataSource={filteredData || toJS(cdfis)}
              />
              <AddToAccountModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onConfirm={handleModalConfirm}
                products={modalData}
              />
            </Col>
          </Row>
        </PageSectionWrapper>
      </ContentLimiter>
    </Form>
  );
});
