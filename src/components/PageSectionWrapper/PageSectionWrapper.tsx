import React, { FC, ReactNode } from 'react';
import { Row, Col, Button } from 'antd';
import { RowProps } from 'antd/lib/grid';
import { QuestionCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { WithClass, VoidFn } from 'types';
import { GRID_GUTTER } from 'constants/ui';
import { InnerPage } from 'components';
import { downloadStaticDocumentParameter } from 'dataManagement/operations/documentOperations';
import { cdfiStore } from 'store';
import styles from './PageSectionWrapper.module.scss';
import { RatingsHeader } from '../RatingsHeader';

type PageSectionWrapperProps = {
  title: ReactNode;
  topTitle?: string | ReactNode;
  description?: ReactNode;
  withHelpIcon?: boolean;
  onHelpIconClick?: VoidFn;
  configurationButtons?: React.ReactNode[];
  actionButtons?: React.ReactNode[];
  titleEllipsis?: boolean;
  titleClassName?: string;
  titleRowGutter?: RowProps['gutter'];
  ratings?: boolean;
  showDownloadFactSheet?: boolean;
} & WithClass;

export const PageSectionWrapper: FC<PageSectionWrapperProps> = ({
  title,
  topTitle,
  description,
  withHelpIcon,
  onHelpIconClick,
  configurationButtons,
  actionButtons,
  children,
  className,
  titleEllipsis = true,
  titleClassName = undefined,
  titleRowGutter,
  ratings,
  showDownloadFactSheet,
}) => {
  const { viewModeConfig } = cdfiStore;
  const onClickDownloadFactSheet = (): void => {
    downloadStaticDocumentParameter(
      'factSheet',
      viewModeConfig.cdfiId,
      'cdfiSubscriptionsDownload',
    );
  };

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <Row
        justify={topTitle ? 'space-between' : 'end'}
        align="top"
        gutter={titleRowGutter ?? [GRID_GUTTER, GRID_GUTTER]}
        className={styles.row}
      >
        {topTitle && (
          <Col>
            <InnerPage.Title className={styles.topTitle}>
              {topTitle}
            </InnerPage.Title>
          </Col>
        )}
        {showDownloadFactSheet && (
          <Col className={styles.factSheet}>
            <Button
              icon={<DownloadOutlined />}
              onClick={onClickDownloadFactSheet}
              htmlType="submit"
              type="primary"
            >
              Download Aeris® Fact Sheet
            </Button>
          </Col>
        )}
        {ratings && (
          <Col>
            <Row
              gutter={[GRID_GUTTER - 8, 0]}
              justify="space-between"
              align="middle"
              wrap={false}
            >
              <RatingsHeader className={`${actionButtons ?? ''}`} />
            </Row>
          </Col>
        )}
      </Row>
      <Row
        justify="space-between"
        align="top"
        gutter={titleRowGutter ?? [GRID_GUTTER, GRID_GUTTER]}
        className={styles.row}
        id="PageSectionWrapper__header"
      >
        <Col
          className={`${styles.colTitle} ${
            titleEllipsis ? styles.ellipsis : ''
          }`}
        >
          <InnerPage.Title
            ellipsis={titleEllipsis}
            className={`${titleClassName ?? ''}`}
          >
            {title}
            {withHelpIcon && (
              <QuestionCircleOutlined
                onClick={onHelpIconClick}
                className={styles.questionCircleIcon}
              />
            )}
            {configurationButtons}
          </InnerPage.Title>
        </Col>
        {actionButtons && (
          <Col>
            <Row
              gutter={[GRID_GUTTER - 8, 0]}
              justify="space-between"
              align="middle"
              wrap={false}
            >
              {actionButtons.map((btn, idx) => (
                <Col key={idx}>{btn}</Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
      {description && (
        <Row
          gutter={[GRID_GUTTER, GRID_GUTTER]}
          id="PageSectionWrapper__description"
        >
          <Col>
            <InnerPage.Text>{description}</InnerPage.Text>
          </Col>
        </Row>
      )}
      {children}
    </div>
  );
};
