import { GET_REVIEWS_FAIL,GET_REVIEWS_SUCCES } from '../actions/Types'

const initialState={
    reviews:[],
    
    loading:true,
}

const reducer=(state=initialState,action)=>{
      
    const {payload}=action
 
switch(action.type){
    case GET_REVIEWS_SUCCES:
        return {...state,reviews:payload.reviews,loading:false}
     case GET_REVIEWS_FAIL :
         return {...state,loading:false,reviews:[]}
        case 'CLEAR_MYREVIEWS':
            return {...state,loading:true,reviews:[]}
        default:        
    return state
}

}


export default reducer