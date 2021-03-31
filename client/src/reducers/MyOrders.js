import { GET_MY_ORDER,MY_ORDER_FAIL } from '../actions/Types'

const initialState={
    myOrders:[],
    
    loading:true,
}

const reducer=(state=initialState,action)=>{
      
    const {payload}=action
 
switch(action.type){
    case GET_MY_ORDER:
        return {...state,myOrders:payload,loading:false}
     case MY_ORDER_FAIL :
         return {...state,loading:false,myOrders:[]}
        case 'CLEAR_MYORDER':
            return {...state,loading:true,myOrders:[]}
        default:        
    return state
}

}


export default reducer