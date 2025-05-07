import { Reducer } from 'react';

export const booleanReducer: Reducer<boolean, any> = (state, action) => {
  if (typeof action === 'boolean') {
    return action;
  }
  return !state;
};
