import {ADD_CART,DELETE_CART,ADD_SHIPPING_INFO} from '../actions/Types'

const initialState={
  cart:[] ,
  shippingInfo:{},  
}

 const reducer=(state=initialState,action)=>{
      
        const {payload}=action
     
    switch(action.type){
        case ADD_CART:
          const product=state.cart.find(el=>el.product._id===payload.product._id)
          if(product){
            return {...state,cart:state.cart.map(c=>c.product._id===payload.product._id?payload:c)}
          }else{

            return {...state,cart:[...state.cart,payload]}
          }
          case DELETE_CART:
            return {...state,cart:state.cart.filter(c=> c.product._id !== payload )}
            case ADD_SHIPPING_INFO:
              return {...state,shippingInfo:payload}
         default:        
        return state
    }
 }


 export default reducer