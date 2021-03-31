import {combineReducers} from 'redux'
import productReducer from './productsReducer'
import carts from './cartReducer'
import auth from'./authReducer'
import users from'./UsersReducer'
import order from './orderReducer'
import myOrders from './MyOrders'
import reviews from './ReviewsReducer'
import productsSearch from'./ProductsSearch'
import forgotPassword from'./ForgotPasswordReducer'
import userNewPassword from './userPassworReducer'
import alert from './Alert'

const reducer=combineReducers({
  productReducer,
  carts,
  auth,
  users,
  order,
  myOrders,
  reviews,
  productsSearch,
  forgotPassword,
  userNewPassword,
  alert,
})


export default reducer