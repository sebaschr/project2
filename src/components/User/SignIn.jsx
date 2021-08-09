import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { UserContext } from '../../store/user/UserContext';
import {
  checkIfSignedIn,
  verifyCredentials,
} from '../../services/user-service';

export default function SignIn({ ...rest }) {
  const { loadCart } = useContext(UserContext);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        loadCart();
        setTimeout(() => {
          history.push('/products');
        }, 1500);
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
          <>
            <Navbar />
            <div className="form">
              <form className="form__card" onSubmit={handleSubmit}>
                <h2 className="form__title">Log In</h2>
                <label htmlFor="username" className="form__label">
                  Username:{' '}
                </label>
                <input
                  className={!errorUser ? 'form__input' : 'form__input --error'}
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

                <label htmlFor="password" className="form__label">
                  Password:{' '}
                </label>
                <input
                  className={!errorPw ? 'form__input' : 'form__input --error'}
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
                <button
                  disabled={loading ? true : false}
                  className="form__button"
                >
                  Sign In
                </button>
                <br />
                <p>Don't have account yet?</p>
                <Link to="/register" className="form__link">
                  Register
                </Link>
              </form>
            </div>
            <Footer />
          </>
        )
      }
    />
  );
}
