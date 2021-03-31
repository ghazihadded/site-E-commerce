import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPasswordt } from '../../actions/authAction'

const NewPassword = ({ history }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
  const {error,succes}=useSelector(state=>state.userNewPassword)
   
    const dispatch = useDispatch();

    

    useEffect(() => {

      if(succes){
        alert('Password updated successfully')
        history.push('/login')
      }

      if(error){
        error.forEach(err=> alert(err.msg))
      }
        

    }, [succes,error,history])

    const submitHandler = (e) => {
        e.preventDefault();

       dispatch(createNewPasswordt({password,confirmPassword}))
    }

    return (
        <Fragment>

         

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default NewPassword