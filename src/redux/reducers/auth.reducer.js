import { isUserLoggedApi } from "../../services/token";
import { types } from "../types";

const user = isUserLoggedApi() ? isUserLoggedApi() : undefined;
const initialState = isUserLoggedApi()
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: undefined };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case types.loggout:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    default:
      return state;
  }
};
