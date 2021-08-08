import React, { useEffect, useState, useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../../store/user/UserContext';
import SignIn from '../User/SignIn';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { checkIfSignedIn } = useContext(UserContext);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const checkUser = () => {
      let valid = checkIfSignedIn();
      setSigned(valid);
    };

    checkUser();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? <Component {...props} /> : <SignIn {...props} />
      }
    />
  );
};
