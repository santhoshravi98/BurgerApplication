import * as ActionTypes from "../Actions/ActionTypes";
import Axios from '../../Axios-order'

export const addIngredient = (ingName) => {
  return {
    type: ActionTypes.ADD_INGREDIENT,
    value: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: ActionTypes.REMOVE_INGREDIENT,
    value: ingName,
  };
};

export const fetchIngredient = (ing) => {
    return {
        type : ActionTypes.FETCH_INGREDIENTS_SUCCESS,
        value:ing
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type:ActionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        Axios.get("ing.json").then(response => {
            dispatch(fetchIngredient(response.data));
        }).catch(error => {
                dispatch(fetchIngredientsFailed());
        })
    }
}