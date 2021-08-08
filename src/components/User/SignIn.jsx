import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/user/UserContext';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';

import ProductsPage from '../Product/ProductsPage';

export default function SignIn({ ...rest }) {
  const { verifyCredentials, checkIfSignedIn } = useContext(UserContext);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [signed, setSigned] = useState(false);

  const [errorUser, setErrorUser] = useState(false);
  const [errorPw, setErrorPw] = useState(false);
  const [errorCredentials, setErrorCredentials] = useState(false);
  useEffect(() => {
    const checkUser = () => {
      let valid = checkIfSignedIn();
      setSigned(valid);

      if (valid) {
        history.push('/products');
      }
    };

    checkUser();
  });
  const history = useHistory();

  function validation() {
    let errors = false;
    if (user === '') {
      setErrorUser(true);
      errors = true;
    } else {
      setErrorUser(false);
    }

    if (password === '') {
      setErrorPw(true);
      errors = true;
    } else {
      setErrorPw(false);
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validation();
    let verified = false;
    if (!errors) {
      verified = verifyCredentials(user, password);
      if (verified) {
        setErrorCredentials(false);
        history.push('/products');
      } else {
        setErrorCredentials(true);
      }
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? (
          {}
        ) : (
          <div className="form">
            <form className="form__card" onSubmit={handleSubmit}>
              <h2 className="form__title">Log In</h2>
              <label htmlFor="username">Username: </label>
              <input
                className="input"
                type="text"
                id="username"
                name="username"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
              {errorUser && (
                <p className="form__error">Please enter an Username</p>
              )}

              <label htmlFor="password">Password: </label>
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errorPw && (
                <p className="form__error">Please enter a Password</p>
              )}

              {errorCredentials && (
                <p className="form__error">Credentials are incorrect</p>
              )}
              <button className="form__button">Sign In</button>
            </form>
          </div>
        )
      }
    />
  );
}
