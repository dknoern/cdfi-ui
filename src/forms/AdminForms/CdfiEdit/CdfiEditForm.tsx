import React, { FC, useState, useEffect } from 'react';
import {
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Button,
  Divider,
  message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Cdfi, OrgTag, VoidFn, State, ImpactArea, SubImpactArea } from 'types';
import { required, minLength } from 'tools/formRules';
import { cdfiFieldsRules } from 'constants/forms';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_GUTTER,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_TWO_THIRDS_ROW_SPAN,
} from 'constants/ui';
import { FormLabelWithIcon, PhoneInput } from 'components';
import styles from './CdfiForm.module.scss';
import { FormInstance } from 'antd/es/form';
import { Contacts } from 'forms/shared';
import { EditableCdfi } from './types';
import { UploadImageForm } from './UploadImageForm';
import { uploadLogoFile } from 'tools/uploadLogoFile';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { useCdfiStaticData } from 'dataManagement/useCdfiStaticData';

import {
  useOrganizationTypes,
  useLendingTypes,
  useTargetBeneficiaries,
  useAreasServed,
  useImpactAreas,
  useSubImpactAreas,
} from 'dataManagement/usePlatformSettings';
import { CancelConfirmModal } from 'modals';

const { TextArea } = Input;

type CdfiEditProps = {
  form: FormInstance;
  onFinish: VoidFn;
  onCancel: VoidFn;
  isEditForm: boolean;
  initialValues: (EditableCdfi & { id?: Cdfi['id'] }) | undefined;
};

const sortTagsArray = (a: OrgTag, b: OrgTag) => {
  let aCategory = a.name.toLowerCase();
  let bCategory = b.name.toLowerCase();
  let aName = a.name.toLowerCase();
  let bName = b.name.toLowerCase();

  if (aCategory !== bCategory) {
    if (aCategory < bCategory) {
      return -1;
    }
    if (aCategory > bCategory) {
      return 1;
    }
    return 0;
  } else {
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  }
};

