import { UP_NEW_PASSWORD,UP_NEW_PASSWORD_FAIL } from '../actions/Types'

const initialState={
    error:"",
    
    succes:false,
}

const reducer=(state=initialState,action)=>{
      
    const {payload}=action
 
switch(action.type){
    case UP_NEW_PASSWORD:
        return {...state,succes:true,error:""}
    case UP_NEW_PASSWORD_FAIL:
            return {...state,error:payload,succes:false}
        default:        
    return state
}

}


export default reducer