import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { aerisExplorerPeerGroupStore } from 'store';
import {
  extractId,
  getBaseEntityFormState,
  getCompareCdfisFormState,
  getComparePortfolioSegmentFormState,
} from './createComparisonViewHelpers';
import {
  Modal,
  Row,
  Col,
  Button,
  Steps,
  Popconfirm,
  Form,
  Input,
  Typography,
} from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { FormContentLayout } from './components/FormContentLayout/FormContentLayout';
import { FormSelect } from './components/FormSelect/FormSelect';
import { CompareSelectionsView } from './components/CompareSelectionsView/CompareSelectionsView';
import { BaseSelectionsView } from './components/BaseSelectionsView/BaseSelectionsView';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import {
  GroupType,
  Comparison,
  PeerPortfolioPermissions,
  ComparisonName,
} from 'types/peerGroups';
import styles from './CreateComparisonView.module.scss';
import { Cdfi } from 'types';
import { notifyUser } from 'tools';
import { handleServerFormError } from 'tools/formTools';
import { useDebouncedCallback } from 'use-debounce';
import TextArea from 'antd/lib/input/TextArea';

type DefaultFormState = {
  name: string | undefined;
  comparePeerGroupId: string | undefined;
  compareCdfis: string | undefined;
  portfoliosAgainst: string | undefined;
  peerGroupsAgainst: string | undefined;
  description: string;
};

type CreateComparisonViewProps = {
  isVisible: boolean;
  onCancel: () => void;
  comparisonData?: Partial<Comparison>;
  subscriberId: number | undefined;
  cdfiId: number | undefined;
};

const { Step } = Steps;

