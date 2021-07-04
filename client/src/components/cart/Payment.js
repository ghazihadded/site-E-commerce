import React, { Fragment, useEffect } from "react";

import CheckoutSteps from "./CheckoutSteps";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderAction";
import { errorAlert } from "../../actions/alert";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({ history }) => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cart, shippingInfo } = useSelector((state) => state.carts);
  const { succes } = useSelector((state) => state.order);

  useEffect(() => {
    if (succes) {
      history.push("/succes");
    }
  }, [succes, history]);

  const order = {
    orderItems: cart,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderinfo"));
  if (orderInfo) {
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    let res;

    try {
      res = await axios.post(
        "http://localhost:4000/api/payment/process",
        paymentData
      );
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
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
          dispatch(
            createOrder({
              shippingInfo,
              orderItems,
              totalPrice: orderInfo.totalPrice,
            })
          );
        } else {
          alert.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;

      dispatch(errorAlert());
    }
  };

  return (
    <Fragment>
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
