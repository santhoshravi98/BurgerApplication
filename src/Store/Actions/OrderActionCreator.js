import * as ActionTypes from "../Actions/ActionTypes";
import Axios from "../../Axios-order";
export const postIngredientsSuccess = (data) => {
  return {
    type: ActionTypes.POST_INGREDIENTS_SUCCESS,
    value: data,
  };
};
export const postIngredientsFailure = () => {
  return {
    type: ActionTypes.POST_INGREDIENTS_FAILURE,
  };
};
export const postIngredientsPreSubmit = () => {
    return {
      type: ActionTypes.POST_INGREDIENTS_PRESUBMIT,
    };
  };
export const postIngredients = (postData) => {
  return dispatch => {
      dispatch(postIngredientsPreSubmit());
    Axios.post("/orders.json", postData)
      .then((response) => {
          const orderInformation = {
              id:response.data.name,
              order:postData
          }
        dispatch(postIngredientsSuccess(orderInformation));
        //   this.props.history.push("/");
      })
      .catch((error) => {
        dispatch(postIngredientsFailure());
      });
  };
};
