import { FormAction, stopSubmit } from "redux-form";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

export type InititialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

const authReducer = (state = initialState, action: ActionsType): InititialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
      case "SN/AUTH/GET_CAPTCHA_URL_SUCCESS":
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) => ({
    type: "SN/AUTH/SET_USER_DATA", payload: { userId, email, login, isAuth }
  } as const),
  getCaptchaUrlSuccess: (
    captchaUrl: string
  ) => ({
    type: "SN/AUTH/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl }
  } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.me();

  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
      let data = await authAPI.login(
        email,
        password,
        rememberMe,
        captcha
      );

      if (data.resultCode === 0) {
        dispatch(getAuthUserData());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }

            let messages =
                data.messages.length > 0
                    ? data.messages[0]
                    : "Some error";
            dispatch(stopSubmit("login", { _error: messages }));
        }
    };

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode !== 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
