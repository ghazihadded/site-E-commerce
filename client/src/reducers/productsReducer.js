import {
  PRODUCTS_FAIL,
  PRODUCTS_SUCCES,
  PRODUCTS_ALL_FAIL,
  PRODUCTS_ALL_SUCCES,
  PRODUCT_ID_FAIL,
  PRODUCT_ID_SUCCES,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_REQUEST,
  CREATE_PROD_SUCCES,
  UPDATE_PRODUCT_SUCCES,
  DELETE_PRODUCT,
  ADD_REVIEWS,
} from "../actions/Types";

const initialState = {
  loading: true,
  products: [],
  product: null,
  productLoading: true,
  succes: "",
  isUpdate: false,
};

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, productLoading: true };
    case PRODUCT_REQUEST:
      return { ...state, loading: true };
    case PRODUCTS_SUCCES:
      return {
        ...state,
        loading: false,
        products: payload.product,
        totalPages: payload.totalPages,
        totalProducts: payload.totalPorducts,
      };
    case PRODUCTS_FAIL:
      return { ...state, loading: false, products: [] };
    case PRODUCTS_ALL_SUCCES:
      return { ...state, loading: false, products: payload };
    case PRODUCTS_ALL_FAIL:
      return { ...state, loading: false, products: [] };
    case PRODUCT_ID_SUCCES:
      return { ...state, productLoading: false, product: payload.product };
    case PRODUCT_ID_FAIL:
      return { ...state, productLoading: false, product: null };
    case UPDATE_PRODUCT_SUCCES:
      return { ...state, product: payload.product, isUpdate: true };
    case CREATE_PROD_SUCCES:
      return {
        ...state,
        products: [payload.product, ...state.products],
        succes: payload.succes,
      };
    
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };
    case ADD_REVIEWS:
      return {
        ...state,
        product: {
          ...state.product,
          reviews: payload.data.reviews,
          ratings: payload.data.ratings,
        },
      };
    case "CLEAR_SUCCES":
      return { ...state, succes: false };
    case "CLEAR_UP_PRODUCT":
      return { ...state, isUpdate: false };
    default:
      return state;
  }
};

export default reducer;
