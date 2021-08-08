import React, { useContext, useRef, useState } from 'react';
import { ProductContext } from '../../store/author/ProductContext';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';

export default function Form(props) {
  const { authors, addBook } = useContext(ProductContext);
  const [selectValue, setSelectValue] = useState(authors[0].id);

  const [title, setTitle] = useState('Title');
  const [year, setYear] = useState(1990);
  const [price, setPrice] = useState(1000);
  const [description, setDescription] = useState('Desc');

  const history = useHistory();

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorYear, setErrorYear] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);

  function validation() {
    let errors = false;
    if (title === '') {
      errors = true;
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
    if (year === 0 || price === '') {
      errors = true;
      setErrorYear(true);
    } else {
      setErrorYear(false);
    }

    if (price === 0 || price === '') {
      errors = true;
      setErrorPrice(true);
    } else {
      setErrorPrice(false);
    }

    if (description === '') {
      errors = true;
      setErrorDescription(true);
    } else {
      setErrorDescription(false);
    }

    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validation();
    if (!errors) {
      addBook(parseInt(selectValue), title, year, price, description);
      history.push(`/authors/${selectValue}`);
    }
  }

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Add New Book</h2>
        <label htmlFor="bookTitle">Title</label>
        <input
          type="text"
          id="bookTitle"
          name="bookTitle"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="form__input"
        />
        {errorTitle && <p className="form__error">Please enter a Title</p>}

        <label htmlFor="bookDesc">Description: </label>
        <input
          type="text"
          id="bookDesc"
          name="bookDesc"
          type="text"
          defaultValue={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="form__input"
        />
        {errorDescription && (
          <p className="form__error">Please enter a Description</p>
        )}

        <label htmlFor="bookYear">Year</label>
        <input
          type="text"
          id="bookYear"
          name="bookYear"
          type="number"
          placeholder={year}
          defaultValue={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          className="form__input"
        />
        {errorYear && <p className="form__error">Please enter a Year</p>}

        <label htmlFor="Price">Price</label>
        <input
          type="text"
          id="Price"
          name="Price"
          type="number"
          placeholder={price}
          defaultValue={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="form__input"
        />

        {errorPrice && <p className="form__error">Please enter a Price</p>}

        <select
          defaultValue={selectValue}
          onChange={(e) => {
            setSelectValue(e.target.value);
          }}
          className="form__input"
        >
          {authors.map((author, key) => {
            return (
              <option key={key} value={author.id}>
                {author.first_name} {author.last_name}
              </option>
            );
          })}
        </select>
        <button className="form__button">Add Book</button>
      </form>
    </>
  );
}
