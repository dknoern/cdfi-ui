import { useState, useEffect } from 'react';
import { apiProcessor } from './apiProcessor';
import { getCdfi } from 'dataManagement/operations/cdfiOperations';

export const useCdfiLogo = (cdfiId: number) => {
  const [base64, setBase64] = useState<any>();

  const reader = new FileReader();

  useEffect(() => {
    if (!cdfiId) {
      setBase64('');
      return;
    }

    getCdfi(cdfiId).then((res) => {
      apiProcessor
        .get('documentItem', res.logoDocumentId)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          reader.readAsDataURL(blob);
          reader.addEventListener('load', (e: any) => {
            setBase64(e.target.result);
          });
        })
        .catch((e) => {
          setBase64('');
          console.error(e);
        });
    });
  }, [cdfiId]);

  return base64;
};
