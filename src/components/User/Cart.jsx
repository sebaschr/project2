import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../store/user/UserContext';
import { ProductContext } from '../../store/product/ProductContext';
import { checkIfSignedIn } from '../../services/user-service';

import ProductCartCard from '../Product/ProductCartCard';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';
export default function Cart() {
  const { shoppingCart } = useContext(UserContext);
  const { getProduct } = useContext(ProductContext);

  let cartProds = [];
  const [logged, setLogged] = useState();

  shoppingCart.forEach((prod) => {
    let product = getProduct(prod.idProduct);
    product.cartID = prod.cartID;
    product.prodsInCart = prod.quantity;
    cartProds.push(product);
  });

  useEffect(() => {
    let auth = checkIfSignedIn();
    setLogged(auth);
  }, []);

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
          <div className="prodCart__empty">
            <h1 className="prodCart__empty__title">
              There are no products in the cart at this moment.
            </h1>
          </div>
        )}
      </div>

      <div className="btnsDiv">
        <div className="btnsDiv__child">
          <Link to="/checkout">
            <button className="btnsDiv__button">
              {!logged ? 'Check Out As Guest' : 'Check Out'}
            </button>
          </Link>
        </div>
        {!logged && (
          <div className="btnsDiv__child">
            <div className="btnsDiv__subChild">
              <p className="btnsDiv__text">Already have an account?</p>
              <Link to="/signin">
                <button className="btnsDiv__button">Log In</button>
              </Link>
            </div>
            <div className="btnsDiv__subChild">
              <p className="btnsDiv__text">No account yet?</p>
              <Link to="/register">
                <button className="btnsDiv__button">Sign Up</button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
