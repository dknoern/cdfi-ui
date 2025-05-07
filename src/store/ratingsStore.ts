import { action, decorate } from 'mobx';
import {apiProcessor, notifyUser} from "../tools";
import {uiText} from "../constants";

const defaultConfig = {
  ratingId: null
}

class RatingStore {
  ratingId: number | null = defaultConfig.ratingId;

  getDeleteEmailCategory = (id: number | null): Promise<void> => {
    const OPERATION = 'cdfiRatingsDelete';

    return apiProcessor.delete(OPERATION, id).then(() => {
      notifyUser.ok(uiText('cdfiRatings', 'deleteOk'));
    }).catch((e) => {
      if(e.data.status === 500) {
        notifyUser.error(uiText('cdfiRatings', 'deleteError'));
      }
    })
  };
}

decorate(RatingStore, {
  getDeleteEmailCategory: action
})

export const ratingStore = new RatingStore();
