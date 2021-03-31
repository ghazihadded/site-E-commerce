import { GET_SEARCH_SUCCES,GET_SEARCH_FAIL,REQUEST_SEARCH} from '../actions/Types'

const initialState={
    productsSearch:[],
    loading:true,
    }

const reducer=(state=initialState,action)=>{
      const{payload}=action
   switch (action.type) {
       case GET_SEARCH_SUCCES :
          return {...state,loading:false,productsSearch:payload}
          case REQUEST_SEARCH :
          return {...state,loading:true}
          
       case GET_SEARCH_FAIL :
           return {...state,loading:false,productsSearch:[]}
       default:
        return state
   }
 


}


export default reducer