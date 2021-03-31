import { LOGIN_FAIL } from '../actions/Types'

const initialState={
  msg:"" ,
}

 const reducer=(state=initialState,action)=>{
      
        const {payload}=action
     
    switch(action.type){
        case LOGIN_FAIL:
        
          return {...state,msg:payload}
        case "CLEAR_ALERT":
            return {...state,msg:""}  
    
         default:        
        return state
    }
 }


 export default reducer