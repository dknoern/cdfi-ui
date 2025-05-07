import { ManagerDefault } from './ManagerDefault';
import {getEmailCategories,} from '../operations/emailOperations';

export interface EmailCategoriesResults {
  categories: any;
}

export class EmailCategoriesManager extends ManagerDefault<EmailCategoriesResults> {
  reload = (): void => {
    this.getEmailCategories();
  };

  getEmailCategories = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getEmailCategories()]).then(
          (values): EmailCategoriesResults => ({
            categories: values[0],
          }),
        ),

      (e) => {
        // notifyUser.error(uiText('rating', 'loadError')); // update this
      },
    );
  };
}
