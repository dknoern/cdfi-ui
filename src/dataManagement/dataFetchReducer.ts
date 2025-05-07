import { Reducer } from 'react';

export type State<DataType> = {
  data: DataType | null;
  isLoading: boolean;
  hasError: boolean;
};

export const initialState = {
  data: null,
  isLoading: true,
  hasError: false,
};

export enum ActionType {
  FETCH_ERROR = 'FETCH_ERROR',
  FETCHED = 'FETCHED',
  INITIAL_STATE = 'INITIAL_STATE',
}

type Action<DataType> = {
  type: ActionType;
  payload?: DataType;
};

export const createDataFetchReducer = <DataType>() => (
  state: State<DataType>,
  { type, payload }: Action<DataType>,
): State<DataType> => {
  switch (type) {
    case ActionType.FETCHED:
      return {
        ...state,
        data: payload as DataType,
        hasError: false,
        isLoading: false,
      };
    case ActionType.FETCH_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    case ActionType.INITIAL_STATE:
      return {
        ...state,
        data: null,
        isLoading: true,
        hasError: false,
      };
    default:
      return state;
  }
};

type ReducerAction<DataType> = 'reset' | 'error' | DataType;

export const dataFetchReducer = <DataType>(
  state: State<DataType>,
  payload: ReducerAction<DataType>,
): State<DataType> => {
  switch (payload) {
    case 'reset':
      return {
        data: null,
        isLoading: true,
        hasError: false,
      };
    case 'error':
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    default:
      return {
        data: payload,
        hasError: false,
        isLoading: false,
      };
  }
};

export type ReducerType<DataType> = Reducer<
  State<DataType>,
  ReducerAction<DataType>
>;
