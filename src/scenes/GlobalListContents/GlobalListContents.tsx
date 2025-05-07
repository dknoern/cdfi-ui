import React, { FC, ReactNode, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PageSectionWrapper } from 'components';
import { Row, Col, Card, Button, Typography } from 'antd';
import { GRID_GUTTER } from 'constants/ui';
import styles from './ManagePlatform.module.scss';
import { globalListContentsCardContents } from './constants';
import { SupportRequestSubjectsEditModal } from './SupportRequestSubjectsEditModal';
import { LendingTypesModal } from './LendingTypesModal';
import { TargetBeneficiariesModal } from './TargetBeneficiariesModal';
import { AreasServedModal } from './AreasServedModal';
import { ImpactAreasModal } from './ImpactAreasModal';
import { SubImpactAreasModal } from './SubImpactAreasModal';
import { OrganizationTypesModal } from './OrganizationTypesModal';

const { Paragraph } = Typography;

export const smallCardStyle = {
  minHeight: 200,
  height: '100%',
};

const platformCard = (
  title: string,
  content: any,
  onClick: () => void,
  buttonKey: string,
  buttonDisabled: boolean,
) => (
  <Col xs={24} lg={12} xl={8} xxl={6} key={buttonKey}>
    <Card style={smallCardStyle}>
      {format(title, content)}
      <Button
        className={styles.button}
        type="primary"
        key={buttonKey}
        onClick={onClick}
        disabled={buttonDisabled}
      >
        Manage
      </Button>
    </Card>
  </Col>
);

const format = (title: string, content: ReactNode) => (
  <>
    <Paragraph strong>{title}</Paragraph>
    <Paragraph>{content}</Paragraph>
  </>
);

export const GlobalListContentsFn: FC = () => {
  const [
    showSupportRequestSubjectEditModal,
    setshowSupportRequestSubjectEditModal,
  ] = useState<boolean>(false);

  const [showAreasServedModal, setShowAreasServedModal] =
    useState<boolean>(false);

  const [showLendingTypesModal, setShowLendingTypesModal] =
    useState<boolean>(false);

  const [showTargetBeneficiaryModal, setShowTargetBeneficiaryModal] =
    useState<boolean>(false);

  const [showImpactAreaModal, setShowImpactAreaModal] =
    useState<boolean>(false);

  const [showSubImpactAreaModal, setShowSubImpactAreaModal] =
    useState<boolean>(false);

  const [showOrganizationTypes, setShowOrganizationTypes] =
    useState<boolean>(false);

  const onButtonClick = (key: string) => () => {
    switch (key) {
      case 'supportRequestSubjects':
        setshowSupportRequestSubjectEditModal(true);
        break;
      case 'states':
        setShowAreasServedModal(true);
        break;
      case 'impactAreas':
        setShowImpactAreaModal(true);
        break;
      case 'subImpactAreas':
        setShowSubImpactAreaModal(true);
        break;
      case 'taxBeneficiaries':
        setShowTargetBeneficiaryModal(true);
        break;
      case 'primaryLendingType':
        setShowLendingTypesModal(true);
        break;
      case 'organizationTypes':
        setShowOrganizationTypes(true);
        break;
    }
  };

  return (
    <PageSectionWrapper title="MANAGE GLOBAL LIST CONTENTS">
      <Link to={'/manage-platform'}>
        <Paragraph underline>Return to Manage Platform</Paragraph>
      </Link>

      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        {globalListContentsCardContents.map((content) =>
          platformCard(
            content.title,
            content.description,
            onButtonClick(content.key),
            content.key,
            content.disabled,
          ),
        )}
      </Row>
      <SupportRequestSubjectsEditModal
        visible={showSupportRequestSubjectEditModal}
        onClose={() => {
          setshowSupportRequestSubjectEditModal(false);
        }}
        onFinish={() => {}}
        formId={'SUPPORT_REQUEST_EDIT_FORM'}
      ></SupportRequestSubjectsEditModal>
      <LendingTypesModal
        showLendingTypesModal={showLendingTypesModal}
        setShowLendingTypesModal={setShowLendingTypesModal}
      />
      <TargetBeneficiariesModal
        showTargetBeneficiaryModal={showTargetBeneficiaryModal}
        setShowTargetBeneficiaryModal={setShowTargetBeneficiaryModal}
      />
      <AreasServedModal
        showAreasServedModal={showAreasServedModal}
        setShowAreasServedModal={setShowAreasServedModal}
      />
      <ImpactAreasModal
        showImpactAreaModal={showImpactAreaModal}
        setShowImpactAreasModal={setShowImpactAreaModal}
      />
      <SubImpactAreasModal
        showSubImpactAreaModal={showSubImpactAreaModal}
        setShowSubImpactAreaModal={setShowSubImpactAreaModal}
      />
      <OrganizationTypesModal
        showOrganizationTypes={showOrganizationTypes}
        setShowOrganizationTypes={setShowOrganizationTypes}
      />
    </PageSectionWrapper>
  );
};

export const GlobalListContents = withRouter(GlobalListContentsFn);
