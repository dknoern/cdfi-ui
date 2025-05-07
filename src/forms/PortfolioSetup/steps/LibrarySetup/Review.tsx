import { LibraryContent } from './LibraryContent';

import React, { FC } from 'react';
import { formStore } from 'forms/PortfolioSetup/formStore';

const Review: FC = () => {
  return <LibraryContent libraryId={formStore.formData.libraryId ?? 0} />;
};

export default Review;
