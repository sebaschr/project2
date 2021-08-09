import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreditCardForm(props) {
  function handleSubmit(event) {
    notify();
  }
  const notify = () =>
    toast.info(`Item added to the cart`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  function cardValidation() {}
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Credit Card Information</h2>
      <label htmlFor="name">Name on Card:</label>
      <input
        type="text"
        id="name"
        name="name"
        // onChange={(e) => {
        //   setTitle(e.target.value);
        // }}
        className="form__input"
      />

      <label htmlFor="card_number">Card Number:</label>
      <input
        type="number"
        id="card_number"
        name="card_number"
        // onChange={(e) => {
        //   setTitle(e.target.value);
        // }}
        className="form__input"
      />

      <label htmlFor="expiration_date">Card Number:</label>
      <input
        type="date"
        id="expiration_date"
        name="expiration_date"
        // onChange={(e) => {
        //   setTitle(e.target.value);
        // }}
        className="form__input"
      />
      {/* {errorTitle && <p className="form__error">Please enter a Title</p>} */}
      <label htmlFor="zip">ZIP Code:</label>
      <input
        type="number"
        id="zip"
        name="zip"
        // onChange={(e) => {
        //   setTitle(e.target.value);
        // }}
        className="form__input"
      />

      <label htmlFor="ccv">CCV:</label>
      <input type="number" id="ccv" name="ccv" className="form__input" />
      <button className="form__button">Submit Payment</button>
    </form>
  );
}
