import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../store/user/UserContext';
import { ProductContext } from '../../store/product/ProductContext';

import ProductCartCard from '../Product/ProductCartCard';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
export default function Cart() {
  const { shoppingCart } = useContext(UserContext);
  const { getProduct } = useContext(ProductContext);

  let cartProds = [];

  shoppingCart.forEach((prod) => {
    let product = getProduct(prod.idProduct);
    product.cartID = prod.cartID;
    product.prodsInCart = prod.quantity;
    cartProds.push(product);
  });

  return (
    <>
      <Navbar />
      <div className="indivProd__links">
        <Link to="/products" className="indivProd__link">
          <FontAwesomeIcon className="indivProd__icon" icon={faChevronLeft} />{' '}
          Back to All
        </Link>
        <h2 className="indivProd__title">Shopping Cart</h2>
      </div>

      <div className="prodCart__container">
        {cartProds.length > 0 ? (
          cartProds.map((prod, key) => {
            return (
              <ProductCartCard
                product={prod}
                prodsInCart={prod.prodsInCart}
                prodCartID={prod.cartID}
                key={key}
              />
            );
          })
        ) : (
          <h1>Empty</h1>
        )}
      </div>

      <div className="btnsDiv">
        <div className="btnsDiv__child">
          <Link to="/checkout">
            <button className="btnsDiv__button">Check Out As Guest</button>
          </Link>
        </div>
        <div className="btnsDiv__child">
          <div className="btnsDiv__subChild">
            <p className="btnsDiv__text">Already have an account?</p>
            <Link to="/signin">
              <button className="btnsDiv__button">Log In</button>
            </Link>
          </div>
          <div className="btnsDiv__subChild">
            <p className="btnsDiv__text">No account yet.</p>
            <Link to="/">
              <button className="btnsDiv__button">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
