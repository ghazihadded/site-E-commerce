import React, { Fragment,useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {createUser} from '../../actions/authAction' 
import { useAlert } from 'react-alert'

const Register = ({history}) => {
    
     const [oldImage,setOldImage]=useState("")
     const {msg}=useSelector(state=>state.alert)
     const [form,setForm]=useState({
       name:"",
       email:"",
       password:"",
     })
     const {auth}=useSelector(state=>state.auth)
     const dispatch=useDispatch()
     const alert=useAlert()

     
    useEffect(() => {

      if (auth) {
          history.push('/')
      }
      
      if(msg){
        
        return  msg.forEach(err=> alert.error(err.msg))
     }
      

  }, [ auth, history,msg])
     
     
     
     const onChangeImg= async(e)=>{
        
      setOldImage(e.target.files[0]);
     }

    
     const onChange= async(e)=>{
     setForm({...form,[e.target.name]:e.target.value.trim()})
     }

     const onSubmit =async(e)=>{
      e.preventDefault();
      
      if(oldImage){
        const formData = new FormData();
      formData.append("profileImg", oldImage);
       const res=await axios.post("http://localhost:4000/api/user-profile", formData)
       setOldImage(res.data.imgCreated.profileImg)
       dispatch(createUser({...form,images:res.data.imgCreated.profileImg})) 
       setOldImage('')
      }else{
        
        dispatch(createUser(form))
      }

     }
     

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" encType="multipart/form-data" onSubmit={onSubmit} >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={oldImage?oldImage:"/images/default_avatar.jpg"}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                   <input
                    type="file"
                    name="images"
                    className="custom-file-input"
                    id="customFile"
                    accept="iamges/*"
                    onChange={onChangeImg }
                   
                  /> 
                   <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label> 
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
