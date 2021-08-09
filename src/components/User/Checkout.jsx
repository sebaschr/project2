import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../store/user/UserContext';
import { ProductContext } from '../../store/product/ProductContext';
import React, { useContext } from 'react';
import CreditCardForm from '../Form/CreditCardForm';
import Footer from '../Footer/Footer';

export default function Checkout() {
  const { shoppingCart } = useContext(UserContext);
  const { getProduct } = useContext(ProductContext);

  let cartProds = [];

  shoppingCart.forEach((prod) => {
    let product = getProduct(prod.idProduct);
    product.cartID = prod.cartID;
    product.prodsInCart = prod.quantity;
    cartProds.push(product);
  });

  let total = 0;
  cartProds.forEach((prod) => {
    total = total + prod.price * prod.prodsInCart;
  });

  return (
    <>
      <Navbar />
      <section className="checkout">
        <p className="checkout__title">Payment</p>
        <p className="checkout__sum">
          Total: <span className="checkout__total">${total}</span>
        </p>
        <CreditCardForm />
      </section>
      <Footer />
    </>
  );
}
