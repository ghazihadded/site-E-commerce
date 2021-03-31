import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ isAdmin, component: Component, ...rest }) => {
  const { auth, user, isLoading } = useSelector((state) => state.auth);

  return (
    <div>
    
     
     {!isLoading &&
      
      <Route
        {...rest}
        render={(props) =>{
            if (!auth ) {
                return <Redirect to='/login' />
            }

            if (isAdmin === true && user.role !== 'admin') {
                return <Redirect to="/" />
            }
          return <Component {...props} />
        }
    }
      />}
    </div>
  );
};

export default PrivateRouter;
