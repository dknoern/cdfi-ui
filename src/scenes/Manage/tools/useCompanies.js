import { useState, useEffect } from 'react';
import { companiesManager } from './companiesManager';

export const useCompanies = () => {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => companiesManager.subscribe(setItems, setIsLoading), []);

  return [isLoading, items, !isLoading && items === null];
};
