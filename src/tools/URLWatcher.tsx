import { FC, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { workDataStore } from 'store';
import { location2ViewModeConfig } from './location2ViewModeConfig';

export const URLWatcher: FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    workDataStore.setViewModeConfig(location2ViewModeConfig(location));
  }, [location, location.pathname]);

  return null;
};
