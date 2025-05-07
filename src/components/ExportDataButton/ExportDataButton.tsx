import React, { FC, useCallback, useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownloadOutlined, DownOutlined } from '@ant-design/icons';
import { ForecastExportSettings } from 'types/forecast';
import { ChartExportSettings, GraphType } from 'types/graphs';
import { DownloadFileNames } from 'constants/downloadFileNames';
import { apiProcessor, notifyUser } from 'tools';
import { makeFetch } from 'tools/APITools';
import { downloadFetchedFile } from 'tools/fileDownloadTools';
import { getEndpointEntityByExportMode } from './tools';

type ExportDataButtonProps = {
  mode: 'companyChart' | 'portfolioChart' | 'forecast';
  exportSettings: ChartExportSettings | ForecastExportSettings;
  id: string;
  text: string;
  graphType?: GraphType;
};

export const ExportDataButton: FC<ExportDataButtonProps> = ({
  mode,
  exportSettings,
  id,
  text,
  graphType,
}) => {
  const [isLoading, setLoading] = useState(false);

  const download = useCallback(
    (clickedItem) => {
      const endpointEntity = getEndpointEntityByExportMode(mode);

      const settings = Object.assign({}, exportSettings);

      // warning, see task AAN-2152
      if (graphType === 'PIE') {
        notifyUser.warning('Currently unable to export Pie Charts');
        if (clickedItem && clickedItem.key && clickedItem.key === 'specific') {
          return;
        }
      }

      // for "download all" functionality
      if (clickedItem && clickedItem.key && clickedItem.key === 'all') {
        if (mode === 'forecast') {
          delete (settings as ForecastExportSettings).setId;
        } else {
          delete (settings as ChartExportSettings).graphId;
        }
      }

      setLoading(true);

      makeFetch({
        url: apiProcessor.makeEndpoint(endpointEntity, settings),
        contentType: 'text/plain; charset=x-user-defined',
        data: null,
      })
        .then((response) => {
          downloadFetchedFile(response, DownloadFileNames.Report);
        })
        .catch(() => {
          notifyUser.error('Something went wrong during downloading');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [mode, exportSettings, graphType],
  );

  const buttonProps = {
    id,
    type: 'primary',
    size: 'middle',
    icon: <DownloadOutlined />,
    loading: isLoading,
  } as Partial<typeof Button>;

  if (
    (exportSettings as ForecastExportSettings).setId ||
    (exportSettings as ChartExportSettings).graphId
  ) {
    const menu = (
      <Menu onClick={download}>
        <Menu.Item key="all">Export all</Menu.Item>
        <Menu.Item key="specific">Current only</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button {...buttonProps}>
          {text} <DownOutlined />
        </Button>
      </Dropdown>
    );
  }

  return (
    <Button {...buttonProps} onClick={download}>
      {text}
    </Button>
  );
};