export const CdfiEditForm: FC<CdfiEditProps> = ({
  onFinish,
  form,
  onCancel,
  isEditForm,
  initialValues,
}) => {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [oneFileDropped, setOneFileDropped] = useState(false);
  const [isCancelCreateCDFI, setIsCancelCreateCDFI] = useState(false);
  const staticData = useCdfiStaticData();

  const { data: orgTypes } = useOrganizationTypes();
  const { data: lendingTypes } = useLendingTypes();
  const { data: targetBeneficiaries } = useTargetBeneficiaries();
  const { data: areasServed } = useAreasServed();
  const { data: impactAreasData } = useImpactAreas();
  const { data: subImpactAreasData } = useSubImpactAreas()

  staticData?.tags.sort(sortTagsArray); //TODO: tags needs to be switched over to newer tags endpoint

  if (isEditForm && initialValues && initialValues.tags) {
    initialValues.tags = initialValues.tags.map((tag) => {
      if (typeof tag === 'string') {
        return tag;
      } else {
        return tag?.id;
      }
    }) as unknown as OrgTag[];
  }

  const transformStates = (states: State[]): State[] => {
    let newStates: any[] = [];
    if (states) {
      newStates = states.map((area) => {
        if (staticData?.states) {
          for (let i = 0; i < staticData?.states.length; ++i) {
            if (area) {
              if (typeof area === 'string') {
                if (staticData?.states[i]?.code === area) {
                  return staticData.states[i];
                }
              } else {
                if (staticData?.states[i]?.code === area?.code) {
                  return staticData.states[i];
                }
              }
            }
          }
        }
      });
    }
    return newStates as unknown as State[];
  };

  const transformState = (stateCode: string): State => {
    let newState;
    if (stateCode) {
      if (staticData?.states) {
        for (let i = 0; i < staticData?.states.length; ++i) {
          if (staticData?.states[i]?.code === stateCode) {
            newState = staticData.states[i];
          }
        }
      }
    }
    return newState as unknown as State;
  };

  const transformImpactArea = (
    impactAreas: any[],
    returnName: boolean,
  ): string[] => {
    let newImpactAreas: any[] = [];
    if (impactAreas) {
      newImpactAreas = impactAreas.map((area) => {
        if (impactAreasData?.impactAreas) {
          for (let i = 0; i < impactAreasData?.impactAreas.length; ++i) {
            if (area) {
              if (typeof area === 'string') {
                if (impactAreasData?.impactAreas[i]?.name === area) {
                  return impactAreasData.impactAreas[i].id;
                }
              } else {
                if (impactAreasData?.impactAreas[i]?.name === area?.name) {
                  return impactAreasData.impactAreas[i].id;
                }
              }
            }
          }
        }
      });
    }
    return newImpactAreas as unknown as string[];
  };

  const transformSubImpactArea = (subImpactAreas: any[]): string[] => {
    let newSubImpactAreas: any[] = [];
    if (subImpactAreas) {
      newSubImpactAreas = subImpactAreas.map((area) => {
        if (subImpactAreasData?.subImpactAreas) {
          for (let i = 0; i < subImpactAreasData?.subImpactAreas.length; ++i) {
            if (area) {
              if (typeof area === 'string') {
                if (subImpactAreasData?.subImpactAreas[i]?.name === area) {
                  return subImpactAreasData.subImpactAreas[i].id;
                }
              } else {
                if (subImpactAreasData?.subImpactAreas[i]?.name === area?.name) {
                  return subImpactAreasData.subImpactAreas[i].id;
                }
              }
            }
          }
        }
      });
    }
    return newSubImpactAreas as unknown as string[];
  };

  const filterStaticDataLendingTypes = (names: string[]) =>
    lendingTypes?.lendingTypes.filter((item) => names.includes(item.name));

  const filterStaticDataTaxBeneficiaries = (names: string[]) =>
    targetBeneficiaries?.taxBeneficiaries.filter((item) =>
      names.includes(item.name),
    );

  const filterStaticDataOrganizationTypes = (names: string) =>
    orgTypes?.organizationTypes.filter((item) => names.includes(item.name));

  const getIds = (list: any[] | undefined) => list?.map((i) => i.id);

  useEffect(() => {
    if (
      isEditForm &&
      initialValues &&
      initialValues.areasServed &&
      staticData
    ) {
      const newAreasServed = transformStates(initialValues.areasServed);
      form.setFieldsValue({
        areasServed: newAreasServed.map((area) => area.id),
      });

      initialValues.areasServed = newAreasServed.map(
        (area) => area.id,
      ) as unknown as State[];
    }
  }, [initialValues, isEditForm, staticData]);

  useEffect(() => {
    if (isEditForm && initialValues && initialValues.state && staticData) {
      const newState = transformState(initialValues.state);
      form.setFieldsValue({
        state: newState?.id,
      });

      initialValues.state = newState?.id as unknown as string;
    }
  }, [initialValues, isEditForm, staticData]);

  useEffect(() => {
    if (
      isEditForm &&
      initialValues &&
      initialValues.impactAreas &&
      staticData
    ) {
      const newImpactAreas = transformImpactArea(
        initialValues.impactAreas,
        false,
      );
      form.setFieldsValue({
        impactAreas: newImpactAreas,
      });

      initialValues.impactAreas = newImpactAreas;
    }
  }, [initialValues, isEditForm, staticData]);

  useEffect(() => {
    if (initialValues?.primaryLendingTypes && staticData && isEditForm) {
      form.setFieldsValue({
        primaryLendingTypes: getIds(
          filterStaticDataLendingTypes(initialValues?.primaryLendingTypes),
        ),
      });
    }
  }, [initialValues, staticData, isEditForm]);
  useEffect(() => {
    if (initialValues?.organizationType && staticData && isEditForm) {
      const test = getIds(
        filterStaticDataOrganizationTypes(initialValues.organizationType),
      );
      form.setFieldsValue({
        organizationType: test ? test[0] : '',
      });
    }
  }, [initialValues, staticData, isEditForm]);

  useEffect(() => {
    if (initialValues?.otherLendingTypes && staticData && isEditForm) {
      form.setFieldsValue({
        otherLendingTypes: getIds(
          filterStaticDataLendingTypes(initialValues.otherLendingTypes),
        ),
      });
    }
  }, [initialValues, staticData, isEditForm]);

  useEffect(() => {
    if (initialValues?.targetBeneficiaries && staticData && isEditForm) {
      form.setFieldsValue({
        targetBeneficiaries: getIds(
          filterStaticDataTaxBeneficiaries(initialValues.targetBeneficiaries),
        ),
      });
    }
  }, [initialValues, staticData, isEditForm]);

  useEffect(() => {
    if (
      isEditForm &&
      initialValues &&
      initialValues.subImpactAreas &&
      staticData
    ) {
      const newSubImpactAreas = transformSubImpactArea(
        initialValues.subImpactAreas,
      );
      form.setFieldsValue({
        subImpactAreas: newSubImpactAreas,
      });

      initialValues.subImpactAreas = newSubImpactAreas;
    }
  }, [initialValues, isEditForm, staticData]);

  const makeSubImpactAreasOptions = (): SubImpactArea[] => {
    const areaIdSet = new Set();
    subImpactAreasData?.subImpactAreas.forEach((area) =>
      areaIdSet.add(area.impactArea),
    );
    let result: SubImpactArea[] = [];
    Array.from(areaIdSet).map((num: any) => {
      let subAreas: SubImpactArea[] = [];
      subImpactAreasData?.subImpactAreas.map((area) => {
        if (num === area.impactArea) {
          result.push(area);
        }
      });
    });
    return result;
  };

  const subImpactAreasOptions = makeSubImpactAreasOptions();

  const handleLogoUpload = (values: UploadChangeParam) => {
    const fileName = values.fileList[0].name;
    if (fileName.includes('.jpeg')) {
      message.error('Cannot accept .jpeg, can you use .jpg extention instead?');
      setShowUploadPopup(false);
      return;
    }
    const id = initialValues?.id ? `${initialValues?.id}` : undefined;
    uploadLogoFile(id, values);
    setShowUploadPopup(false);
  };

  const getSubImpactAreaOptions = (
    selectedImpactAreas?: string[],
  ): SubImpactArea[] => {
    let subAreasOptions = selectedImpactAreas
      ?.map((impactArea: any) => {
        const area = impactAreasData?.impactAreas.find(
          (area) => area.name === impactArea,
        );
        if (area) {
          return subImpactAreasOptions.filter((subArea) => {
            return subArea.impactArea === area.id;
          });
        }
      })
      .flatMap((subArea) => (!subArea ? [] : subArea));

    if (subAreasOptions) {
      return subAreasOptions as unknown as SubImpactArea[];
    }
    return [];
  };

  const getSubImpactAreaOptionsNames = (
    selectedImpactAreas?: string[],
  ): SubImpactArea[] => {
    let subAreasOptions = selectedImpactAreas
      ?.map((impactArea: any) => {
        const area = impactAreasData?.impactAreas.find(
          (area) => area.id === impactArea,
        );
        if (area) {
          return subImpactAreasOptions.filter((subArea) => {
            return subArea.impactArea === area.id;
          });
        }
      })
      .flatMap((subArea) => (!subArea ? [] : subArea));
    if (subAreasOptions) {
      return subAreasOptions as unknown as SubImpactArea[];
    }
    return [];
  };

  const [impactAreas, setImpactAreas] = useState<string[] | undefined>( // options for dropdown - impact areas
    impactAreasData?.impactAreas.map((area) => area.name),
  );
  const [selectedImpactAreasNames, setSelectedImpactAreasNames] = useState<
    ImpactArea[]
  >(
    initialValues ? (initialValues.impactAreas as unknown as ImpactArea[]) : [],
  );

  const [subImpactAreas, setSubImpactAreas] = useState<SubImpactArea[]>(
    getSubImpactAreaOptions(selectedImpactAreasNames as unknown as string[]),
  ); // options for dropdown - sub-impact areas
  const [selectedSubImpactAreas, setSelectedSubImpactAreas] = useState<
    string[]
  >(initialValues ? (initialValues.subImpactAreas as unknown as string[]) : []);

  useEffect(() => {
    setSubImpactAreas(
      getSubImpactAreaOptions(selectedImpactAreasNames as unknown as string[]),
    );
  }, [staticData, isEditForm, initialValues]);

  const onImpactAreaChange = (selectedAreas: any[]) => {
    setSubImpactAreas(getSubImpactAreaOptionsNames(selectedAreas)); // sub-impact area options for dropdown
    if (typeof selectedSubImpactAreas[0] === 'string') {
      const subAreasIds = subImpactAreasData?.subImpactAreas
        .filter((item) => {
          return selectedAreas.includes(item.impactArea);
        })
        .map((i) => i.id)
        .filter((item: any) => initialValues?.subImpactAreas?.includes(item));
      form.setFieldsValue({ subImpactAreas: subAreasIds });
    } else {
      const filteredSelectedSubImpactAreas = selectedSubImpactAreas.filter(
        (item) =>
        subImpactAreasData?.subImpactAreas
            .filter((item) => selectedAreas.includes(item.impactArea))
            .map((i) => i.id)
            .includes(parseFloat(item)),
      );
      setSelectedSubImpactAreas(filteredSelectedSubImpactAreas);
      form.setFieldsValue({ subImpactAreas: filteredSelectedSubImpactAreas });
    }
  };

  const hasImpactAreaParent = (
    impactAreas: string[],
    subImpactArea: string,
  ): boolean => {
    const impactAreaId = subImpactAreasOptions.find(
      (sub) => sub.name === subImpactArea,
    )?.impactArea;
    return impactAreas?.some(
      (impactArea) => impactAreaId === getImpactAreaId(impactArea),
    );
  };

  const getImpactAreaId = (impactArea: string): number | undefined => {
    return impactAreasData?.impactAreas.find((area) => area.name === impactArea)
      ?.id;
  };

  const onSubImpactAreaChange = (selectedSubAreas: string[]): void => {
    setSelectedSubImpactAreas(selectedSubAreas);
  };

  let sectionNumberCounter = 1;

  return (
    <Row>
      <Col span={GRID_COL_HALF_ROW_SPAN}>
        <Form
          id="CdfiEdit"
          onFinish={onFinish}
          layout="vertical"
          hideRequiredMark
          className={styles.form}
          form={form}
          initialValues={initialValues}
        >
          <h1>{sectionNumberCounter++}. Organization Setup</h1>
          <br />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name="name"
                rules={[required()]}
                label={
                  <FormLabelWithIcon
                    description="Type the organization's name here"
                    text="Organization Name"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <Input placeholder="Enter organization name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name="address"
                label={
                  <FormLabelWithIcon
                    description="Type address here"
                    text="Address"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item name="address2" label="Optional">
                <Input placeholder="Suite #, Floor, etc." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item name="city">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_QUARTER_ROW_SPAN}>
              <Form.Item name="state">
                <Select
                  placeholder="State"
                  options={staticData?.states.map((state) => ({
                    value: state.id,
                    label: state.name,
                  }))}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_QUARTER_ROW_SPAN}>
              <Form.Item name="zip">
                <Input placeholder="Zip Code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="phone"
                rules={cdfiFieldsRules.phone}
                label={
                  <FormLabelWithIcon
                    description="Type user's phone here"
                    text="Phone Number"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <PhoneInput placeholder="Enter phone" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN / 3}>
              <Form.Item
                name="phoneExtension"
                label="Extension"
                rules={cdfiFieldsRules.phoneExtension}
              >
                <Input placeholder="Ext #" size="large" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="fax"
                rules={cdfiFieldsRules.phone}
                label={
                  <FormLabelWithIcon
                    description="Type user's fax # here"
                    text="Fax Number"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <PhoneInput placeholder="Enter fax" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item name="website" label="Corporate Site URL">
                <Input placeholder="https:// " />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col
              span={
                isEditForm ? GRID_COL_QUARTER_ROW_SPAN : GRID_COL_THIRD_ROW_SPAN
              }
            >
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>Account Active</Checkbox>
              </Form.Item>
            </Col>
            <Col
              span={
                isEditForm ? GRID_COL_QUARTER_ROW_SPAN : GRID_COL_THIRD_ROW_SPAN
              }
            >
              <Form.Item name="hideActivity" valuePropName="checked">
                <Checkbox>Hide Activity</Checkbox>
              </Form.Item>
            </Col>
            <Col
              span={
                isEditForm ? GRID_COL_QUARTER_ROW_SPAN : GRID_COL_THIRD_ROW_SPAN
              }
            >
              <Form.Item name="reportAllRows" valuePropName="checked">
                <Checkbox>All Report Rows</Checkbox>
              </Form.Item>
            </Col>
            {isEditForm && (
              <Col span={GRID_COL_QUARTER_ROW_SPAN}>
                <Button
                  className={styles.uploadBtn}
                  onClick={() => {
                    setShowUploadPopup(true);
                    setOneFileDropped(false);
                  }}
                >
                  Upload CDFI Logo
                </Button>
              </Col>
            )}
          </Row>
          {!isEditForm && (
            <>
              <Divider />
              <h1>{sectionNumberCounter++}. Organization Contacts </h1>
              <br />
              <Row gutter={[GRID_GUTTER, 0]}>
                <Col span={GRID_COL_FULL_ROW_SPAN}>
                  <Form.Item
                    name="contacts"
                    rules={[required('array'), minLength(1, 'array')]}
                  >
                    <Contacts isCreateView />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Divider />

              <h1>
                {sectionNumberCounter++}. Organization Ratings and Tax Details
              </h1>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
              <Form.Item name="rated" valuePropName="checked">
                <Checkbox>Is the Organization Rated?</Checkbox>
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="reporting" valuePropName="checked">
                <Checkbox>Is the Organization Reporting?</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="taxType" label="Tax Type" rules={[required()]}>
                <Select
                  placeholder="Tax Type"
                  options={staticData?.taxTypes.map((taxType) => ({
                    value: taxType.name,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="taxJurisdiction"
                label="Tax Jurisdiction"
                rules={[required()]}
              >
                <Select
                  placeholder="Tax Jurisdiction"
                  options={staticData?.taxJurisdictions.map(
                    (taxJurisdiction) => ({
                      value: taxJurisdiction.name,
                    }),
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="shareFinancials"
                label="Share Financials"
                rules={[required()]}
              >
                <Select
                  placeholder="Share One"
                  options={staticData?.shareFinancials.map((financials) => ({
                    value: financials.name,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="ein" label="EIN">
                <Input placeholder="Enter EIN Number" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="fiscalYearEnd"
                label="Fiscal Year End (FYE)"
                rules={[required()]}
              >
                <Select
                  placeholder="Select Year"
                  options={staticData?.fiscalYearEnds.map((fye) => ({
                    value: fye.name,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="peerGroupAllowed" valuePropName="checked">
                <Checkbox>Allow in Peer Group</Checkbox>
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="suppressReminders" valuePropName="checked">
                <Checkbox>Suppress Reminders</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          <h1>{sectionNumberCounter++}. Organization Characteristics</h1>
          <br />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Form.Item name="mission" label="Mission">
                <TextArea placeholder="Enter Mission" showCount maxLength={500}>
                  Mission
                </TextArea>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Form.Item name="description" label="Description">
                <TextArea
                  placeholder="Enter Description"
                  showCount
                  maxLength={1000}
                >
                  Description
                </TextArea>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="areasServed" label="Areas Served">
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Areas"
                  options={areasServed?.states.map((state) => ({
                    value: state.id,
                    label: state.name,
                    disabled: !state.isEnabled,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="impactAreas" label="Impact Areas">
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Areas"
                  value={selectedImpactAreasNames.map((area) => area?.name)}
                  options={impactAreasData?.impactAreas.map((area) => ({
                    value: area.id,
                    label: area.name,
                    disabled: !area.isEnabled,
                  }))}
                  onChange={onImpactAreaChange}
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="subImpactAreas" label="Sub-Impact Areas">
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Areas"
                  onChange={onSubImpactAreaChange}
                  value={selectedSubImpactAreas}
                  options={subImpactAreas.map((area) => ({
                    value: area.id,
                    label: area.name,
                    disabled: !area.isEnabled,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="targetBeneficiaries" label="Target Beneficiary">
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Beneficiaries"
                  options={targetBeneficiaries?.taxBeneficiaries.map(
                    (beneficiary) => ({
                      value: beneficiary.id,
                      label: beneficiary.name,
                      disabled: !beneficiary.isEnabled,
                    }),
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="primaryLendingTypes"
                label="Primary Lending Types"
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Type"
                  options={lendingTypes?.lendingTypes.map((lendingType) => ({
                    value: lendingType.id,
                    label: lendingType.name,
                    disabled: !lendingType.isEnabled,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="otherLendingTypes" label="Other Lending">
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Type"
                  options={lendingTypes?.lendingTypes.map((lendingType) => ({
                    value: lendingType.id,
                    label: lendingType.name,
                    disabled: !lendingType.isEnabled,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="organizationType" label="Organization Type">
                <Select
                  placeholder="Select Type"
                  options={orgTypes?.organizationTypes.map((orgType) => ({
                    value: orgType.id,
                    label: orgType.name,
                    disabled: !orgType.isEnabled,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="startRequestingYear"
                label="Start Requesting Year"
                rules={[required()]}
              >
                <Select
                  placeholder="Select Year"
                  options={staticData?.startRequestingYears.map((year) => ({
                    value: year.year,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="startRequestingQuarter"
                label="Start Requesting Quarter"
                rules={[required()]}
              >
                <Select
                  placeholder="Select Quarter"
                  options={staticData?.startRequestingQuarters.map(
                    (quarter) => ({
                      value: quarter.quarter,
                    }),
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="emailReminders" valuePropName="checked">
                <Checkbox>Enable Email Reminders</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <h1>{sectionNumberCounter++}. Relevant Tags</h1>
          <br />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              These will be used to help categorize your new investment and
              compare them to other investments with similar tags.
              <Form.Item name="tags">
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select Tags"
                  options={staticData?.tags.map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Form.Item>
                <div  className={styles.wrapperButtons}>
                  <Button
                    key="cancelBtn"
                    htmlType="reset"
                    type="default"
                    onClick={isEditForm ? onCancel : () => setIsCancelCreateCDFI(true)}
                    className={styles.cancelBtn}
                  >
                    {'Cancel'}
                  </Button>
                  <Button
                    key="createBtn"
                    htmlType="submit"
                    type="primary"
                    className={styles.actionBtn}
                  >
                    {isEditForm ? 'Update CDFI' : 'Create CDFI'}
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <CancelConfirmModal
        visible={isCancelCreateCDFI}
        onClose={() => (setIsCancelCreateCDFI(false))}
      />
      <UploadImageForm
        oneFileDropped={oneFileDropped}
        showUploadPopup={showUploadPopup}
        setOneFileDropped={setOneFileDropped}
        setShowUploadPopup={setShowUploadPopup}
        handleLogoUpload={handleLogoUpload}
      />
    </Row>
  );
};
