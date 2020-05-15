import api from "../utils/api";

import { uiStartLoading, uiStopLoading } from "./ui";
const Types = {
  FETCH_ORDER: "FETCH_ORDER",
  FETCH_ORDERS: "FETCH_ORDERS",
};

const initialState = {
  orders: [],
  order: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case Types.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

//action creators

export const createOrder = (input) => async (dispatch) => {
  dispatch(uiStartLoading());
  try {
    const { data } = await api.post("/order", input);
  } catch (error) {
  } finally {
    dispatch(uiStopLoading());
  }
};

export const deleteOrder = (IdEntrega) => async (dispatch) => {
  dispatch(uiStartLoading());
  try {
    await api.delete(`/order/${IdEntrega}`);
  } catch (error) {
  } finally {
    dispatch(uiStopLoading());
  }
};

export const fetchSingleOrder = (IdEntrega) => async (dispatch) => {
  dispatch(uiStartLoading());
  try {
    const { data } = await api.get(`/order/${IdEntrega}`);
    dispatch({ type: Types.FETCH_ORDER, payload: data.data });
  } catch (error) {
  } finally {
    dispatch(uiStopLoading());
  }
};
export const fetchOrders = () => async (dispatch) => {
  dispatch(uiStartLoading());
  try {
    const { data } = await api.get("/order");
    dispatch({ type: Types.FETCH_ORDERS, payload: data.data });
  } catch (error) {
  } finally {
    dispatch(uiStopLoading());
  }
};
