import {
  CREATE_USER_SUCCES,
  CREATE_USER_FAIL,
  USER_FAIL,
  USER_SUCCES,
  UPDATE_PASS_SUCCES,
  UPDATE_USER_SUCCES,
  LOGIN_FAIL,
  LOGIN_SUCCES,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
  UP_NEW_PASSWORD,
  UP_NEW_PASSWORD_FAIL,
} from "./Types";

import axios from "axios";
import SetToken from "../headers/SetToken";

export const createUser = (form) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:4000/api/user", form);
   
    dispatch({
      type: CREATE_USER_SUCCES,
      payload: data,
    });
   
  } catch (err) {

    dispatch({
      type: LOGIN_FAIL,
      payload:err.response.data
    });
   setTimeout(()=>{
    dispatch({
      type: "CLEAR_ALERT",
      
    });

   },4000)
    
   
  }
};

export const getUser = () => async (dispatch) => {
   if(localStorage.token){
    SetToken(localStorage.token)
    
  } 

  try {
    const { data } = await axios.get("http://localhost:4000/api/user/auth");

    dispatch({
      type: USER_SUCCES,
      payload: data,
    });
  } catch (err) {
    
    dispatch({
      type: USER_FAIL,
    });
  }
};

export const updatePassword = (form) => async (dispatch) => {
  
  try {
    await axios.put("http://localhost:4000/api/user/password", form);

    dispatch({
      type: UPDATE_PASS_SUCCES,
    });
  } catch (err) {
    
  }
};

export const loginUser = (form) => async (dispatch) => {
  try {
    
    const { data } = await axios.post(
      "http://127.0.0.1:4000/api/user/auth",
      form
     
    );

    dispatch({
      type: LOGIN_SUCCES,
      payload: data,
    });
   
  } catch (err) {
   
    /* const error = err.response.data;
    if (Array.isArray(error)) {
      return error.forEach((err) => alert(err.msg));
    } */

    dispatch({
      type: LOGIN_FAIL,
      payload:err.response.data
    });
   setTimeout(()=>{
    dispatch({
      type: "CLEAR_ALERT",
      
    });

   },4000)

  }
};

export const logout=()=> dispatch=>{
  dispatch({
    type:USER_FAIL
  })
}

export const updateUser = (form) => async (dispatch) => {
  if(localStorage.token){
    SetToken(localStorage.token)
  }
  try {
    const { data } = await axios.put(
      "http://localhost:4000/api/user/auth",
      form
    );

    dispatch({
      type: UPDATE_USER_SUCCES,
      payload: data,
    });
   
  } catch (err) {
    const error = err.response.data;
    if (Array.isArray(error)) {
      return error.forEach((err) => alert(err.msg));
    }

    
  }
};


export const passwordForget= (form) => async (dispatch) => {
  
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/user/auth/password",
      form
    );

    dispatch({
      type: FORGOT_PASSWORD,
      payload: data,
    });
   
  } catch (err) {
   
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:err.response.data,
    });

    setTimeout(()=>{
      dispatch({type:"CLEAR_ERROR"})
   },3000)
    
  }
};

export const passwordReset= (form) => async (dispatch) => {
  
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/user/restPassword",
      form
    );

    dispatch({
      type: RESET_PASSWORD,
      payload: data,
    });
   
  } catch (err) {
   
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:err.response.data
    });

     setTimeout(()=>{
       dispatch({type:"CLEAR_ERROR"})
    },3000) 
    
  }
};


export const createNewPasswordt= (form) => async (dispatch) => {
  
  try {
      await axios.put(
      "http://localhost:4000/api/user/newPassword",
      form
    );

    dispatch({
      type: UP_NEW_PASSWORD,
      
    });
   
  } catch (err) {
   
    dispatch({
      type: UP_NEW_PASSWORD_FAIL,
      payload:err.response.data
    });

    
    
  }
};