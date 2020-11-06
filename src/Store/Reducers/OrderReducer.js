import * as ActionTypes from "../Actions/ActionTypes";
let initialState = {
  showLoadingModal: false,
  orderHistory: [],
  purchaseCompleted : false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.POST_INGREDIENTS_PRESUBMIT:
      return {
        purchaseCompleted : false,
        ...state,
        showLoadingModal: true,
      };

    case ActionTypes.POST_INGREDIENTS_SUCCESS: {
      const newArray = state.orderHistory.concat(action.value);
      return {
        ...state,
        orderHistory: newArray,
        showLoadingModal: false,
        purchaseCompleted : true
      };
    }

    case ActionTypes.POST_INGREDIENTS_FAILURE:
      return {
        ...state,
        showLoadingModal: false,
        purchaseCompleted: true
      };

    default:
      return state;
  }
};

export default reducer;