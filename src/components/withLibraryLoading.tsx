import React, { useState, useCallback, useEffect } from 'react';
import { VoidFn } from 'types';
import { userStore } from 'store';
import { loadPCLibrary } from 'scenes/Library/PCLibrary/tools';
import { libraryStore } from 'scenes/Library/PCLibrary/store';

export type WithLibraryLoadingProps = {
  isLoading: boolean;
  hasError: boolean;
  loadLibrary: VoidFn;
};

export const withLibraryLoading = <OriginalProps extends {}>(
  WrappedComponent: React.ComponentType<
    OriginalProps & WithLibraryLoadingProps
  >,
): React.ComponentType<OriginalProps> => {
  return (props: OriginalProps): JSX.Element => {
    const {
      info: { companyId },
    } = userStore;

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setError] = useState(false);

    const loadLibrary = useCallback(() => {
      if (!companyId) return;

      setIsLoading(true);
      setError(false);

      loadPCLibrary(companyId ?? 0, setError).finally(() => {
        setIsLoading(false);
      });
    }, [companyId]);

    useEffect(() => {
      if (isLoading || hasError || !!libraryStore.library) return;

      loadLibrary();
    }, [companyId, loadLibrary, isLoading, hasError]);

    const libraryLoadingProps: WithLibraryLoadingProps = {
      isLoading,
      hasError,
      loadLibrary,
    };

    return <WrappedComponent {...props} {...libraryLoadingProps} />;
  };
};
