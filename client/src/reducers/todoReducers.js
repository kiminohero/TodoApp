import {
  FETCH_TODO,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO
} from "../action/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_TODO:
      return action.payload;
    case DELETE_TODO:
      return state.filter(todo => todo._id !== action.payload);
    case ADD_TODO:
      return [action.payload, ...state];
    case UPDATE_TODO:
      let index = state.findIndex(todo => todo._id === action.payload._id);
      const new_state = state;
      new_state[index].description = action.payload.description;
      return new_state;
    default:
      return state;
  }
};
