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

export const postIngredients = (postData,token) => {
  return (dispatch) => {
    dispatch(postIngredientsPreSubmit());
    if(token)
    {
    Axios.post("/orders.json?auth="+token, postData)
      .then((response) => {
        const orderInformation = {
          id: response.data.name,
          order: postData,
        };
        dispatch(postIngredientsSuccess(orderInformation));
        //   this.props.history.push("/");
      })
      .catch((error) => {
        dispatch(postIngredientsFailure());
      });
    }
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: ActionTypes.FETCH_ORDERS_SUCCESS,
    value: orders,
  };
};

export const fetchOrdersFailure = () => {
  return {
    type: ActionTypes.FETCH_ORDERS_FAILURE,
  };
};

export const fetchOrders = (token,userToken) => {
  return (dispatch) => {
    const queryParams = '?auth='+token+'&orderBy="userToken"&equalTo="'+userToken+'"'
    Axios.get("orders.json"+queryParams)
      .then((response) => {
        let ingArray = [];
        for (let i in response.data) {
          ingArray.push(response.data[i]);
        }
        dispatch(fetchOrdersSuccess(ingArray));
      })
      .catch((error) => {
        dispatch(fetchOrdersFailure());
      });
  };
};
