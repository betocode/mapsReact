const Types = {
  UI_START_LOADING: "UI_START_LOADING",
  UI_STOP_LOADING: "UI_STOP_LOADING",
  UI_OPEN_DIALOG: "UI_OPEN_DIALOG",
  UI_UPDATE_DIALOG: "UI_UPDATE_DIALOG",
  UI_CLOSE_DIALOG: "UI_CLOSE_DIALOG",
};

const initialState = {
  dialog: {
    isVisible: false,
    title: "",
    subtitle: "",
    buttons: [],
  },
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UI_START_LOADING:
      return { ...state, isLoading: true };
    case Types.UI_STOP_LOADING:
      return { ...state, isLoading: false };
    case Types.UI_OPEN_DIALOG:
      return {
        ...state,
        dialog: { ...state.dialog, isVisible: true },
      };
    case Types.UI_UPDATE_DIALOG:
      return {
        ...state,
        dialog: { ...state.dialog, ...action.payload },
      };
    case Types.UI_CLOSE_DIALOG:
      return {
        ...state,
        dialog: { ...state.dialog, isVisible: false },
      };
    default:
      return state;
  }
};

export default reducer;

//action creators
export const uiOpenDialog = (content) => (dispatch) => {
  dispatch({ type: Types.UI_UPDATE_DIALOG, payload: { ...content } });

  return dispatch({ type: Types.UI_OPEN_DIALOG });
};

export const uiCloseDialog = () => {
  return { type: Types.UI_CLOSE_DIALOG };
};

export const uiStartLoading = () => {
  return { type: Types.UI_START_LOADING };
};

export const uiStopLoading = () => {
  return { type: Types.UI_STOP_LOADING };
};
