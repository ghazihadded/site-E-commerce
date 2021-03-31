import React,{Fragment} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link,Route} from 'react-router-dom'
import {logout} from '../../actions/authAction'
import Search from './Search'

 const Navbar = () => {

    const {cart}=useSelector(state=>state.carts)
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()

    const userLogout=()=>{
        dispatch(logout())
    }

    return (
        <Fragment>
            
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/endpoint.png" alt="shopit"/>
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
               <Route  render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cart.length>0?cart.length:0}</span>
                        </Link>
                        {user?<div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user &&user.images}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/"  onClick={userLogout} >
                                   Logout 
                                </Link>

                            </div>


                        </div>:<Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                        </div>
                        </nav>
        </Fragment>
    )
}


export default Navbar