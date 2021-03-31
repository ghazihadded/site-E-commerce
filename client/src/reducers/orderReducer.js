import {
  CREATE_ORDER_SUCCES,
  GET_ORDER_ID,
  MY_ORDER_ID_FAIL,
  GET_ALLORDER_FAIL,
  GET_ALLORDER_SUCCES,
  DELETE_ORDER,
} from "../actions/Types";

const initialState = {
  order: null,
  orderDetail: {},
  loading: true,
  succes: false,
  orders: [],
  allOrdersLoading: true,
};

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case CREATE_ORDER_SUCCES:
      return { ...state, order: payload, succes: true };
    case "CLEAR_SUCCES_ORDER":
      return { ...state, succes: false };
    case GET_ORDER_ID:
      return { ...state, orderDetail: payload, loading: false };
    case MY_ORDER_ID_FAIL:
      return { ...state, order: null, loading: false };
    case GET_ALLORDER_SUCCES:
        return { ...state, orders:payload.order,totalAmount:payload.totalAmount , allOrdersLoading: false }; 
    case GET_ALLORDER_FAIL:
            return { ...state, orders:[], allOrdersLoading: false }; 
    case DELETE_ORDER:
            return { ...state, orders:state.orders.filter(order=>order._id!==payload) }; 
    default:
      return state;
  }
};

export default reducer;
