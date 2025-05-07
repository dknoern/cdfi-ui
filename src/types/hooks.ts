import { VoidFn } from './misc';

export interface DataHookResult {
  isLoading: boolean;
  hasError: boolean;
}

export interface DataHookResultWithReload extends DataHookResult {
  reload: VoidFn;
}

export interface FetchHookResult<DataType> {
  isLoading: boolean;
  hasError: boolean;
  data: DataType | null;
}

export interface FetchHookResultWithReload<T> extends FetchHookResult<T> {
  reload: VoidFn;
}

export interface DataHook<HookProps, ResultData> {
  (args?: HookProps): FetchHookResultWithReload<ResultData>;
}
