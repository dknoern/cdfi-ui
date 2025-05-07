import React from 'react';
import { Button } from 'antd';
import { typography } from 'constants/typography';
import { reject as proceedReject, accept as proceedAccept } from './tools';

const { reject, accept } = typography('common');

type FooterProps = {
  termsAccepted: boolean;
};

export const makeFooter = ({
  termsAccepted,
}: FooterProps): JSX.Element[] | undefined => {
  return !termsAccepted
    ? [
        <Button key="rejectTerms" type="link" onClick={proceedReject}>
          {reject}
        </Button>,
        <Button key="acceptTerms" type="primary" onClick={proceedAccept}>
          {accept}
        </Button>,
      ]
    : undefined;
};
