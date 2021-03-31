import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const initialState={
  carts:{
   cart:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[],
   shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):[]
  }
}

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store=createStore(reducer,initialState,compose(applyMiddleware(thunk),devTools))


export default store