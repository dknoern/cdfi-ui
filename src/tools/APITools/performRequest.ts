import { uiStore } from 'store/uiStore';

export const performRequest = <T = void>(
  operationName: string,
  toDo: (operationName: string) => Promise<T>,
  config?: { blocking?: boolean },
): Promise<T> => {
  const usedConfig = Object.assign({ blocking: true }, config || {});

  if (usedConfig.blocking) uiStore.addLoading(operationName);

  return toDo(operationName).finally(() => {
    if (usedConfig.blocking) uiStore.endLoading(operationName);
  });
};
