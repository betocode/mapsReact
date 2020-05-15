import api from "../utils/api";

import { uiStartLoading, uiStopLoading } from "./ui";
const Types = {
  CREATE_USER: "CREATE_USER",
  FETCH_USER: "FETCH_USER",
  DESTROY_SESSION: "DESTROY_SESSION",
};

const initialState = {
  user: {},
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };

    case Types.DESTROY_SESSION:
      return {
        ...state,
        user: {},
        isAuth: false,
      };

    default:
      return state;
  }
};

export default reducer;

//action creators

export const authUser = (input) => async (dispatch) => {
  dispatch(uiStartLoading());
  try {
    const { data } = await api.post("/login", input);

    dispatch({ type: Types.FETCH_USER, payload: data.data });
    await localStorage.setItem("authToken", data.data.token);

    dispatch(validateUser());
  } catch (error) {
    throw error;
  } finally {
    dispatch(uiStopLoading());
  }
};

export const validateUser = () => async (dispatch) => {
  const token = await localStorage.getItem("authToken");

  if (!token) {
    localStorage.removeItem("authToken");
  }

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const { data } = await api.get("/auth");
    dispatch({ type: Types.FETCH_USER, payload: data.data });
  }
};

export const createUser = (input) => async (dispatch) => {
  dispatch(uiStartLoading());
  try {
    const { data } = await api.post("/register", input);
  } catch (error) {
    throw Error;
  } finally {
    dispatch(uiStopLoading());
  }
};

export const destroySession = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: Types.DESTROY_SESSION });
};
