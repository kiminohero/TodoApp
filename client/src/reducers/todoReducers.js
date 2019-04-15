import {
  FETCH_TODO,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  DONE_TODO
} from "../action/types";

export default (state = [], action) => {
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
      new_state[index].title = action.payload.title;
      new_state[index].description = action.payload.description;
      return new_state;
    case DONE_TODO:
      let i = state.findIndex(todo => todo._id === action.payload._id);
      const done_state = state;
      done_state[i].done = action.payload.done;
      done_state[i].title = action.payload.title;
      done_state[i].description = action.payload.description;
      return done_state;
    default:
      return state;
  }
};
