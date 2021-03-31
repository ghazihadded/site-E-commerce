import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import Sidebar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import {getAllOrder,deleteOrder} from '../../actions/orderAction'


const OrdersList = ({ history }) => {

    const{orders,allOrdersLoading}=useSelector(state=>state.order)
   
    const dispatch = useDispatch();

    
   

    useEffect(() => {

        dispatch(getAllOrder())
    },[dispatch])

    

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice.toFixed(2)}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>orderDelete(order._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const orderDelete=(id)=>{
        dispatch(deleteOrder(id))
    }


    return (
        <Fragment>
           
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {allOrdersLoading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList