import {
  ALL_USERS_FAIL,
  ALL_USERS_SUCCES,
  USER_ID_SUCCES,
  USER_ID_FAIL,
  REQUEST_ID_USER,

  UPDATE_USERID_SUCCES,
  DELETE_USER
} from "./Types";
import axios from "axios";
import setToken from "../headers/SetToken";

export const getAllUsers = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const { data } = await axios.get("http://localhost:4000/api/user/all");
    dispatch({
      type: ALL_USERS_SUCCES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ALL_USERS_FAIL,
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ID_USER });
    const { data } = await axios.get(`http://localhost:4000/api/user/${id}`);
    dispatch({
      type: USER_ID_SUCCES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_ID_FAIL,
    });
  }
};

export const updateUserById = (id,form) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ID_USER });
    const { data } = await axios.put(`http://localhost:4000/api/user/by/${id}`,form);
    dispatch({
      type: UPDATE_USERID_SUCCES,
      payload: data,
    });
    
  } catch (err) {
   
    const error = err.response.data;
    if (Array.isArray(error)) {
      return error.forEach((err) => alert(err.msg));
    }
   
  }
};


export const deleteUser = (id) => async (dispatch) => {
  try {
    
    await axios.delete(`http://localhost:4000/api/user/${id}`);
    dispatch({
      type:DELETE_USER,
      payload:id,
    });
  } catch (err) {
    const error = err.response.data;
    if (Array.isArray(error)) {
      return error.forEach((err) => alert(err.msg));
    }
  }
};