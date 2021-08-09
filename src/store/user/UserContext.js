import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { useEffect } from 'react';
import { updateCart } from '../../services/user-service';

const secretKey = 'pxq';

const defaultUserData = {
  shoppingCart: () => {
    let cart = localStorage.getItem('shoppingCart');
    if (cart === null) {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
    }
    cart = localStorage.getItem('shoppingCart');
    cart = JSON.parse(cart);
    return cart;
  },
};

export const UserContext = createContext(defaultUserData);

export const UserProvider = (props) => {
  const [password, setPassword] = useState(defaultUserData.password);
  const [shoppingCart, setShoppingCart] = useState(
    defaultUserData.shoppingCart
  );
  function checkIfAlreadyInCart(prodId) {
    let cart = [...shoppingCart];
    const cartIndex = cart.findIndex(({ idProduct }) => idProduct === prodId);
    return cartIndex;
  }

  function addToCart(product) {
    let cart = [...shoppingCart];
    let added = checkIfAlreadyInCart(product.idProduct);
    if (added === -1) {
      product.cartID = uuidv4();
      cart.push(product);
    } else {
      cart[added].quantity += product.quantity;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    setShoppingCart(JSON.parse(localStorage.getItem('shoppingCart')));
    let user = localStorage.getItem('key');
    if (user) {
      updateCart(user);
    }
  }

  function removeFromCart(shoppingCartID) {
    const prodIndex = shoppingCart.findIndex(
      ({ cartID }) => cartID === shoppingCartID
    );
    let cart = [...shoppingCart];
    cart.splice(prodIndex, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    setShoppingCart(JSON.parse(localStorage.getItem('shoppingCart')));
    let user = localStorage.getItem('key');
    if (user) {
      updateCart(user);
    }
  }

  function updateQuantity(shoppingCartID, amount) {
    const prodIndex = shoppingCart.findIndex(
      ({ cartID }) => cartID === shoppingCartID
    );
    let cart = [...shoppingCart];
    cart[prodIndex].quantity = amount;
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    setShoppingCart(JSON.parse(localStorage.getItem('shoppingCart')));
    let user = localStorage.getItem('key');
    if (user) {
      updateCart(user);
    }
  }

  function clearCart() {
    setShoppingCart([]);
    localStorage.setItem('shoppingCart', JSON.stringify([]));
    let user = localStorage.getItem('key');

    if (user) {
      updateCart(user);
    }
  }

  function loadCart() {
    setShoppingCart(JSON.parse(localStorage.getItem('shoppingCart')));
  }

  return (
    <UserContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        addToCart,
        removeFromCart,
        checkIfAlreadyInCart,
        updateQuantity,
        password,
        setPassword,
        clearCart,
        loadCart,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
