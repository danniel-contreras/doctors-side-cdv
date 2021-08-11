import { decodeToken, setToken,removeToken } from "../../services/token";
import { types } from "../types";

export const newLogin = (data) => {
  return (dispatch) => {
    setToken(data);
    dispatch(login(decodeToken(data)));
  };
};

export function login(data) {
  return {
    type: types.login,
    payload: data,
  };
}

export const newLoggout = () => {
  return (dispatch) => {
    removeToken()
    dispatch(loggout());
  };
};

export function loggout() {
  return {
    type: types.loggout,
    payload: {},
  };
}
