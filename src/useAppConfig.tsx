import { useEffect, useState } from 'react';
import { apiProcessor } from 'tools';

type FeatureFlag = {
  name: string;
  value: 'true' | 'false';
};

interface AppConfig {
  featureFlags: FeatureFlag[];
}

type MappedFeatureFlags = Record<string, boolean>;

export const useAppConfig = (): MappedFeatureFlags => {
  const [appConfig, setAppConfig] = useState<AppConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAppConfig = async () => {
      try {
        const data = await apiProcessor.get('appConfig');
        setAppConfig(data);
      } catch (err) {
        console.error('Error fetching appConfig:', err);
        setError(err as Error);
      }
    };

    fetchAppConfig();
  }, []);

  const mappedFeatureFlags =
    appConfig?.featureFlags.reduce<MappedFeatureFlags>((acc, curr) => {
      const flagName = curr.name.replace(/\.|\B([A-Z])/g, '_$1').toUpperCase();
      acc[flagName] = curr.value === 'true';
      return acc;
    }, {}) || {};

  if (error) {
    throw new Error('Cannot get feature flags');
  }

  return mappedFeatureFlags;
};
