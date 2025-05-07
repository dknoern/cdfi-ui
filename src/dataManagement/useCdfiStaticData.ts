import { useEffect, useState } from 'react';
import { apiProcessor } from 'tools';
import { CdfiStaticData } from 'forms/AdminForms/CdfiEdit/types';

export const useCdfiStaticData = () => {
  const [data, setData] = useState<CdfiStaticData | null>(null);

  useEffect(() => {
    apiProcessor
      .get('getCdfiStaticData')
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return data;
};
