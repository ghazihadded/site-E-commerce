import React, { Fragment } from "react";
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {addCart,deleteCart} from '../../actions/cartAction'

const ItemCart = ({history}) => {

       const {cart}=useSelector(state=>state.carts)
       const {auth}=useSelector(state=>state.auth)
        const dispatch=useDispatch()

      const increment=(stockP,stock,product)=>{
          if(stock<stockP){
             stock++
          }
          dispatch(addCart({product,stock}))
      }
      
    const decrement=(stockP,stock,product)=>{
      if(stock>1){
         stock--
      }
      dispatch(addCart({product,stock}))
  }

  const removeCart=(id)=>{
    dispatch(deleteCart(id))
  }

  const checkoutHandler = () => {
   if(!auth) {
     history.push('/login')
    }else{
      history.push('/shipping')
    }
}

  return (
    <Fragment>
      {cart.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{cart.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cart.map((item) => (
                <Fragment>
                  <hr />

                  <div className="cart-item" key={item.product.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.product.images?item.product.images[0].url:""}
                          alt="***"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product._id}`}>
                          {item.product.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.product.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={()=>decrement(item.product.stock,item.stock,item.product)}
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.stock}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={()=>increment(item.product.stock,item.stock,item.product)}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={()=>removeCart(item.product._id)}
                        ></i>
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
                  total:{" "}
                  <span className="order-summary-values">
                    
                  {cart.reduce((acc, item) => acc + item.stock * item.product.price, 0).toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ItemCart;
