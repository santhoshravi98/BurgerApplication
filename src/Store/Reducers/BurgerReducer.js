import * as ActionTypes from "../Actions/ActionTypes";
let initialState = {
  ingredientsState: null,
  totalPrice: 0,
  apiError: false,
};
const PRICES = {
  Cheese: 10,
  Bacon: 20,
  Salad: 30,
  Meat: 40,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredientsState: {
          ...state.ingredientsState,
          [action.value]: state.ingredientsState[action.value] + 1,
        },
        totalPrice: state.totalPrice + PRICES[action.value],
      };
    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredientsState: {
          ...state.ingredientsState,
          [action.value]: state.ingredientsState[action.value] - 1,
        },
        totalPrice: state.totalPrice - PRICES[action.value],
      };
    case ActionTypes.FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsState: action.value,
        apiError: false,
        totalPrice : 0
      };
    case ActionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        apiError: true,
      };
    default:
      return state;
  }
};
export default reducer;
