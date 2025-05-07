import React, { FC, useCallback, useState } from 'react';
import { VoidFn } from 'types';
import { globalGraphsStore } from 'store';
import { GlobalGraphForm } from './GlobalGraphForm';
import { observer } from 'mobx-react';
import { PageSectionWrapper } from '../../../../../../components';
import { useHistory } from 'react-router-dom';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { IGlobalGraph } from 'types/globalGraph';

type GlobalGraphProps = { onFinish: VoidFn };

export const GlobalGraph: FC<GlobalGraphProps> = observer(({ onFinish }) => {
  const {
    setIsEditGraph,
    isEditGraph,
    getUpdateGlobalGraph,
    getCreateGlobalGraph,
    globalGraph,
  } = globalGraphsStore;
  const formId = 'EDIT_GLOBAL_GRAPH';
  const history = useHistory();
  const [isEditGraphModalVisible, setEditGraphModalVisibility] =
    useState<any>(false);
  const saveHandler = useCallback(
    (values: IGlobalGraph) => {
      if (isEditGraph && globalGraph?.id !== null) {
        getUpdateGlobalGraph(values).then(onFinish);
        setIsEditGraph(false);
      } else {
        getCreateGlobalGraph(values).then(onFinish);
        setIsEditGraph(false);
      }
      history.goBack();
    },
    [onFinish],
  );

  const goBack = () => {
    if (isEditGraph) {
      setEditGraphModalVisibility(true);
    } else {
      setIsEditGraph(false);
      history.goBack();
    }
  };

  const closeConfirmEditGraph = async () => {
    setEditGraphModalVisibility(false);
    setIsEditGraph(false);
    history.goBack();
  };

  return (
    <PageSectionWrapper
      title={isEditGraph ? 'Manage Graph' : 'Create New Graph'}
    >
      <GlobalGraphForm
        onFinish={saveHandler}
        formId={formId}
        onCancel={goBack}
      />
      <ConfirmModal
        visible={isEditGraphModalVisible}
        onClose={(): void => setEditGraphModalVisibility(false)}
        onClick={closeConfirmEditGraph}
        text="Do you really want to cancel? All data entered will be lost."
        buttonText="Yes"
      />
    </PageSectionWrapper>
  );
});
