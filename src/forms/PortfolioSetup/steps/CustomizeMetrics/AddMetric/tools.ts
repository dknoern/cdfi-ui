import { Store } from 'antd/lib/form/interface';
import { formStore } from 'forms/PortfolioSetup/formStore';
import { extractTagsIds } from 'tools/tagsTool';

export const addMetric = (values: Store): void => {
  formStore.addNewMetric({
    id: Date.now(),
    isNew: true,
    name: values.name,
    accountCode: values.accountCode,
    typeConfig: values.typeConfig,
    parentId: values.parentId,
    grandParentId: values.grandParentId,
    tags: extractTagsIds(values.tags),
  });
};
