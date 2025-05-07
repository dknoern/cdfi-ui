import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { ManagerDefault } from './ManagerDefault';
import {
  loadAll,
  create,
  remove,
  update,
} from '../operations/categoryOperations';

export class MetricCategoriesManager extends ManagerDefault {
  reload = (): void => {
    this.proceedReload(loadAll, () =>
      notifyUser.error(uiText('metrics', 'categoriesLoadError')),
    );
  };

  create: typeof create = (category) => {
    return create(category);
  };

  delete: typeof remove = (id) => {
    return remove(id);
  };

  update: typeof update = (categoryId, category) => {
    return update(categoryId, category);
  };
}