export const CreateComparisonView = observer(
  ({
    isVisible,
    onCancel,
    comparisonData = undefined,
    subscriberId,
    cdfiId,
  }: CreateComparisonViewProps) => {
    const history = useHistory();
    const { url: currentUrl } = useRouteMatch();
    const companyId = subscriberId || cdfiId || undefined;
    const defaultFormState: DefaultFormState = {
      name: undefined,
      comparePeerGroupId: undefined,
      compareCdfis: undefined,
      portfoliosAgainst: undefined,
      peerGroupsAgainst: undefined,
      description: '',
    };

    const defaultFormInitialValues: Partial<Comparison> = {
      name: undefined,
      comparePeerGroupId: undefined,
      compareCdfis: undefined,
      basePeerGroupId: undefined,
      description: '',
    };

    const emptyErrorMessages = {
      name: '',
      base: '',
      compare: '',
    };

    const {
      peerGroupsAndPortfolioSegments,
      createComparison,
      updateComparison,
      cdfis,
      getCdfis,
      getComparisons,
      getComparison,
      getPeerGroupsGlobalOptions,
      checkComparisonName,
    } = aerisExplorerPeerGroupStore;
    const [form] = Form.useForm();
    const [stepState, setStepState] = useState(0);
    const [formState, setFormState] = useState(defaultFormState);
    const [formInitialValues, setFormInitialValues] = useState(
      defaultFormInitialValues,
    );
    const [allPeerGroups, setAllPeerGroups] = useState<
      PeerPortfolioPermissions[]
    >([]);
    const [errorMessage, setErrorMessage] = useState(emptyErrorMessages);
    const [loadingCdfis, setLoadingCdfis] = useState(false);
    const [loadingGlobalPeerGroups, setLoadingGlobalPeerGroups] =
      useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);

    const portfolioSegments = useMemo(
      () =>
        toJS(peerGroupsAndPortfolioSegments)?.filter(
          ({ data }) => data.groupType === GroupType.PORTFOLIO_SEGMENT,
        ),
      [peerGroupsAndPortfolioSegments],
    );

    const portfolioSegmentOptions = useMemo(
      () =>
        portfolioSegments?.map(({ data: segment }) => ({
          label: segment.name,
          value: JSON.stringify({
            name: segment.name,
            id: segment.id,
          }),
        })),
      [portfolioSegments],
    );

    const peerGroupOptions = useMemo(
      () =>
        allPeerGroups
          ?.filter(({ data }) => data.groupType === GroupType.PEER_GROUP)
          .map(({ data: group }) => ({
            label: group.name,
            value: JSON.stringify({
              name: group.name,
              id: group.id,
            }),
          })),
      [allPeerGroups],
    );

    const cdfiOptions = useMemo(
      () =>
        toJS(cdfis)?.map((cdfi) => ({
          label: cdfi.name,
          value: JSON.stringify({
            name: cdfi.name,
            id: cdfi.id,
          }),
        })),
      [cdfis],
    );

    const handleSteps = (buttonId: string): void => {
      switch (buttonId) {
        case 'next':
          if (
            !formState.comparePeerGroupId ||
            !formState.compareCdfis ||
            !formState.peerGroupsAgainst ||
            !formState.portfoliosAgainst
          ) {
            if (
              (formState.comparePeerGroupId || formState.compareCdfis) &&
              stepState === 0
            ) {
              setStepState(stepState + 1);
              return;
            }

            if (
              (formState.peerGroupsAgainst || formState.portfoliosAgainst) &&
              stepState === 1
            ) {
              setStepState(stepState + 1);
              return;
            }

            setErrorMessage(
              stepState === 0
                ? {
                    ...errorMessage,
                    compare: 'Please make a selection to compare',
                  }
                : {
                    ...errorMessage,
                    base: 'Please make a selection to compare against',
                  },
            );
            return;
          }

          setStepState(stepState !== 2 ? stepState + 1 : 2);
          break;
        case 'back':
          if (stepState === 0) return;
          setStepState(stepState - 1);
          break;
        default:
          break;
      }
    };

    const handleDescriptionInputChange = (
      key: string,
      selectValue: string,
    ): void => {
      setErrorMessage(emptyErrorMessages);

      setFormState({
        ...formState,
        [key]: selectValue,
      });
      form.setFieldsValue({
        [key]: selectValue,
      });
    };

    const handleNameInputChange = (key: string, selectValue: string): void => {
      setErrorMessage(emptyErrorMessages);

      setFormState({
        ...formState,
        [key]: selectValue,
      });
      form.setFieldsValue({
        [key]: selectValue,
      });
      checkName(selectValue, comparisonData?.id ?? null);
      handleNameValidation(selectValue);
    };

    const handleCompareSelectChange = (
      key: string,
      selectValue: string | string[],
      resetFields?: Partial<DefaultFormState>,
    ): void => {
      setErrorMessage(emptyErrorMessages);
      setFormState({
        ...formState,
        ...resetFields,
        [key]: selectValue,
      });

      if (key === 'comparePortfolioSegmentCdfis') {
        form.setFieldsValue({
          ...resetFields,
          compareCdfis: Array.isArray(selectValue)
            ? selectValue.map((val) => extractId(val))
            : extractId(selectValue),
        });
      } else {
        const value =
          key === 'comparePeerGroupId'
            ? extractId(selectValue as string)
            : [extractId(selectValue as string)];
        form.setFieldsValue({
          ...resetFields,
          [key]: Array.isArray(selectValue)
            ? selectValue.map((val) => extractId(val))
            : value,
        });
      }
    };

    const handleBaseSelectChange = (
      key: string,
      selectValue: string | string[],
      resetFields: Partial<DefaultFormState>,
    ): void => {
      setErrorMessage(emptyErrorMessages);
      setFormState({
        ...formState,
        ...resetFields,
        [key]: selectValue,
      });

      form.setFieldsValue({
        basePeerGroupId: extractId(selectValue as string),
      });
    };

    const handleDescriptionValidation = (description: string) => {
      if (description?.length > 255) {
        form.setFields([
          {
            name: 'description',
            errors: ['This description can not be longer than 255 characters.'],
          },
        ]);
      }
    };

    const handleNameValidation = (name: string) => {
      if (!name || name?.length < 2 || name?.length > 50) {
        let message = '';

        if (name?.length < 2 && name?.length !== 0) {
          message = 'Title must be at least 2 characters.';
        }

        if (!name) {
          message = 'This field is required.';
        }

        if (name?.length > 50) {
          message = 'Title must be less than 50 characters.';
        }

        form.setFields([
          {
            name: 'name',
            errors: [message],
          },
        ]);
      }
    };

    const checkName = useCallback(
      useDebouncedCallback(async (name: string, id: number | null) => {
        if (name) {
          const payload: ComparisonName = id ? { id, name } : { name };
          const response = await checkComparisonName(payload);
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

    const onSubmit = (saveAndView: boolean) => {
      setIsSaving(true);
      const payload = form.getFieldsValue();
      payload.company = { id: companyId };

      if (
        !payload.name ||
        payload.name.length < 2 ||
        payload.name.length > 50
      ) {
        handleNameValidation(payload.name);
        setIsSaving(false);
        return;
      }

      if (payload.description.length > 255) {
        handleDescriptionValidation(payload.description);
        return;
      }

      if (comparisonData) {
        updateComparison({ ...payload, id: comparisonData.id })
          .then(() => {
            notifyUser.ok('aerisExplorer', 'updateComparisonOk');
            if (saveAndView) {
              getComparison(comparisonData.id as number).then(() =>
                history.push(`/comparison-view-page/${comparisonData.id}`),
              );
            } else if (currentUrl.includes('comparison-view-page')) {
              history.goBack();
            } else {
              history.push(currentUrl);
            }
            getComparisons(comparisonData.company?.id);
            onCancel();
          })
          .catch(
            handleServerFormError({
              form,
              category: 'common',
              message: 'Update comparison failed.',
            }),
          )
          .finally(() => {
            setIsSaving(false);
          });
      } else {
        createComparison(payload)
          .then((res) => {
            notifyUser.ok('aerisExplorer', 'createComparisonOk');
            if (saveAndView) {
              history.push(`/comparison-view-page/${res.id}`);
            } else if (currentUrl.includes('comparison-view-page')) {
              history.goBack();
            } else {
              history.push(currentUrl);
            }
            getComparisons(payload.company.id);
            onCancel();
          })
          .catch(
            handleServerFormError({
              form,
              category: 'common',
              message: 'Create comparison failed.',
            }),
          )
          .finally(() => {
            setIsSaving(false);
          });
      }
    };

    useEffect(() => {
      if (comparisonData) {
        const {
          name,
          compareCdfis,
          comparePeerGroupId,
          basePeerGroupId,
          description,
        } = comparisonData;

        const baseEntity = allPeerGroups?.find(
          ({ data }) => data.id === basePeerGroupId,
        )?.data;

        const comparePortfolioSegment = peerGroupsAndPortfolioSegments?.find(
          ({ data }) => data.id === comparePeerGroupId,
        )?.data;

        const selectedCdfis = getCompareCdfisFormState(
          (cdfis as Cdfi[]) || [],
          compareCdfis as number[],
        );

        const newFormState = {
          ...defaultFormState,
          name,
          description,
          ...selectedCdfis,
          ...(comparePortfolioSegment
            ? getComparePortfolioSegmentFormState(comparePortfolioSegment)
            : {}),
          ...getBaseEntityFormState(baseEntity),
        };

        setFormState(newFormState as DefaultFormState);

        setFormInitialValues({
          name,
          basePeerGroupId,
          compareCdfis,
          comparePeerGroupId,
          description,
        });

        form.setFieldsValue({
          name,
          basePeerGroupId,
          compareCdfis,
          comparePeerGroupId,
          description,
        });
      }
    }, [
      comparisonData,
      peerGroupsAndPortfolioSegments,
      isVisible,
      cdfis,
      allPeerGroups,
      defaultFormState,
      form,
    ]);

    useEffect(() => {
      if (!cdfis && isVisible) {
        setLoadingCdfis(true);
        getCdfis().then(() => setLoadingCdfis(false));
      }
    }, [cdfis, getCdfis, isVisible]);

    useEffect(() => {
      if (isVisible) {
        setLoadingGlobalPeerGroups(true);
        getPeerGroupsGlobalOptions(cdfiId, subscriberId).then((data) => {
          setLoadingGlobalPeerGroups(false);
          setAllPeerGroups(data);
        });
      }
    }, [cdfiId, subscriberId, isVisible, getPeerGroupsGlobalOptions]);

    return (
      <Modal
        title={
          <div>
            <h2 className={styles.title}>CDFI Explorer</h2>
            <h3 className={`${styles.title} ${styles.subTitle}`}>
              Create Comparison
            </h3>
          </div>
        }
        visible={isVisible}
        onCancel={onCancel}
        afterClose={() => {
          setStepState(0);
          setFormState(defaultFormState);
          form.resetFields();
          setErrorMessage(emptyErrorMessages);
          setFormInitialValues(defaultFormInitialValues);
        }}
        closable={false}
        maskClosable={false}
        footer={false}
        centered
        width="75%"
        className={styles.modal}
      >
        <Form form={form} initialValues={formInitialValues} onFinish={onSubmit}>
          <Row gutter={GRID_GUTTER} className={styles.steps}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Steps size="small" current={stepState}>
                <Step
                  title="Select to compare"
                  description={
                    <span className={styles.hintText}>
                      Select CDFIs or a Portfolio Segment
                    </span>
                  }
                />
                <Step
                  title="Select to compare against"
                  description={
                    <span className={styles.hintText}>
                      Select the Peer Group
                    </span>
                  }
                />
                <Step
                  title="Save and View"
                  description={
                    <span className={styles.hintText}>
                      Add a title, optional description and save.
                    </span>
                  }
                />
              </Steps>
            </Col>
          </Row>
          <Row gutter={GRID_GUTTER}>
            <Col span={GRID_COL_FULL_ROW_SPAN} className={styles.buttonNav}>
              <Popconfirm
                title="Data will be lost.  Continue to close form?"
                onConfirm={onCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button className={styles.cancelButton}>Cancel</Button>
              </Popconfirm>
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
              {stepState === 2 ? (
                <>
                  <Button
                    className={styles.saveOnlyButton}
                    onClick={() => onSubmit(false)}
                    disabled={stepState !== 2 || isSaving || !isNameValid}
                  >
                    Save
                  </Button>
                  <Button
                    className={styles.saveButton}
                    onClick={() => onSubmit(true)}
                    disabled={stepState !== 2 || isSaving || !isNameValid}
                  >
                    Save & View
                  </Button>
                </>
              ) : (
                <Button
                  id="next"
                  className={styles.nextButton}
                  icon={<CaretRightOutlined />}
                  onClick={(e) => handleSteps(e.currentTarget.id)}
                >
                  Next
                </Button>
              )}
            </Col>
          </Row>
          <Row
            className={styles.formContent}
            style={{ display: stepState !== 0 ? 'none' : 'flex' }}
          >
            <FormContentLayout
              leftContentLoading={loadingCdfis}
              leftContent={
                <>
                  <FormSelect
                    identifier="comparePeerGroupId"
                    label={
                      <>
                        <div className={styles.labelContainer}>
                          <span>
                            Select a Portfolio Segment you want to compare
                          </span>{' '}
                          {errorMessage.compare && (
                            <span className={styles.errorMessage}>
                              {errorMessage.compare}
                            </span>
                          )}
                        </div>
                        <Typography.Paragraph type="secondary">
                          The median KPI or each CDFI of the portfolio segment
                          against peer group quartiles
                        </Typography.Paragraph>
                      </>
                    }
                    placeholder="Select Portfolio Segment"
                    options={portfolioSegmentOptions}
                    value={formState.comparePeerGroupId}
                    onChange={(value) => {
                      handleCompareSelectChange('comparePeerGroupId', value, {
                        compareCdfis: undefined,
                      });
                    }}
                  />

                  <div className={styles.horizontalDivider}>
                    <span className={styles.dividerText}>or</span>
                  </div>

                  <FormSelect
                    identifier="compareCdfis"
                    label={
                      <>
                        <div className={styles.labelContainer}>
                          <span>Select a single CDFI to compare</span>{' '}
                          {errorMessage.compare && (
                            <span className={styles.errorMessage}>
                              {errorMessage.compare}
                            </span>
                          )}
                        </div>
                        <Typography.Paragraph type="secondary">
                          A single CDFI’s KPI against peer group quartiles
                        </Typography.Paragraph>
                      </>
                    }
                    placeholder="Select CDFI"
                    options={cdfiOptions}
                    value={formState.compareCdfis}
                    onChange={(value) =>
                      handleCompareSelectChange('compareCdfis', value, {
                        comparePeerGroupId: undefined,
                      })
                    }
                  />
                </>
              }
            />
          </Row>
          <Row
            className={styles.formContent}
            style={{ display: stepState === 1 ? 'flex' : 'none' }}
          >
            <FormContentLayout
              leftContentLoading={loadingCdfis}
              rightContentLoading={loadingGlobalPeerGroups}
              leftContent={
                <CompareSelectionsView
                  compareCdfis={formState.compareCdfis}
                  comparePeerGroupId={formState.comparePeerGroupId}
                />
              }
              rightContent={
                <>
                  <FormSelect
                    identifier="basePeerGroupId"
                    label={
                      <div className={styles.labelContainer}>
                        <span>Select a Peer Group to compare against</span>{' '}
                        {errorMessage.base && (
                          <span className={styles.errorMessage}>
                            {errorMessage.base}
                          </span>
                        )}
                      </div>
                    }
                    placeholder="Select Peer Group"
                    options={peerGroupOptions}
                    value={formState.peerGroupsAgainst}
                    onChange={(value) =>
                      handleBaseSelectChange('peerGroupsAgainst', value, {
                        portfoliosAgainst: undefined,
                      })
                    }
                  />
                </>
              }
            />
          </Row>
          <div
            style={{
              display: stepState === 2 ? 'flex' : 'none',
              flexDirection: 'column',
            }}
          >
            <Row gutter={GRID_GUTTER}>
              <Col span={GRID_COL_HALF_ROW_SPAN}>
                <Form.Item name="name">
                  <label htmlFor="name" className={styles.label}>
                    Enter Title of Comparison
                  </label>
                  <TextArea
                    id="name"
                    placeholder="Name your comparison"
                    value={formState.name}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleNameInputChange('name', value);
                    }}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                  />
                </Form.Item>
              </Col>
              <Col span={GRID_COL_HALF_ROW_SPAN}>
                <Form.Item name="description">
                  <label htmlFor="description" className={styles.label}>
                    Enter a brief description
                  </label>
                  <Input.TextArea
                    id="description"
                    placeholder="Provide a brief description."
                    value={formState.description}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleDescriptionInputChange('description', value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={GRID_COL_FULL_ROW_SPAN}>
                {stepState === 2 && (
                  <h4 className={styles.youAreComparing}>You are comparing</h4>
                )}
              </Col>
            </Row>
            <Row className={styles.formContent}>
              <FormContentLayout
                leftContentLoading={loadingCdfis}
                leftContent={
                  <CompareSelectionsView
                    compareCdfis={formState.compareCdfis}
                    comparePeerGroupId={formState.comparePeerGroupId}
                  />
                }
                rightContent={
                  <BaseSelectionsView
                    peerGroupsAgainst={formState.peerGroupsAgainst}
                    portfoliosAgainst={formState.portfoliosAgainst}
                  />
                }
              />
            </Row>
          </div>
        </Form>
      </Modal>
    );
  },
);
