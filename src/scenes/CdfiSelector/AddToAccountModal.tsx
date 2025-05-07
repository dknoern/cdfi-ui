import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Button, Alert } from 'antd';
import {
  SubscriptionProductStatusVM,
  SubscriptionProductStatusVMSelected,
} from '../../types';

interface AddToAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedProducts: SubscriptionProductStatusVMSelected) => void;
  products: SubscriptionProductStatusVM;
}

const AddToAccountModal: React.FC<AddToAccountModalProps> = ({
  visible,
  onClose,
  onConfirm,
  products,
}) => {
  const [selectedProducts, setSelectedProducts] =
    useState<SubscriptionProductStatusVMSelected>({
      ratingsSelected: false,
      financialsSelected: false,
      peerGroupsSelected: false,
    });

  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    setSelectedProducts({
      ...products,
      ratingsSelected: products.ratingsSelected,
      financialsSelected: products.financialsSelected,
      peerGroupsSelected: products.peerGroupsSelected,
    });
  }, [products]);

  useEffect(() => {
    if (visible) {
      setWarningMessage('');
    }
  }, [visible]);

  const handleProductChange =
    (product: keyof SubscriptionProductStatusVM) => (e: any) => {
      setSelectedProducts((prevProducts) => ({
        ...prevProducts,
        [product]: e.target.checked,
      }));
      setWarningMessage(''); // Clear warning when any checkbox is checked
    };

  const allCheckboxesDisabled =
    (!products.ratingsCheckboxVisible ||
      !products.ratingsEligible ||
      products.ratingsSelected) &&
    (!products.financialsCheckboxVisible ||
      !products.financialsEligible ||
      products.financialsSelected) &&
    (!products.peerGroupsCheckboxVisible ||
      !products.peerGroupsEligible ||
      products.peerGroupsSelected);

  const handleOk = () => {
    if (
      !selectedProducts.ratingsSelected &&
      !selectedProducts.financialsSelected &&
      !selectedProducts.peerGroupsSelected
    ) {
      setWarningMessage('Please check minimum one product!');
    } else {
      onConfirm(selectedProducts);
      onClose();
    }
  };

  return (
    <Modal
      title="Options"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        products.financialsEligible && (
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={allCheckboxesDisabled}
          >
            Add to my Account
          </Button>
        ),
      ]}
    >
      <span>
        Please select the service(s) that you want to access for this CDFI:
      </span>
      <br />
      <br />
      <form id="sub-manage-form">
        <div style={{ marginTop: '20px' }}>
          {products.ratingsCheckboxVisible && (
            <div style={{ width: '100%' }}>
              <Checkbox
                id="checkbox-ratings"
                disabled={
                  !(products.ratingsEligible && !products.ratingsSelected)
                }
                checked={selectedProducts.ratingsSelected}
                onChange={handleProductChange('ratingsSelected')}
                style={{ display: 'inline', marginRight: '5px' }}
              />
              <label htmlFor="checkbox-ratings" style={{ display: 'inline' }}>
                Rating Report Subscription
              </label>
            </div>
          )}

          {products.financialsCheckboxVisible && (
            <div style={{ width: '100%' }}>
              <Checkbox
                id="checkbox-financials"
                disabled={
                  !(products.financialsEligible && !products.financialsSelected)
                }
                checked={selectedProducts.financialsSelected}
                onChange={handleProductChange('financialsSelected')}
                style={{ display: 'inline', marginRight: '5px' }}
              />
              <label
                htmlFor="checkbox-financials"
                style={{ display: 'inline' }}
              >
                Performance Map Subscription
              </label>
            </div>
          )}

          {products.peerGroupsCheckboxVisible && (
            <div style={{ width: '100%' }}>
              <Checkbox
                id="checkbox-peer-groups"
                disabled={
                  !(products.peerGroupsEligible && !products.peerGroupsSelected)
                }
                checked={selectedProducts.peerGroupsSelected}
                onChange={handleProductChange('peerGroupsSelected')}
                style={{ display: 'inline', marginRight: '5px' }}
              />
              <label
                htmlFor="checkbox-peer-groups"
                style={{ display: 'inline' }}
              >
                Aeris ® Explorer Subscription
              </label>
            </div>
          )}
        </div>

        <div style={{ width: '100%', marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>
            Rating Report available count:{' '}
          </span>
          <span>{products.ratingsAvailable}</span>
        </div>
        <div style={{ width: '100%' }}>
          <span style={{ fontWeight: 'bold' }}>
            Performance Map available count:{' '}
          </span>
          <span>{products.financialsAvailable}</span>
        </div>
        <div style={{ width: '100%' }}>
          <span style={{ fontWeight: 'bold' }}>
            Aeris ® Explorer available count:{' '}
          </span>
          <span>{products.peerGroupsAvailable}</span>
        </div>
        {!products.financialsEligible && (
          <div style={{ width: '100%' }}>
            <span style={{ color: '#aa0000' }}>
              Permission is needed to access this CDFI's data. Please contact
              Aeris to receive access.
            </span>
          </div>
        )}
        {warningMessage && (
          <Alert
            message={warningMessage}
            type="error"
            style={{ marginTop: '20px' }}
          />
        )}
      </form>
    </Modal>
  );
};

export default AddToAccountModal;
