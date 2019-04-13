import axios from "axios";
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  FETCH_TODO,
  FETCH_USER
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data.currentUser
  });
};

export const fetchTodos = () => async dispatch => {
  const res = await axios.get("/api/todos");
  res.data.sort((a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
  });
  dispatch({
    type: FETCH_TODO,
    payload: res.data
  });
};

export const addTodo = (todo, history) => async dispatch => {
  const res = await axios.post("/api/todo", todo);
  history.push("/todos");
  dispatch({
    type: ADD_TODO,
    payload: res.data
  });
};

export const updateTodo = (todo, id, history) => async dispatch => {
  const res = await axios.put(`/api/todo/${id}`, todo);
  dispatch({
    type: UPDATE_TODO,
    payload: res.data
  });
  history.push("/todos");
};

export const deleteTodo = id => async dispatch => {
  const res = await axios.delete(`/api/todo/${id}`);
  dispatch({
    type: DELETE_TODO,
    payload: id
  });
};
