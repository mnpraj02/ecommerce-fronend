import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "../reducers";

let store;
export function configureStore() {
  // added thunk middleware and logger middleware(logs the action when performed)
  store = createStore(reducer, applyMiddleware(thunk, logger));
  return store;
}
