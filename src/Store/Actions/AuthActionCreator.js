import * as ActionTypes from "../Actions/ActionTypes";
import Axios from "axios";

export const authPreSubmit = () => {
  return {
    type: ActionTypes.AUTH_PRESUBMIT,
  };
};

export const authSuccess = (authData) => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    id: authData.localId,
    token: authData.idToken,
  };
};

export const authFailure = (authData) => {
  return {
    type: ActionTypes.AUTH_FAILURE,
    error: authData.response.data.error.message,
  };
};

export const authLogout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  return {
    type: ActionTypes.AUTH_LOGOUT,
    error: null,
    id: null,
    token: null,
  };
};

export const authLogOutUser = (timeOut) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, timeOut * 1000);
  };
};

export const authUser = (email, pass, isSignUp) => {
  return (dispatch) => {
    let postUrl =
      isSignUp === true
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFE34-G5RLC_tyHGzewgC4sHzbmykH8Oo"
        : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFE34-G5RLC_tyHGzewgC4sHzbmykH8Oo";
    dispatch(authPreSubmit());
    var authData = {
      email: email,
      password: pass,
      returnSecureToken: true,
    };
    Axios.post(postUrl, authData)
      .then((response) => {
        const expiryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem("id", response.data.localId);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiryDate", expiryDate);
        console.log(response.data);
        dispatch(authSuccess(response.data));
        dispatch(authLogOutUser(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFailure(error));
      });
  };
};

export const getAuthenticationInfoFromLocalStorageOrStore = () => {
  return (dispatch) => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expiryDate = new Date(localStorage.getItem("expiryDate"));
      if (expiryDate <= new Date()) {
        dispatch(authLogout());
      } else {
        var info = {
          localId: id,
          idToken: token,
          expiryDate: expiryDate,
        };
        dispatch(authSuccess(info));
        dispatch(
          authLogOutUser((expiryDate.getTime() - new Date().getTime())/1000)
        );
      }
    }
  };
};
