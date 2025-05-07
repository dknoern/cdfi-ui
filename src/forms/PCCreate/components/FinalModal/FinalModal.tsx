import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { NotificationModal } from 'modals';
import { typography } from 'constants/typography';
import { ModalTypes } from 'constants/ui';
import { formStore } from '../../formStore';
import styles from './FinalModal.module.scss';

const { finalTitle, finalText1, finalText2 } = typography(
  'portfolioCompanyCreation',
);

type FinalModalProps = {
  visible: boolean;
  onLaterClick: () => void;
  onOkClick: () => void;
};

const FinalModalFn: FC<FinalModalProps> = ({
  visible,
  onLaterClick,
  onOkClick,
}) => {
  const {
    data: { generalInfo },
  } = formStore;
  const { name, reportingStartDate } = (generalInfo as any) || {};

  return (
    <NotificationModal
      title={finalTitle}
      isVisible={visible}
      type={ModalTypes.Success}
      buttonsConfig={[
        {
          id: 'laterButton',
          key: 'later',
          text: 'Maybe Later',
          action: onLaterClick,
          type: 'default',
        },
        {
          id: 'okButton',
          key: 'primary',
          text: 'Upload Metric Data',
          action: onOkClick,
          type: 'primary',
        },
      ]}
    >
      <div className={styles.text1}>{finalText1({ name })}</div>
      <div className={styles.text2}>
        {finalText2({ periodStart: reportingStartDate })}
      </div>
    </NotificationModal>
  );
};

export const FinalModal = observer(FinalModalFn);
