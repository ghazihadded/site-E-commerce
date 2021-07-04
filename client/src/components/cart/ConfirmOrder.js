import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";

const ConfirmOrder = ({ history }) => {
  const { cart, shippingInfo } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.stock,
    0
  );

  const processToPayment = () => {
    const data = {
      totalPrice,
    };
    sessionStorage.setItem("orderinfo", JSON.stringify(data));
    history.push("/payment");
  };

  /*  const ordreConfirm = () => {
    const orderItems = [];
    cart.forEach((cart) =>
      orderItems.push({
        name: cart.product.name,
        quantity: cart.stock,
        image: cart.product.images[0].url,
        price: cart.product.price,
        product: cart.product._id,
      })
    );
    dispatch(createOrder({ shippingInfo, orderItems, totalPrice }));
    
  }; */

  return (
    <Fragment>
      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phone}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cart.map((item) => (
            <Fragment>
              <hr />
              <div className="cart-item my-1" key={item.product._id}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.product.image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product._id}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.stock} x ${item.product.price} ={" "}
                      <b>${(item.stock * item.product.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
