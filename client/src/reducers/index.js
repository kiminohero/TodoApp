import { combineReducers } from "redux";
import authReducer from "./authReducer";
import todoReducers from "./todoReducers";

export default combineReducers({
  auth: authReducer,
  todo: todoReducers
});
