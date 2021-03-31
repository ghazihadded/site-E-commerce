import {
  CREATE_USER_SUCCES,
  CREATE_USER_FAIL,
  USER_SUCCES,
  USER_FAIL,
  UPDATE_PASS_SUCCES,
  UPDATE_USER_SUCCES,
  LOGIN_FAIL,
  LOGIN_SUCCES,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD,
} from "../actions/Types";

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  auth: false,
  isLoading: true,
  resetSucces:false,
  error:"",
  succes:false
};

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case CREATE_USER_SUCCES:
    case LOGIN_SUCCES:
    case RESET_PASSWORD:
      localStorage.setItem('token',payload.token)
      return { ...state, auth: true, isLoading: false, user: payload.newUser,resetSucces:true };

    case UPDATE_PASS_SUCCES:
    case USER_FAIL:
    case CREATE_USER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return { ...state, auth: false, isLoading: false, user: null };

    case USER_SUCCES:
      return { ...state, isLoading: false, user: payload, auth: true };
      case UPDATE_USER_SUCCES:
        return { ...state, user: payload.user ,succes:true};
    case RESET_PASSWORD_FAIL:
          return { ...state, error:payload}; 
    case "CLEAR_SUCCES_UP":
      return {...state,succes:false}
         
     case "CLEAR_ERROR":
      return { ...state, error:""}; 
    case"CLEAR_SUCCES_FORGOT":       
    return { ...state,resetSucces:false ,error:""  };
      default:
      return state;
  }
};

export default reducer;
