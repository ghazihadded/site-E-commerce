import React, { Fragment } from "react";
import GoogleLogin from 'react-google-login';
import {googleLogin} from '../../actions/usersAction'
import {useDispatch} from 'react-redux'



const LoginGoogle = () => {
    const disaptch=useDispatch()

    const responseSuccessGoogle=(response)=>{
      
       disaptch( googleLogin({tokenId:response.tokenId}))
       }
      
       const responseFailGoogle=(response)=>{
           
       }
  return (
    <div className="google-login" >
      <GoogleLogin
        clientId="498816183297-h1reipq3102m0d5tggtps63deoi73qod.apps.googleusercontent.com"
        buttonText="Login with google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseFailGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginGoogle;
