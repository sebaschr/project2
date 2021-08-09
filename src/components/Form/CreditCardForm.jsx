import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { validateCard } from '../../services/card-service';
import { UserContext } from '../../store/user/UserContext';

export default function CreditCardForm(props) {
  const { clearCart } = useContext(UserContext);
  const [cardNumber, setCardNumber] = useState();
  const [holder, setHolder] = useState('');
  const [date, setDate] = useState();
  const [zip, setZIP] = useState(0);
  const [ccv, setCcv] = useState(0);

  const history = useHistory();
  const [invalidCardNumber, setInvalidCardNumber] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorZip, setErrorZip] = useState(false);
  const [errorCCV, setErrorCCV] = useState(false);
  const [errorName, setErrorName] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    let errors = validate();
    if (!errors) {
      notify();
      setLoading(true);
      clearCart();
      setTimeout(() => {
        history.push('/');
      }, 5000);
    }
  }

  function validate() {
    let validCard = validateCard(cardNumber);
    let errors = false;

    if (cardNumber === '' || !validCard) {
      setInvalidCardNumber(true);
      errors = true;
    } else {
      setInvalidCardNumber(false);
    }

    if (holder === '') {
      setErrorName(true);
      errors = true;
    } else {
      setErrorName(false);
    }
    let today = new Date();

    let todayForComparison = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      0,
      -today.getTimezoneOffset()
    );

    let dateNow = new Date(date);

    if (date === '') {
      setErrorDate(true);
    } else {
      if (dateNow < todayForComparison) {
        setErrorDate(true);
      } else {
        setErrorDate(false);
      }
    }

    if (zip.toString().length < 3 || zip.toString().length > 5) {
      setErrorZip(true);
      errors = true;
    } else {
      setErrorZip(false);
    }

    if (ccv.toString().length < 3 || ccv.toString().length > 4) {
      setErrorCCV(true);
      errors = true;
    } else {
      setErrorCCV(false);
    }

    return errors;
  }
  const notify = () =>
    toast.info(`Transaction Completed! Thanks for your purchase!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="form">
      <form
        className="form__card"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="form__title">Credit Card Information</h2>
        <label className="form__label" htmlFor="name">
          Name on Card:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form__input"
          onChange={(e) => {
            setHolder(e.target.value);
          }}
        />
        {errorName && <p className="form__error">Please enter a name:</p>}

        <label className="form__label" htmlFor="card_number">
          Card Number:
        </label>
        <input
          type="number"
          id="card_number"
          name="card_number"
          className="form__input"
          onClick={(e) => {
            setCardNumber(e.target.value);
          }}
          onChange={(e) => {
            setCardNumber(e.target.value);
          }}
        />
        {invalidCardNumber && (
          <p className="form__error">Please enter a valid number:</p>
        )}

        <label className="form__label" htmlFor="expiration_date">
          Expiration Date:
        </label>
        <input
          type="date"
          id="expiration_date"
          name="expiration_date"
          className="form__input"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        {errorDate && <p className="form__error">Please enter a valid date</p>}
        <label className="form__label" htmlFor="zip">
          ZIP Code:
        </label>
        <input
          type="number"
          id="zip"
          name="zip"
          onChange={(e) => {
            setZIP(e.target.value);
          }}
          className="form__input"
        />
        {errorZip && <p className="form__error">Please enter a valid ZIP</p>}

        <label className="form__label" htmlFor="ccv">
          CCV:
        </label>
        <input
          type="number"
          id="ccv"
          name="ccv"
          className="form__input"
          onChange={(e) => {
            setCcv(e.target.value);
          }}
        />
        {errorCCV && <p className="form__error">Please enter a valid CCV</p>}

        <button disabled={loading ? true : false} className="form__button">
          Submit Payment
        </button>
      </form>
    </div>
  );
}
