import { useEffect, useState } from 'react';
import { reaction } from 'mobx';
import { DataStore } from './managers/types';

export const useStoreAntiCache = (store: DataStore): void => {
  const [, setAntiCacheCounter] = useState(0);

  useEffect(
    () =>
      reaction(
        () => [store.data, store.hasError, store.isLoading],
        () => {
          setAntiCacheCounter((value) => value + 1);
        },
      ),
    [store],
  );
};
