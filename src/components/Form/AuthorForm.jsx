import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

export default function Form(props) {
  const [name, setName] = useState('First name');
  const [last_name, setLastName] = useState('Last Name');
  const [bio, setBio] = useState('Bio');
  const [email, setEmail] = useState('Email');
  const history = useHistory();

  const [errorName, setErrorName] = useState(false);
  const [errorLast_name, setErrorLastName] = useState(false);
  const [errorBio, setErrorBio] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  function validation() {
    let errors = false;
    if (name === '') {
      errors = true;
      setErrorName(true);
    } else {
      setErrorName(false);
    }

    if (last_name === '') {
      errors = true;
      setErrorLastName(true);
    } else {
      setErrorLastName(false);
    }

    if (bio === '') {
      errors = true;
      setErrorBio(true);
    } else {
      setErrorBio(false);
    }
    if (email === '') {
      errors = true;
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validation();
    if (!errors) {
      // addAuthor(name, last_name, bio, email);
      history.push(`/authors`);
    }
  }

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Add New Author</h2>
        <label htmlFor="autorTitle">First Name:</label>
        <input
          className="form__input"
          type="text"
          id="autorTitle"
          name="autorTitle"
          type="text"
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {errorName && <p className="form__error">Please enter a Name</p>}

        <label htmlFor="bookDesc">Last Name: </label>
        <input
          className="form__input"
          type="text"
          id="bookDesc"
          name="bookDesc"
          type="text"
          defaultValue={last_name}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        {errorLast_name && (
          <p className="form__error">Please enter a Last Name</p>
        )}

        <label htmlFor="bookDesc">Bio: </label>
        <input
          className="form__input --description"
          type="text"
          id="bookDesc"
          name="bookDesc"
          type="text"
          defaultValue={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        {errorBio && <p className="form__error">Please enter a Bio</p>}

        <label htmlFor="email">Email: </label>
        <input
          className="form__input"
          type="text"
          id="email"
          name="email"
          type="text"
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {errorEmail && <p className="form__error">Please enter an Email</p>}

        <button className="form__button">Add Author</button>
      </form>
    </>
  );
}
