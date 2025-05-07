export enum ActionType {
  SHOW_TAGS = 'showTags',
  SHOW_FREQUENCY = 'showFrequency',
  SHOW_CATEGORY = 'showCategory',
  SHOW_RENAME = 'showRename',
  SHOW_MOVE = 'showMove',
  SHOW_TAG_CATEGORY = 'showTagCategory',
}

type StateType = {
  showTags: boolean;
  showFrequency: boolean;
  showCategory: boolean;
  showRename: boolean;
  showMove: boolean;
  showTagCategory: boolean;
};

type Args = {
  type: ActionType;
};

export const initialState: StateType = {
  showTags: false,
  showFrequency: false,
  showCategory: false,
  showRename: false,
  showMove: false,
  showTagCategory: false,
};

export const editButtonsReducer = (
  state: StateType,
  { type }: Args,
): StateType => {
  switch (type) {
    case ActionType.SHOW_TAGS:
      return {
        ...initialState,
        showTags: !state.showTags,
      };
    case ActionType.SHOW_CATEGORY:
      return {
        ...initialState,
        showCategory: !state.showCategory,
      };
    case ActionType.SHOW_FREQUENCY:
      return {
        ...initialState,
        showFrequency: !state.showFrequency,
      };
    case ActionType.SHOW_RENAME:
      return {
        ...initialState,
        showRename: !state.showRename,
      };
    case ActionType.SHOW_MOVE:
      return {
        ...initialState,
        showMove: !state.showMove,
      };
    case ActionType.SHOW_TAG_CATEGORY:
      return {
        ...initialState,
        showTagCategory: !state.showTagCategory,
      };
    default:
      return state;
  }
};
