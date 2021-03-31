import { FORGOT_PASSWORD,FORGOT_PASSWORD_FAIL } from '../actions/Types'

const initialState={
   succes:false,
   message:"",
   errorForgot:"",
}

const reducer=(state=initialState,action)=>{
      
    const {payload}=action
 
switch(action.type){
    case FORGOT_PASSWORD:
        return {...state,succes:true,message:payload.message}

        case"CLEAR_SUCCES_FORGOT":
    case FORGOT_PASSWORD_FAIL:
         return {...state,succes:false,message:"",errorForgot:payload}
    case "CLEAR_ERROR":
            return { ...state, errorForgot:""}; 
        default:        
    return state
}

}


export default reducer