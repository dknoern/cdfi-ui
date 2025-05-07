import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from 'antd';
import { VoidFn } from 'types';
import { PlainTextModalFlow } from 'types/plainTextModal';
import { MODAL_WIDTH } from 'constants/ui';
import { uiText } from 'constants/uiText';
import { typography } from 'constants/typography';
import { plainTextModals } from 'constants/plainTextModals';
import { showAPIError } from 'tools';
import { uiStore } from 'store';
import { DownloadButton } from 'components/Buttons';
import { useHTMLDocument } from 'dataManagement';
import { downloadStaticDocument } from 'dataManagement/operations/documentOperations';
import { BasicModal } from 'modals/BasicModal';
import styles from './PlainTextModal.module.scss';

const CONTENT_PLACEHOLDER_ROWS = 20;

type DocumentProps = {
  flowName: PlainTextModalFlow;
  onCancel: VoidFn;
  onLinkClick?: VoidFn;
  footer?: JSX.Element[];
  closable?: boolean;
};

const PlainTextModalFn: FC<DocumentProps> = ({
  flowName,
  onCancel,
  onLinkClick,
  footer,
  closable = true,
}) => {
  const { titleMain } = typography(flowName);

  const { data: content, isLoading: isContentLoading } = useHTMLDocument(
    flowName,
  );

  const onDownload = useCallback(() => {
    const { pdfEndpoint, fileName } = plainTextModals[flowName];

    downloadStaticDocument(pdfEndpoint, fileName).catch((e) => {
      showAPIError(uiText(flowName, 'downloadError'))(e);
    });
  }, [flowName]);

  const footerButtons = useMemo(
    () => [
      <DownloadButton key="downloads" onClick={onDownload} />,
      ...(footer ?? []),
    ],
    [onDownload, footer],
  );

  return (
    <BasicModal
      width={MODAL_WIDTH.MEDIUM}
      className={styles.modal}
      title={titleMain}
      visible={uiStore.activeFlows.has(flowName)}
      onCancel={onCancel}
      closable={closable}
      footer={footerButtons}
    >
      <Skeleton
        active
        loading={isContentLoading}
        paragraph={{ rows: CONTENT_PLACEHOLDER_ROWS }}
      >
        <div
          className={styles.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: content ?? '' }}
          role="presentation"
          onClick={onLinkClick}
          onKeyDown={onLinkClick}
        />
      </Skeleton>
    </BasicModal>
  );
};

export const PlainTextModal = observer(PlainTextModalFn);
