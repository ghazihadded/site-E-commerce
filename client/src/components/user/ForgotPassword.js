import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { passwordForget,passwordReset } from '../../actions/authAction'

const ForgotPassword = ({history}) => {

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const{succes,message,errorForgot}=useSelector(state=>state.forgotPassword)
    const{resetSucces,error}=useSelector(state=>state.auth)
   
    const dispatch = useDispatch();

    

    useEffect(() => {

        if(resetSucces){
            history.push('/password/new')
        }
        return ()=>{
            dispatch({
                type:"CLEAR_SUCCES_FORGOT"
            })
        }

    }, [resetSucces,history,dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        
            dispatch(passwordForget({email}))
      }

    const submitCodeHandler=(e)=>{
        e.preventDefault();
        dispatch(passwordReset({email,code}))
    }

    return (
        <Fragment>
            

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" >
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <h6 style={{width:"130%"}}>{message}</h6>
                            {errorForgot && errorForgot.map(err=>(<p style={{color:"red"}}>{err.msg}</p>))}
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                               value={email}
                               onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            onClick={submitHandler}
                            >
                            Send Email
                    </button>
                    {succes && (
                     <Fragment >
                    <div className="form-group">
                            <label htmlFor="email_field">your code</label>
                            <input
                                type="text"
                                id="email_field"
                                className="form-control"
                                value={code}
                                onChange={(e)=>setCode(e.target.value)}
                            />
                        </div>
                        {error && error.map(err=>(<p style={{color:"red"}}>{err.msg}</p>))}
                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            onClick={submitCodeHandler}
                            >
                            Send 
                    </button>
                    
                    </Fragment>
                    )}

                    </form>
                    
                </div>
            </div>

        </Fragment>
    )
}

export default ForgotPassword