import { toast } from 'react-toastify';
import { apiProcessor, Log } from 'tools';
import { uiStore } from 'store';
import { uiText } from 'constants/uiText';

class MapsManager {
  saveMappings = ({ companyId, year, quarter, cells }) => {
    Log.log('[MapsManager] saveMappings', cells);

    uiStore.addLoading('SAVE_MAPPING');

    return apiProcessor
      .put('mapSave', { companyId, year, quarter }, { values: cells })
      .then(() => {
        toast(uiText('mapper', 'mapSaveOk'), { type: 'success' });
      })
      .catch((error) => {
        Log.log('[MapsManager] saveMappings error', error);
        toast(uiText('mapper', 'mapSaveError'), { type: 'error' });
        throw error;
      })
      .finally(() => {
        uiStore.endLoading('SAVE_MAPPING');
      });
  };

  getMappings = ({ companyId, year, quarter }) => {
    Log.log('[MapsManager] getMappings');

    uiStore.addLoading('LOAD_MAPPING');

    return apiProcessor
      .get('map', { companyId, year, quarter })
      .catch((error) => {
        Log.log('[MapsManager] getMappings error', error);
        return error;
      })
      .finally(() => {
        uiStore.endLoading('LOAD_MAPPING');
      });
  };
}

export const mapsManager = new MapsManager();
