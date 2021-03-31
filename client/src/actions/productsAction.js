import {
  PRODUCTS_FAIL,
  PRODUCTS_SUCCES,
  PRODUCTS_ALL_FAIL,
  PRODUCTS_ALL_SUCCES,
  PRODUCT_REQUEST,
  PRODUCT_ID_FAIL,
  PRODUCT_ID_SUCCES,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_UPDATE_SUCCES,
  CREATE_PROD_SUCCES,
  UPDATE_PRODUCT_SUCCES,
  DELETE_PRODUCT,
  ADD_REVIEWS,
  GET_REVIEWS_SUCCES,
  GET_REVIEWS_FAIL,
  GET_SEARCH_FAIL,
  GET_SEARCH_SUCCES,
  REQUEST_SEARCH,
} from "./Types";
import axios from "axios";

export const getAllProducts = (form) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/products",
      form
    );

    dispatch({
      type: PRODUCTS_SUCCES,
      payload: data,
    });
  } catch (err) {
   
    dispatch({
      type: PRODUCTS_FAIL,
    });
  }
};

export const getProducts = (form) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/products/all"
      
    );

    dispatch({
      type: PRODUCTS_ALL_SUCCES,
      payload: data,
    });
  } catch (err) {
   
    dispatch({
      type: PRODUCTS_ALL_FAIL,
    });
  }
};


export const getProductsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );

    dispatch({
      type: PRODUCT_ID_SUCCES,
      payload: data,
    });
  } catch (err) {
  
    const error = err.response.data;
    if (Array.isArray(error)) {
      error.forEach((err) => alert(err.msg));
    }

    dispatch({
      type: PRODUCT_ID_FAIL,
    });
  }
};

export const updateProduct = (form) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/admin/product",
      form
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCES,
      payload: data,
    });
  } catch (err) {
    
    const error = err.response.data;
    if (Array.isArray(error)) {
      error.forEach((err) => alert(err));
    }
  }
};

export const newProduct = (form) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/admin/product/new",
      form
    );
    dispatch({
      type: CREATE_PROD_SUCCES,
      payload: data,
    });
  } catch (err) {
   
    
    
  }
};

export const updateProductById = (id, form) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/product/${id}`,
      form
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCES,
      payload: data,
    });
   
  } catch (err) {
   
    const error = err.response.data;
    if (Array.isArray(error)) {
      error.forEach((err) => {
        alert(err.msg);
        
      });
    }
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:4000/api/v1//admin/product/delete/${id}`
    );
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  } catch (err) {
    const error = err.response.data;
    if (Array.isArray(error)) {
      return error.forEach((err) => alert(err.msg));
    }
  }
};

export const createReviews = (id, form) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/reviews/${id}`,
      form
    );
    dispatch({
      type: ADD_REVIEWS,
      payload: { id, data },
    });
  } catch (err) {
    const error = err.response.data;
    if (Array.isArray(error)) {
      return error.forEach((err) => alert(err.msg));
    }
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/admin/reviews/${id}`
    );
    dispatch({
      type: GET_REVIEWS_SUCCES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_REVIEWS_FAIL,
    });
  }
};

export const getSearchProducts = (search) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SEARCH });
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/admin/products/${search}`
    );
    dispatch({
      type: GET_SEARCH_SUCCES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_SEARCH_FAIL,
    });
  }
};
