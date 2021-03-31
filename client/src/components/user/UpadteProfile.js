import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/authAction";

const UpdateProfile = ({ history }) => {
  const [avatarPreview, setAvatarPreview] = useState("");
  const[avatar,setAvatar]=useState("/images/default_avatar.jpg")
  const dispatch = useDispatch();
  const alert=useAlert()

  const { user,succes } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    if(user){
       setForm({...form,name:user.name,email:user.email})
       if(user.images){
           setAvatar(user.images)
       }
    }
    if(succes){
      alert.success('profile has been changed')
      dispatch({type:"CLEAR_SUCCES_UP"})
    }
  }, [user,succes]);

 
 

 
  const onChangeImg = async (e) => {
    const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
               
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
        setAvatarPreview(e.target.files[0])
  };
  const onChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (avatarPreview) {
      const formData = new FormData();
      formData.append("profileImg", avatarPreview);
      const res = await axios.post(
        "http://localhost:4000/api/user-profile",
        formData
      );
      setAvatar(res.data.imgCreated.profileImg )
      dispatch(updateUser({ ...form, images: res.data.imgCreated.profileImg }));
    } else {
      dispatch(updateUser(form));
    }
  };

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={onSubmit}
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={form.name}
                onChange={onChange}
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
                value={form.email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatar}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChangeImg}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
