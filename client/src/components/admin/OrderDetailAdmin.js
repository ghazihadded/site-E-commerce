import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import Sidebar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails,updateOrderStatus } from "../../actions/orderAction";


const OrderDetailAdmin = ({ match }) => {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const { orderDetail, loading } = useSelector((state) => state.order);

  
  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const {
    shippingInfo,
    orderItems,
    user,
    totalPrice,
    orderStatus,
  } = orderDetail;


  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

const statusUpdate=()=>{
    dispatch(updateOrderStatus(match.params.id,{status}))
}

  return (
    <Fragment>
     
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Order # {orderDetail._id}</h2>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingInfo && shippingInfo.phone}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount:</b> ${totalPrice}
                  </p>

                  <hr />
                  
                  <h4 className="my-4">Order Status:</h4>
                  <p
                    className={
                      orderDetail.orderStatus &&
                      String(orderDetail.orderStatus).includes("Delivered")
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items:</h4>

                  <hr />
                  <div className="cart-item my-1">
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.price}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                     value={status}
                     onChange={(e)=> setStatus(e.target.value) }
                    >
                      <option value="Processing">Processing</option>
                     
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                   onClick={statusUpdate}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetailAdmin;
