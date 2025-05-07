import React, { ReactNode } from 'react';
import styles from './MyAccount.module.scss';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { TooltipProps } from 'antd/lib/tooltip';
import { Tooltip } from 'antd';
import { getPopupContainer } from '../../tools/antConfig';

export const renderWithTooltip = (
  text: ReactNode,
  tooltipText?: string,
  placement: TooltipProps['placement'] = 'top',
): ReactNode => {
  const innerText = <span>{text}</span>;

  return tooltipText ? (
    <Tooltip
      title={tooltipText}
      placement={placement}
      getPopupContainer={getPopupContainer}
      overlayClassName={styles.tooltipTextMyAccount}
    >
      {innerText}
    </Tooltip>
  ) : (
    innerText
  );
};

export const getTooltipData = () => {
  return {
    ratingsReports:
      'RATING REPORTS IN-DEPTH ANALYSIS FOR UNDERWRITING Impact management assessment and in-depth CAMEL analysis addressing financial strength and performance in a 50- to 70- page report published annually. Analyst opinions are supported by qualitative and quantitative narratives, tables, charts, and graphs. Analyses cover a fiveyear review period, and are written from the perspective of senior unsecured lenders.',
    factSheets: (
      <>
        <p>
          FACT SHEETS SOURCE INVESTMENT OPPORTUNITIES Use the CDFI Selector (
          <a href="http://aerisinsight.com/cdfi-selector">
            CDFI Selector - Aeris
          </a>
          ) to search for CDFIs by impact area, geography, asset size, and more.
          Download one-page Aeris® Fact Sheets containing mission, focus,
          impact, and financial highlights.
        </p>
      </>
    ),
    perfomanceMaps:
      'PERFORMANCE MAPS DATA FOR UNDERWRITING AND QUARTERLY MONITORING Access current and historical CDFI financial and impact performance data and key analytic ratios used in Aeris Rating Reports. View data with a Web browser, or download to Excel to customize presentation, formulas, and ratios.',
    peerGroups:
      'EXPLORER COMPARATIVE PORTFOLIO ANALYTIC TOOL Web-based CDFI analytics platform, with charts and graphs summarizing historical trends for key performance metrics. View performance relative to peers, create customized CDFI peer groups, and export charts to Excel for offline analysis.',
    library:
      'The Library Reporting Service on the Aeris® Cloud allows CDFIs to share documents and reports in their Aeris Library with their investors and funders, reducing reporting redundancies.  ',
    customDataReports: (
      <>
        <p>
          Please contact{' '}
          <a href="mailto: subscriptions@aerisinsight.com">
            Aeris Subscription Management
          </a>{' '}
          for more information on Custom Data Reports
        </p>
      </>
    ),
  };
};

export const columnsMyAccount = () => {
  return [
    {
      width: '110px',
      title: 'Aeris Service',
      dataIndex: 'name',
      key: 'name',
      render: (text: ReactNode, record: any) => (
        <div className={styles.aerisProduct}>
          <p>{text}</p>
          <p>{renderWithTooltip(<QuestionCircleOutlined />, record.tooltip)}</p>
        </div>
      ),
    },
    {
      width: '50px',
      title: 'Subscription Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      width: '70px',
      title: 'Usage To-Date',
      dataIndex: 'slots',
      key: 'slots',
    },
    {
      width: '200px',
      title: 'CDFIs Accessed',
      dataIndex: 'included',
      key: 'included',
    },
  ];
};
