import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ItemCart from "./components/cart/ItemCart";
import HomePage from "./components/homePage/HomePage";
import Navbar from "./components/navbar/Navbar";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import UpdatePassword from "./components/user/UpadtePassword";
import UpdateProfile from "./components/user/UpadteProfile";
import store from "./store/store";
import { getUser } from "./actions/authAction";
import PrivateRoute from "./components/privateRouter/PrivateRouter";
import Dashboard from "./components/admin/Dashboad";
import UsersList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductsList from "./components/admin/ProductsList";
import UpdateProduct from "./components/admin/UpdateProduct";
import CreateProduct from "./components/admin/CreateProduct";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSucces";
import ListeOrder from "./components/order/ListeOrder";
import OrderDetail from "./components/order/orderDetail";
import OrderList from "./components/admin/OrderList";
import OrderDetailAdmin from "./components/admin/OrderDetailAdmin";
import ProductReviews from "./components/admin/ProductReviews";
import searchProducts from "./components/searchProducts/searchProducts";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import SetToken from "./headers/SetToken";
import "./App.css";
import LoginGoogle from "./components/user/LoginGoogle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Payment from "./components/cart/Payment";

if (localStorage.token) {
  SetToken(localStorage.token);
}

function App() {
  const [stripeApi, setStripeApi] = useState("");

  useEffect(() => {
    store.dispatch(getUser());

    const getStripApiKey = async () => {
      if (localStorage.token) {
        SetToken(localStorage.token);
      }
      const { data } = await axios.get("http://localhost:4000/api/stripeapi");
      console.log(data);
      setStripeApi(data.stripeapikey);
    };
    getStripApiKey();
  }, []);
  console.log(stripeApi);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container container-fluid">
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/google" component={LoginGoogle} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/products/:search" component={searchProducts} />
          <Route path="/cart" component={ItemCart} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} />
          <PrivateRoute path="/password/new" component={NewPassword} exact />
          <PrivateRoute path="/me" component={Profile} exact />
          <PrivateRoute path="/me/update" component={UpdateProfile} />
          <PrivateRoute path="/password/update" component={UpdatePassword} />
          <PrivateRoute path="/shipping" component={Shipping} />
          <PrivateRoute path="/confirm" component={ConfirmOrder} />
          <PrivateRoute path="/succes" component={OrderSuccess} />
          <PrivateRoute path="/orders/me" component={ListeOrder} />
          <PrivateRoute path="/order/:id" component={OrderDetail} />
          {stripeApi && (
            <Elements stripe={loadStripe(stripeApi)}>
              <PrivateRoute path="/payment" component={Payment} />
            </Elements>
          )}
        </div>
        <PrivateRoute path="/dashboard" isAdmin={true} component={Dashboard} />
        <PrivateRoute
          path="/admin/users"
          exact
          isAdmin={true}
          component={UsersList}
        />
        <PrivateRoute
          path="/admin/user/:id"
          exact
          isAdmin={true}
          component={UpdateUser}
        />
        <PrivateRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <PrivateRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        <PrivateRoute
          path="/admin/product"
          isAdmin={true}
          component={CreateProduct}
          exact
        />
        <PrivateRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
          exact
        />
        <PrivateRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={OrderDetailAdmin}
          exact
        />
        <PrivateRoute
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
          exact
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
