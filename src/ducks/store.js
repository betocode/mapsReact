import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import uiReducer from "./ui";
import authReducer from "./auth";
import orderReducer from "./order";

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  order: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
