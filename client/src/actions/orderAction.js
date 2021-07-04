import {
  CREATE_ORDER_SUCCES,
  GET_MY_ORDER,
  MY_ORDER_FAIL,
  GET_ORDER_ID,
  MY_ORDER_ID_FAIL,
  GET_ALLORDER_FAIL,
  GET_ALLORDER_SUCCES,
  UP_STATUS_FAIL,
  UP_STATUS_SUCCES,
  DELETE_ORDER,
} from "./Types";
import axios from "axios";
import setToken from "../headers/SetToken";

export const createOrder = (form) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:4000/api/order", form);
    dispatch({
      type: CREATE_ORDER_SUCCES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    const error = err.response.data;
    if (Array.isArray(error)) {
      error.forEach((err) => alert(err.msg));
    }
  }
};

export const getMyOrder = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const { data } = await axios.get("http://localhost:4000/api/order/me");
    dispatch({
      type: GET_MY_ORDER,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDER_FAIL,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/api/order/${id}`);
    dispatch({
      type: GET_ORDER_ID,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDER_ID_FAIL,
    });
  }
};

export const getAllOrder = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/order/admin/all"
    );
    dispatch({
      type: GET_ALLORDER_SUCCES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALLORDER_FAIL,
    });
  }
};

export const updateOrderStatus = (id, form) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/order/status/${id}`,
      form
    );
    console.log(data);
    dispatch({
      type: UP_STATUS_SUCCES,
      payload: data,
    });
    alert("succes");
  } catch (err) {
    const error = err.response.data;
    if (Array.isArray(error)) {
      error.forEach((err) => alert(err.msg));
    }

    dispatch({
      type: UP_STATUS_FAIL,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/api/order/admin/delete/${id}`);
    dispatch({
      type: DELETE_ORDER,
      payload: id,
    });
  } catch (err) {
    const error = err.response.data;
    if (Array.isArray(error)) {
      return error.forEach((err) => alert(err.msg));
    }
  }
};
