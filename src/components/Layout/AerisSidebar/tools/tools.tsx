import React from 'react';
import {
  BookOutlined,
  TeamOutlined,
  FileOutlined,
  BarChartOutlined,
  ReadOutlined,
  StarOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  DollarOutlined,
  IdcardOutlined,
  PieChartOutlined,
  AuditOutlined,
  DownloadOutlined,
  CustomerServiceOutlined,
  ContactsOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  FundOutlined, FileExcelOutlined
} from '@ant-design/icons';

export const getIcons = (iconName: string | undefined): any => {
  const icon = iconName?.toLowerCase();
  switch (icon) {
    case 'bookicon':
      return <BookOutlined />;
    case 'fileicon':
      return <FileOutlined />;
    case 'barcharticon':
      return <BarChartOutlined />;
    case 'readicon':
      return <ReadOutlined />;
    case 'teamicon':
      return <TeamOutlined />;
    case 'staricon':
      return <StarOutlined />;
    case 'dashboardicon':
      return <DashboardOutlined />;
    case 'filedoneicon':
      return <FileDoneOutlined />;
    case 'dollaricon':
      return <DollarOutlined />;
    case 'idcardicon':
      return <IdcardOutlined />;
    case 'piecharticon':
      return <PieChartOutlined />;
    case 'auditicon':
      return <AuditOutlined />;
    case 'downloadicon':
      return <DownloadOutlined />;
    case 'fundicon':
      return <FundOutlined />;
    case 'customerservice':
      return <CustomerServiceOutlined />;
    case 'contacts':
      return <ContactsOutlined />;
    case 'filesearch':
      return <FileSearchOutlined />;
    case 'reports':
      return <FileTextOutlined />;
    case 'requiredmetrics':
      return <CheckCircleOutlined />;
    case 'periods':
      return <CalendarOutlined />;
    case 'excelfileicon':
      return <FileExcelOutlined />;
  }
};
