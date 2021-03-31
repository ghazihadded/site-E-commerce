import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'


const OrderSuccess = ({history}) => {
 
    const { succes } = useSelector((state) => state.order);
    const dispatch=useDispatch()
    
    useEffect(()=>{
         
        if (!succes) {
            history.push("/");
          }
        return()=>{
            dispatch({type:"CLEAR_SUCCES_ORDER"})
        }
    },[dispatch,succes,history])

    return (
        <Fragment>

            

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />

                    <h2>Your Order has been placed successfully.</h2>

                    <Link to="/orders/me">Go to Orders</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess