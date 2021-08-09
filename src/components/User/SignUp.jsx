import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { checkIfSignedIn, register } from '../../services/user-service';

export default function SignUp({ ...rest }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorUser, setErrorUser] = useState(false);
  const [errorPw, setErrorPw] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);

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

    if (email === '') {
      setErrorEmail(true);
      errors = true;
    } else {
      if (!validateEmail(email)) {
        setErrorEmail(true);
        errors = true;
      } else {
        setErrorEmail(false);
      }
    }

    if (firstName === '') {
      setErrorName(true);
      errors = true;
    } else {
      setErrorName(false);
    }

    if (lastName === '') {
      setErrorLastName(true);
      errors = true;
    } else {
      setErrorLastName(false);
    }
    return errors;
  }
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validation();
    if (!errors) {
      let registerFailed = register(firstName, lastName, email, password, user);
      if (!registerFailed) {
        setErrorRegister(true);
      } else {
        setErrorRegister(false);
        setTimeout(() => {
          setLoading(true);
          history.push('/signin');
        }, 1500);
      }
      //pName, pLastName, pEmail, pPassword, pUserName
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
                {loading ? (
                  <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <h2 className="form__title">Sign Up</h2>
                    <label className="form__label" htmlFor="first_name">
                      First Name:{' '}
                    </label>
                    <input
                      className="form__input"
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    {errorName && (
                      <p className="form__error">Please enter a First Name</p>
                    )}

                    <label className="form__label" htmlFor="last_name">
                      Last Name:{' '}
                    </label>
                    <input
                      className="form__input"
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                    {errorLastName && (
                      <p className="form__error">Please enter a Last Name</p>
                    )}

                    <label className="form__label" htmlFor="email">
                      E-Mail:{' '}
                    </label>
                    <input
                      className="form__input"
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    {errorEmail && (
                      <p className="form__error">Please enter a valid email</p>
                    )}

                    <label className="form__label" htmlFor="username">
                      Username:{' '}
                    </label>
                    <input
                      className="form__input"
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

                    <label className="form__label" htmlFor="password">
                      Password:{' '}
                    </label>
                    <input
                      className="form__input"
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
                    {errorRegister && (
                      <p className="form__error">Username already exists.</p>
                    )}
                    <button className="form__button">Register</button>
                  </>
                )}
              </form>
            </div>
            <Footer />
          </>
        )
      }
    />
  );
}
