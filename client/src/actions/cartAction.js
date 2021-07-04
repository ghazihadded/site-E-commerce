import { ADD_CART, DELETE_CART, ADD_SHIPPING_INFO } from "./Types";

export const addCart = (product) => (dispatch, getState) => {
  dispatch({
    type: ADD_CART,
    payload: product,
  });

  localStorage.setItem("cart", JSON.stringify(getState().carts.cart));
};

export const deleteCart = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().carts.cart));
};

export const addShippingInfo = (form) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SHIPPING_INFO,
    payload: form,
  });

  localStorage.setItem(
    "shippingInfo",
    JSON.stringify(getState().carts.shippingInfo)
  );
};
