
import  React,{ useEffect } from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import ItemCart from './components/cart/ItemCart';
import HomePage from './components/homePage/HomePage';
import Navbar from './components/navbar/Navbar';
import ProductDetail from './components/product/ProductDetail';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Register from './components/user/Register';
import UpdatePassword from './components/user/UpadtePassword';
import UpdateProfile from './components/user/UpadteProfile';
import store from './store/store'
import {getUser} from './actions/authAction'
import PrivateRoute from './components/privateRouter/PrivateRouter'
import Dashboard from './components/admin/Dashboad';
import UsersList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ProductsList from './components/admin/ProductsList';
import UpdateProduct from './components/admin/UpdateProduct';
import CreateProduct from './components/admin/CreateProduct';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrderSucces';
import ListeOrder from './components/order/ListeOrder';
import OrderDetail from './components/order/orderDetail';
import OrderList from './components/admin/OrderList';
import OrderDetailAdmin from './components/admin/OrderDetailAdmin';
import ProductReviews from './components/admin/ProductReviews';
import searchProducts from './components/searchProducts/searchProducts';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import SetToken from './headers/SetToken'
import './App.css';



if(localStorage.token){
  SetToken(localStorage.token)
  
}

function App() {

useEffect(()=>{
   
  store.dispatch(getUser())
},[])

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="container container-fluid">
      <Route path='/'exact component={HomePage} />  
      <Route path='/login' component={Login} />
      <Route path='/product/:id' component={ProductDetail}  />
      <Route path='/products/:search' component={searchProducts}  />
      <Route path='/cart' component={ItemCart}  />
      <Route path='/register' component={Register} />
      <Route path='/password/forgot' component={ ForgotPassword } />
      <PrivateRoute path="/password/new" component={NewPassword} exact />      
      <PrivateRoute path="/me" component={Profile} exact />
      <PrivateRoute path='/me/update' component={UpdateProfile} />
      <PrivateRoute path='/password/update' component={UpdatePassword} />
      <PrivateRoute path='/shipping' component={Shipping} />
      <PrivateRoute path='/confirm' component={ConfirmOrder} />
      <PrivateRoute path='/succes' component={OrderSuccess} />
      <PrivateRoute path='/orders/me' component={ ListeOrder } />
      <PrivateRoute path='/order/:id' component={ OrderDetail } />
      </div>
      <PrivateRoute path='/dashboard' isAdmin={true} component={Dashboard} />
      <PrivateRoute path='/admin/users' exact isAdmin={true} component={UsersList} />
      <PrivateRoute path='/admin/user/:id' exact isAdmin={true} component={UpdateUser} />
      <PrivateRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
      <PrivateRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
      <PrivateRoute path="/admin/product" isAdmin={true} component={CreateProduct} exact />
      <PrivateRoute path='/admin/orders' isAdmin={true} component={ OrderList } exact />
      <PrivateRoute path='/admin/order/:id' isAdmin={true} component={ OrderDetailAdmin } exact />
      <PrivateRoute path='/admin/reviews' isAdmin={true} component={ ProductReviews } exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
