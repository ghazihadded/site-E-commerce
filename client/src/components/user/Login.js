import React, { Fragment, useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { useAlert } from 'react-alert'
import {loginUser} from '../../actions/authAction'

 const Login = ({history}) => {
      const [form,setForm]=useState({
          email:"",
          password:"",
      })
      const {auth}=useSelector(state=>state.auth)
      const {msg}=useSelector(state=>state.alert)
    
      const dispatch=useDispatch()
      const alert=useAlert()
      
      useEffect(()=>{
         
       if(auth){
           history.push('/')
       }
        if(msg){
           return  msg.forEach(err=> alert.error(err.msg))
        }

      },[auth,history,msg])
    
       const onChange=(e)=>{
           setForm({...form,[e.target.name]:e.target.value.trim()})
       } 
       const handleSubmit=(e)=>{
           e.preventDefault()
          dispatch(loginUser(form))
       }

    return (
        <Fragment>
             <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={handleSubmit} >
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                       onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        onChange={onChange}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">New User?</Link>
                            </form>
                        </div>
                    </div>

            
            </Fragment>
    )
}



export default Login