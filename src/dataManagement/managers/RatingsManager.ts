import { ManagerDefault } from './ManagerDefault';
import { Rating } from 'types';
import { getCdfiRatings } from '../operations/cdfiOperations';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';

export interface RatingsManagerResults {
  ratings: Rating;
}

export class RatingsManager extends ManagerDefault<RatingsManagerResults> {
  reload = (cdfiId?: number): void => {
    this.getCdfiRatings(cdfiId);
  };

  getCdfiRatings = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCdfiRatings(cdfiId)]).then(
          (values): RatingsManagerResults => ({
            ratings: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('rating', 'loadError'));
      },
    );
  };
}
