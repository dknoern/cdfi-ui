import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Col, List, Row, Typography } from 'antd';
import { InvestmentType } from 'types';
import {
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { FISCAL_YEAR_END } from 'constants/FISCAL_YEAR_END';
import { investmentTypeNames } from 'constants/investmentTypes';
import { FormStep } from 'forms/PCCreate/types';
import { DescriptionItem } from 'forms/PCCreate/components';
import { formStore } from 'forms/PCCreate/formStore';
import { extractTags } from 'tools/tagsTool';
import { CustomTag } from 'components';
import { formatPhoneNumber } from 'tools';
import { metricDependenciesStore } from 'store';
import { EMPTY_VALUE_PLACEHOLDER } from 'constants/forms';
import { renderAddress } from './tools';
import styles from './Review.module.scss';

const { Text } = Typography;

const CURRENT_STEP = FormStep.generalInfo;

const withPrefix = (id: string): string => `generalInformation_${id}`;

const GeneralInformationFn: FC = () => {
  const { allTagCategories: tags } = metricDependenciesStore;

  const plainTags = useMemo(() => {
    if (!tags) return [];
    return extractTags(tags);
  }, [tags]);

  const stepData = (formStore.data[CURRENT_STEP] || {}) as any;
  const additionalContacts = formStore.contacts.filter((item) => !item.primary);
  const { primaryContact } = stepData;
  const { name, surname, title, email, phone } = primaryContact ?? {};

  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_THIRD_ROW_SPAN + 2}>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <DescriptionItem
                label="Reporting Entity Name"
                id={withPrefix('portfolioCompanyName')}
              >
                {stepData.name || EMPTY_VALUE_PLACEHOLDER}
              </DescriptionItem>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <DescriptionItem
                label={`Total Commitment${
                  stepData.investmentType
                    ? ` (${
                        investmentTypeNames[
                          stepData.investmentType as InvestmentType
                        ]
                      })`
                    : ''
                }`}
                id={withPrefix('totalInvestment')}
              >
                {stepData.investment ?? EMPTY_VALUE_PLACEHOLDER}
              </DescriptionItem>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <DescriptionItem
                label="Fiscal Year End"
                id={withPrefix('fiscalYearEnd')}
              >
                {FISCAL_YEAR_END.get((stepData.fiscalYearEnd % 12) + 1) ??
                  EMPTY_VALUE_PLACEHOLDER}
              </DescriptionItem>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col
              span={GRID_COL_THIRD_ROW_SPAN}
              offset={GRID_COL_THIRD_ROW_SPAN}
            >
              <DescriptionItem
                label="Reporting Period Start Date"
                id={withPrefix('reportingStartDate')}
              >
                {stepData.reportingStartDate || EMPTY_VALUE_PLACEHOLDER}
              </DescriptionItem>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <DescriptionItem
                label="Investment Life"
                id={withPrefix('investmentLife')}
              >
                {!(
                  stepData.investmentLife?.start ||
                  stepData.investmentLife?.maturity
                )
                  ? EMPTY_VALUE_PLACEHOLDER
                  : `from ${
                      stepData.investmentLife?.start || EMPTY_VALUE_PLACEHOLDER
                    } to ${
                      stepData.investmentLife?.maturity ||
                      EMPTY_VALUE_PLACEHOLDER
                    }`}
              </DescriptionItem>
            </Col>
          </Row>
        </Col>
        <Col span={GRID_COL_THIRD_ROW_SPAN}>
          <Row>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <DescriptionItem
                label="Primary Contact"
                id={withPrefix('primaryContact')}
              >
                <Text className={styles.text}>
                  {Object.values(primaryContact ?? {}).some(
                    (value) => !!value,
                  ) ? (
                    <>
                      {name} {surname}
                      <br />
                      {title}
                      <br />
                      {email}
                      <br />
                      {formatPhoneNumber(phone)}
                    </>
                  ) : (
                    EMPTY_VALUE_PLACEHOLDER
                  )}
                </Text>
              </DescriptionItem>
            </Col>
            <Col span={GRID_COL_QUARTER_ROW_SPAN + 2}>
              <DescriptionItem label="Address" id={withPrefix('address')}>
                <Text className={styles.text}>
                  {stepData.address
                    ? renderAddress(stepData.address)
                    : EMPTY_VALUE_PLACEHOLDER}
                </Text>
              </DescriptionItem>
            </Col>
            <Col span={GRID_COL_QUARTER_ROW_SPAN + 2}>
              <DescriptionItem
                label="Additional Contacts"
                id={withPrefix('additionalContacts')}
              >
                {!formStore.contacts.filter((item) => !item.primary).length && (
                  <Text className={styles.text}>{EMPTY_VALUE_PLACEHOLDER}</Text>
                )}
                {additionalContacts.map((item) => (
                  <React.Fragment key={`${item.email}${item.name}`}>
                    <Text className={styles.text}>
                      {item.name} {item.surname} ({item.title}) - {item.email}
                    </Text>
                    <br />
                  </React.Fragment>
                ))}
              </DescriptionItem>
            </Col>
          </Row>
        </Col>
        <Col>
          <DescriptionItem
            label="Tags"
            id={withPrefix('generalInformationTags')}
          >
            {!(stepData.tags || []).length && (
              <Text className={styles.text}>{EMPTY_VALUE_PLACEHOLDER}</Text>
            )}
            <List bordered={false} split={false}>
              {(stepData.tags || []).map((tagId: number) => {
                const item = plainTags.find((t) => t.id === tagId);
                if (!item) return null;

                return (
                  <List.Item key={item.name} className={styles.listItem}>
                    <CustomTag tag={item} />
                  </List.Item>
                );
              })}
            </List>
          </DescriptionItem>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_THIRD_ROW_SPAN * 2}>
          <DescriptionItem label="Description" id={withPrefix('description')}>
            {stepData.description || EMPTY_VALUE_PLACEHOLDER}
          </DescriptionItem>
        </Col>
      </Row>
    </>
  );
};

export default observer(GeneralInformationFn);
