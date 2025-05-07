import { decorate, observable, reaction } from 'mobx';
import { Tag, TagCategory } from 'types';
import { uiText } from 'constants/uiText';
import { extractTags, notifyUser } from 'tools';
import { ManagerDefault } from './ManagerDefault';
import {
  allTags,
  createTagCategory,
  deleteTagCategory,
  updateTagCategory,
  createTag,
  deleteTag,
  updateTag,
} from '../operations/tagOperations';
export class TagsManager extends ManagerDefault<TagCategory[]> {
  plainTags: Tag[] = [];

  plainTagsMap: Map<Tag['id'], Tag> = new Map();

  constructor() {
    super();

    reaction(
      () => this.store.data,
      (tagCategories) => {
        this.plainTags = Array.isArray(tagCategories)
          ? extractTags(tagCategories)
          : [];
        this.plainTagsMap = new Map(
          this.plainTags.map((item) => [item.id, item]),
        );
      },
    );
  }

  reload = (): void => {
    this.proceedReload(allTags, () =>
      notifyUser.error(uiText('tags', 'loadError')),
    );
  };

  createTagCategory: typeof createTagCategory = (category) => {
    return createTagCategory(category);
  };

  deleteTagCategory: typeof deleteTagCategory = (id) => {
    return deleteTagCategory(id);
  };

  updateTagCategory: typeof updateTagCategory = (category) => {
    return updateTagCategory(category);
  };

  createTag: typeof createTag = (tag) => {
    return createTag(tag);
  };

  deleteTag: typeof deleteTag = (id) => {
    return deleteTag(id);
  };

  updateTag: typeof updateTag = (tag) => {
    return updateTag(tag);
  };
}
decorate(TagsManager, {
  plainTags: observable,
  plainTagsMap: observable,
});
