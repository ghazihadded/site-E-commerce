import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById,updateUserById} from '../../actions/usersAction'
import Loader from '../layout/Loader'


const UpdateUser = ({ history, match }) => {

    const {isLoading,user,succes}=useSelector(state=>state.users)

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [role,setRole]=useState('')
    
    const dispatch = useDispatch();

    const userId=match.params.id
    useEffect(() => {
        if(!user ){

             dispatch(getUserById(userId))
        }else if(user._id!==userId) {
            dispatch(getUserById(userId))
            
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }

        if(succes){
            history.push('/admin/users')
        }

        return ()=>{
            dispatch({type:"CLEAR_SUCCES"})
        }
        
}, [dispatch,user,match.params.id,succes,history,userId])

   

   const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(updateUserById(match.params.id,{name,email,role}))
   }
  
    if(isLoading){
        <Loader />
    }

    return (
        <Fragment>
            
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={onSubmit} >
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                       
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                      
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e)=>setRole(e.target.value)}
                                        
                                        
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser