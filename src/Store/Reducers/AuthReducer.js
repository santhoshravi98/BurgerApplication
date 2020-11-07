import * as ActionTypes from "../Actions/ActionTypes";
let initialState = {
  id: null,
  token: null,
  error: null,
  showloadingModal: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_PRESUBMIT:
      return {
        ...state,
        error: false,
        showloadingModal: true,
      };

    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        showloadingModal: false,
        token: action.token,
        id: action.id,
      };

    case ActionTypes.AUTH_FAILURE:
      return {
        ...state,
        error: action.error,
        showloadingModal: false,
      };

    case ActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        error: action.error,
        id: action.id,
        token: action.token
      };

    default:
      return state;
  }
};
export default reducer;
