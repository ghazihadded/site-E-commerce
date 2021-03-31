import {
  ALL_USERS_FAIL,
  ALL_USERS_SUCCES,
  USER_ID_FAIL,
  USER_ID_SUCCES,
  REQUEST_ID_USER,
  UPDATE_USERID_SUCCES,
  DELETE_USER,
} from "../actions/Types";

const initialState = {
  isloading: true,
  users: [],
  isLoading: true,
  user: null,
};

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case ALL_USERS_SUCCES:
      return { ...state, isloading: false, users: payload };
    case ALL_USERS_FAIL:
      return { ...state, isloading: false, users: [] };
    case REQUEST_ID_USER:
      return { ...state, isLoading: true };
    case USER_ID_SUCCES:
      return { ...state, isLoading: false, user: payload };
    case USER_ID_FAIL:
      return { ...state, isLoading: false };
      case UPDATE_USERID_SUCCES:
      return { ...state, user:payload,succes:true };
      case DELETE_USER:
      return { ...state, users:state.users.filter(el=>el._id!==payload) };
      case "CLEAR_SUCCES":
          return {...state,succes:false}
    default:
      return state;
  }
};

export default reducer;
