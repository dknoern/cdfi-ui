import React, { FC } from 'react';
import { userStore } from 'store';
import { TermsOfUse, PrivacyPolicy } from 'flows';
import { ContactSupport } from 'components/ContactSupport';
import { EditFMCInfo } from './EditFMCInfo';

export const Globals: FC = React.memo(() => {
  return (
    <>
      {userStore.isFM && <EditFMCInfo />}
      <TermsOfUse />
      <PrivacyPolicy />
      <ContactSupport />
    </>
  );
});
