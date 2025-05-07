import React, { FC, useEffect, useState } from 'react';
import { Col, Form, Row, Select, Checkbox } from 'antd';
import { PeerGroupsFormProps } from 'types/form';
import { GRID_COL_FULL_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { Cdfi } from 'types';
import { peerGroupStore } from 'store';
import { CdfiPeerGroupI, PeerGroupI } from 'types/peerGroups';
import styles from '../PeerGroupsPage.module.scss';

export interface PeerGroupsFormData {
  onValuesChange: () => void;
}

export const PeerGroupsForm: FC<PeerGroupsFormProps<PeerGroupsFormData>> = ({
  onFinish,
  formId,
  form,
  onValuesChange,
}) => {
  /**
   * Hooks
   */
  const [cdfis, setCdfis] = useState<Cdfi[]>([]);
  const [currentCdfi, setCurrentCdfi] = useState<any>();
  const [cdfiPeerGroups, setCdfiPeerGroups] = useState<CdfiPeerGroupI[]>([]);
  const { getTotalCdfis, peerGroupsTotal, getCdfiPeerGroups, setSelectedCdfi } =
    peerGroupStore;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /**
   * Effects
   */
  useEffect(() => {
    const fetchCdfis = async () => {
      setIsLoading(true);
      try {
        const data = await getTotalCdfis();
        if (data && data.content) {
          setCdfis(data.content);
        } else {
          console.error('No content in fetched data');
        }
      } catch (error) {
        console.error('Failed to fetch CDFIs:', error);
      }
      setIsLoading(false);
    };

    fetchCdfis();
  }, []);

  const cdfiOptions = cdfis.map((cdfi) => ({
    value: cdfi.id,
    label: cdfi.name,
  }));

  /**
   * Handlers
   */
  const handleCdfiChange = async (selectedCdfiId: string | number) => {
    setSelectedCdfi(selectedCdfiId);
    if (selectedCdfiId) {
      const cdfiData = peerGroupsTotal?.content?.find(
        (cdfi: PeerGroupI) => cdfi.id === selectedCdfiId,
      );
      setCurrentCdfi(cdfiData);
    }
    try {
      const cdfiPeerGroupsResult = await getCdfiPeerGroups(selectedCdfiId);
      setCdfiPeerGroups(cdfiPeerGroupsResult);
    } catch (error) {
      console.error('Error in handleCdfiChange:', error);
    }
  };

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      form={form}
      requiredMark={false}
      onValuesChange={onValuesChange}
    >
      <Row gutter={[GRID_GUTTER, 0]} align="bottom">
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item label="Select a CDFI">
            <Select
              placeholder={isLoading ? 'Loading CDFIs...' : 'Select CDFI'}
              options={cdfiOptions}
              showSearch
              optionFilterProp="label"
              onChange={handleCdfiChange}
              disabled={isLoading}
              loading={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ marginBottom: '16px' }}>
        <div>
          <strong>Primary Lending Types: &nbsp;</strong>
        </div>
        <div> {currentCdfi?.primaryLendingTypes}</div>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <strong>Total Assets: &nbsp;</strong>
        <p> ${currentCdfi?.totalAssets}</p>
      </Row>
      <Row style={{ marginBottom: '8px' }}>
        <strong>Modify Peer Groups for {currentCdfi?.name}</strong>
      </Row>
      <div className={styles.cdfisWrapper}>
        {cdfiPeerGroups?.map((group) => (
          <Form.Item
            key={group.id}
            name={`peerGroup_${group.id}`}
            valuePropName="checked"
            initialValue={group.active}
            style={{ marginBottom: '-6px' }}
          >
            <Checkbox>{group.name}</Checkbox>
          </Form.Item>
        ))}
      </div>
    </Form>
  );
};
