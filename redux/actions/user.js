import axios from "axios";
import { server } from "../store";

import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
} from "../reducers/userReducers";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/me`, { withCredentials: true });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(""));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });

    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};
