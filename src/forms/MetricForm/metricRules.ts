import { Rule, RuleObject } from 'antd/lib/form';
import { metrics as mgr } from '../../dataManagement';
import { Metric } from '../../types';

export const duplicateNameCheck = (metric: Metric | undefined): Rule => {
  const items = Array.isArray(mgr.store.data) ? mgr.store.data : [];
  const nameSet = new Set(
    items
      .map((item) => item.name)
      .filter((name) => name !== undefined)
      .map((name) => name.toLowerCase())
      .map((name) => name.trim()),
  );

  return {
    message: 'Name already exists',
    validator: (_: RuleObject, value: string): Promise<void> => {
      if (metric?.name === value) {
        return Promise.resolve();
      }

      if (value === undefined || nameSet.has(value.toLowerCase().trim())) {
        return Promise.reject();
      }

      return Promise.resolve();
    },
  };
};
