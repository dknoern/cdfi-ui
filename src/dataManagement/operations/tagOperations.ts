import { TagCategory, Tag } from 'types';
import { apiProcessor } from 'tools/apiProcessor';
import { uiStore } from 'store/uiStore';

export const allTags = (): Promise<TagCategory[]> => {
  const OPERATION = 'metricTagCategoryAll';

  uiStore.addLoading(OPERATION);

  return apiProcessor.get(OPERATION).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const createTagCategory = (
  category: Pick<TagCategory, 'name' | 'parentId'>,
): Promise<void> => {
  const OPERATION = 'metricTagCategoryCreate';

  uiStore.addLoading(OPERATION);

  return apiProcessor.post(OPERATION, null, category).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const deleteTagCategory = (id: TagCategory['id']): Promise<void> => {
  const OPERATION = 'metricTagCategoryDelete';

  uiStore.addLoading(OPERATION);

  return apiProcessor.delete(OPERATION, id).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const updateTagCategory = (
  category: Pick<TagCategory, 'name' | 'id' | 'parentId'>,
): Promise<void> => {
  const OPERATION = 'metricTagCategoryUpdate';

  uiStore.addLoading(OPERATION);

  return apiProcessor.patch(OPERATION, null, category).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const createTag = (
  tag: Pick<Tag, 'name' | 'description'> & { category: { id: number } },
): Promise<void> => {
  const OPERATION = 'tagCreate';

  uiStore.addLoading(OPERATION);

  return apiProcessor.post(OPERATION, null, tag).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const deleteTag = (id: TagCategory['id']): Promise<void> => {
  const OPERATION = 'tagDelete';

  uiStore.addLoading(OPERATION);

  return apiProcessor.delete(OPERATION, id).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const updateTag = (tag: Tag): Promise<void> => {
  const OPERATION = 'tagUpdate';

  uiStore.addLoading(OPERATION);

  return apiProcessor.patch(OPERATION, null, tag).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};
