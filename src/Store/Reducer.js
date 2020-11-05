import * as ActionTypes from "../Store/Actions";
let initialState = {
  ingredientsState: {
    Salad: 0,
    Bacon: 0,
    Cheese: 0,
    Meat: 0,
  },
  totalPrice: 0,
};
const PRICES = {
    Cheese :10,
    Bacon:20,
    Salad:30,
    Meat :40
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredientsState: {
          ...state.ingredientsState,
          [action.value]: state.ingredientsState[action.value] + 1,
        },
        totalPrice:state.totalPrice + PRICES[action.value]
      };
    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredientsState: {
          ...state.ingredientsState,
          [action.value]: state.ingredientsState[action.value] - 1,
        },
        totalPrice:state.totalPrice - PRICES[action.value]
      };
    default:
      return state;
  }
};
export default reducer;
