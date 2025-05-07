import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, Row, Col, Tag, Divider, Typography, List } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons/lib/icons';
import { userStore, cdfiStore, configStore } from 'store';
import { OrgTag } from 'types';
import { apiProcessor } from 'tools';
import { formatPhoneNumber } from 'tools/formatPhoneNumber';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { useCdfiOrgDetails, deleteCdfi } from 'dataManagement';
import { GRID_GUTTER } from 'constants/ui';
import { stringOrNumber, mapTagCategoryToColor, list, noData } from './tools';
import { WithCompanyTypeProps } from './types';
import { smallCardStyle, largeCardStyle, contentText } from './constants';
import { LogoHeader } from './LogoHeader';
import {
  ContentLimiter,
  LinkButton,
  PageSectionWrapper,
} from '../../../../components';
import styles from './OrganizationDetails.module.scss';
import {use} from "marked";

const { Paragraph, Text } = Typography;
const { Link: TypographyLink } = Typography;

enum TagsNameEnum {
  UN_SDG = 'UN-SDG',
  CUSTOM = 'CUSTOM',
  IRIS = 'IRIS+',
}

export const OrganizationDetails: FC<WithCompanyTypeProps> = () => {
  const { cdfiId, setCdfiId } = cdfiStore;
  const { data, resetStore } = useCdfiOrgDetails(cdfiId);
  const cdfi = data ? data.cdfi : undefined;
  const { cdfiDeleteEnabledValue } = configStore;

  const hasTags = (tags?: OrgTag[], tagCategory?: string): boolean => {
    const result = tags?.filter((tag) => tag?.category === tagCategory);

    if (!result) return false;
    return result.length > 0;
  };

  const shareTags = (title: string, content?: OrgTag[]) => {
    const sortedContent = content?.sort((a, b) => a.name.localeCompare(b.name));
    return (
      <Col>
        {title === 'UN-SDG' ? (
          <Paragraph>United Nations Sustainable Development Goals</Paragraph>
        ) : (
          <Paragraph>{title}</Paragraph>
        )}

        {sortedContent?.map((item, index) => {
          if (item?.category === title) {
            return (
              <Tag
                className={styles.tag}
                key={index}
                color={mapTagCategoryToColor(item?.category)}
              >
                {item?.name}
              </Tag>
            );
          }
        })}
        {title === TagsNameEnum.UN_SDG ? (
          <>
            <Divider style={{ border: 'unset' }} />
            {content?.map((item) => {
              if (item?.category === TagsNameEnum.UN_SDG) {
                return (
                  <img
                    key={item.id}
                    style={{ margin: 2, width: 50, height: 50 }}
                    src={apiProcessor.makeEndpoint('tagIcon', item?.id)}
                    alt={`${TagsNameEnum.UN_SDG}-icon`}
                  />
                );
              }
            })}
          </>
        ) : null}
      </Col>
    );
  };

  const tagsContent = (title: string, content?: OrgTag[]) => {
    const sortContent = content?.sort((a, b) => {
      return +a.name.substr(0, 2) - +b.name.substr(0, 2);
    });

    return (
      <Col xs={24} xl={16} xxl={12}>
        <Card>
          <Paragraph strong>{title}</Paragraph>
          <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
            {hasTags(sortContent, TagsNameEnum.IRIS) &&
              shareTags(TagsNameEnum.IRIS, sortContent)}
            {hasTags(sortContent, TagsNameEnum.UN_SDG) &&
              shareTags(TagsNameEnum.UN_SDG, sortContent)}
            {hasTags(sortContent, TagsNameEnum.CUSTOM) &&
              shareTags(TagsNameEnum.CUSTOM, sortContent)}
          </Row>
        </Card>
      </Col>
    );
  };

  const taxDetails = (
    <>
      <Paragraph>
        Tax Type: <Text strong>{cdfi?.taxType}</Text> <br />
        Tax Jurisdiction: <Text strong>{cdfi?.taxJurisdiction}</Text>
      </Paragraph>
      <Paragraph>
        EIN: <Text strong>{cdfi?.ein}</Text>
      </Paragraph>
    </>
  );

  const smallCard = (title: string, content: any) => (
    <Col xs={24} lg={12} xl={8} xxl={6}>
      <Card style={smallCardStyle}>{format(title, content)}</Card>
    </Col>
  );

  const format = (title: string, content: ReactNode) => (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Paragraph>{content ? content : noData(contentText.noData)}</Paragraph>
    </>
  );

  const accountStatus = (
    <Paragraph className={styles.accountStatus}>
      <span className={cdfi?.active ? styles.on : '$'} />
      Account {cdfi?.active ? 'Active' : 'Inactive'}
    </Paragraph>
  );

  const editCard = (
    <Col lg={24} xl={8} xxl={6}>
      <Card bordered={false} style={{ backgroundColor: 'transparent' }}>
        <Paragraph strong>Edit Organization Details</Paragraph>
        <Paragraph>
          To update any information for your organization, please contact Aeris
          Support.
        </Paragraph>
        <TypographyLink href="mailto:support@aerisinsight.com">
          Aeris Support
        </TypographyLink>
      </Card>
    </Col>
  );

  const preferencesCard = (
    <div className={styles.preferencesCard}>
      <Paragraph>
        {cdfi?.hideActivity ? <CheckOutlined /> : <CloseOutlined />}
        Hide Activity
      </Paragraph>
      <Paragraph>
        {cdfi?.reportAllRows ? <CheckOutlined /> : <CloseOutlined />}
        Show All Reports
      </Paragraph>
      <Paragraph>
        {cdfi?.peerGroupAllowed ? <CheckOutlined /> : <CloseOutlined />}
        Allow in Peer Group
      </Paragraph>
      <Paragraph>
        {cdfi?.suppressReminders ? <CheckOutlined /> : <CloseOutlined />}
        Supress Reminders
      </Paragraph>
      <Paragraph>
        {cdfi?.emailReminders ? <CheckOutlined /> : <CloseOutlined />}
        Enable Notifications
      </Paragraph>
    </div>
  );

  const fDates = (
    <List className={styles.fiscalDates}>
      <Paragraph>
        Fiscal Year End: <strong>{cdfi?.fiscalYearEnd}</strong>
      </Paragraph>
      {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) ? (
        <>
          <Paragraph>
            Start Requesting Year: <strong>{cdfi?.startRequestingYear}</strong>
          </Paragraph>
          <Paragraph>
            Start Requesting Quarter:
            <strong> {cdfi?.startRequestingQuarter}</strong>
          </Paragraph>
        </>
      ) : null}
    </List>
  );

  const address = (
    <>
      {cdfi?.address} {cdfi?.address2}
      <br />
      {cdfi?.city}, {cdfi?.state} {cdfi?.zip}
    </>
  );

  const history = useHistory();

  const editCdfi = () => {
    history.push(`/manage/cdfi/${cdfiId}/update-cdfi`);
  };

  const editButton = (
    <LinkButton
      key="customizeReportedDataTable"
      icon={<EditOutlined />}
      onClick={(): void => {
        editCdfi();
      }}
    />
  );

  // Delete button should not be available in production -
  // only for development and testing purposes
  // The delete button will only appear if cdfiDeleteEnabledValue
  // from the config store is true
  const onDeleteCdfi = useCallback(() => {
    deleteCdfi(cdfiId);
    history.push('/dashboard');
  }, []);

  const deleteButton = (
    <LinkButton
      key="deleteCdfiButton"
      icon={<DeleteOutlined />}
      onClick={(): void => {
        onDeleteCdfi();
      }}
    />
  );

  const phoneExtension = cdfi?.phoneExtension
    ? ` Ext ${cdfi?.phoneExtension}`
    : '';

  useEffect(() => {
    return function cleanup() {
      resetStore();
    };
  }, []);

  const logo = useCdfiLogo(cdfiId);

  return (
    <>
      {cdfi && (
        <ContentLimiter>
          {userStore.isSubscriber && (
            <Link
              to={'/dashboard'}
              onClick={() => {
                setCdfiId(null);
              }}
            >
              <Paragraph underline>Return to My CDFIs</Paragraph>
            </Link>
          )}
          <PageSectionWrapper
            topTitle={<LogoHeader imgPath={logo} subTitle={cdfi?.name} />}
            title={`Organization Details: ${cdfi?.name}`}
            ratings
            titleEllipsis
            configurationButtons={[(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) ? editButton : null]}
            className={styles.organizationDashboard}
            showDownloadFactSheet={
              userStore.isAerisAdmin || (cdfi.shareFinancials === "All" && (userStore.isSubscriber || userStore.isStaff || userStore.isContractor))
            }
          >
            <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
              <Col xs={24} md={12} lg={12} xl={8}>
                {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) ? accountStatus : null}
                <Card style={largeCardStyle}>
                  {format(
                    'Mission',
                    cdfi?.mission
                      ? cdfi?.mission
                      : noData(contentText.missionEmpty),
                  )}
                  <Divider />
                  <Row justify="space-between">
                    <Col span={12}>
                      {cdfi?.address && cdfi?.city
                        ? format('Address', address)
                        : noData(contentText.noAddress)}
                    </Col>
                    <Col span={6}>
                      {format(
                        'Rated since',
                        cdfi?.ratedSince
                          ? cdfi?.ratedSince
                          : noData(contentText.noRated),
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      {format('Phone', [
                        cdfi?.phone
                          ? formatPhoneNumber(cdfi?.phone!)
                          : noData(contentText.noNumber),
                        phoneExtension,
                      ])}
                    </Col>
                    <Col span={12}>
                      {format(
                        'Fax',
                        cdfi?.fax
                          ? formatPhoneNumber(cdfi?.fax)
                          : noData(contentText.noNumber),
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {format(
                        'Website',
                        cdfi?.website
                          ? cdfi?.website
                          : noData(contentText.noWebsite),
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={12} lg={12} xl={16}>
                <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
                  {smallCard(
                    'Primary Lending Types',
                    list(cdfi?.primaryLendingTypes!),
                  )}
                  {smallCard('Other Lending', list(cdfi?.otherLendingTypes!))}
                  {smallCard(
                    'Target Beneficiaries',
                    list(cdfi?.targetBeneficiaries!),
                  )}
                  {smallCard('Areas Served', cdfi?.areasServed?.join(', '))}
                  {smallCard('Organization Type', cdfi?.organizationType)}
                  {smallCard('Tax Details', taxDetails)}
                  {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor)
                    ? smallCard('Financial Dates', fDates)
                    : smallCard('Financial Dates', cdfi?.fiscalYearEnd)}
                  {smallCard('Asset Size', stringOrNumber(cdfi?.assetSize))}
                  {smallCard(
                    'Impact Areas',
                    list(cdfi?.impactAreas! as unknown as string[]),
                  )}
                  {smallCard(
                    'Sub-Impact Areas',
                    list(cdfi?.subImpactAreas! as unknown as string[]),
                  )}
                  {!userStore.isSubscriber &&
                    smallCard('Access to Financials', cdfi?.shareFinancials)}
                  {!userStore.isSubscriber &&
                    smallCard('Preferences', preferencesCard)}
                  {tagsContent('Tags', cdfi?.tags)}
                  {userStore.isCdfi && editCard}
                </Row>
              </Col>
            </Row>
            {cdfiDeleteEnabledValue && userStore.isAerisAdmin && (
              <Row>
                <Paragraph style={{ paddingBottom: '30px' }}>
                  {deleteButton}
                </Paragraph>
              </Row>
            )}
          </PageSectionWrapper>
        </ContentLimiter>
      )}
    </>
  );
};
