import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultUserData = {
  user: 'seb',
  password: '123',
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
  const [user, setUser] = useState(defaultUserData.user);
  const [password, setPassword] = useState(defaultUserData.password);
  const [shoppingCart, setShoppingCart] = useState(
    defaultUserData.shoppingCart
  );

  function verifyCredentials(pUser, pPassword) {
    if (
      pUser === defaultUserData.user &&
      pPassword === defaultUserData.password
    ) {
      localStorage.setItem('key', 12345678);
      return true;
    } else {
      return false;
    }
  }

  function checkIfSignedIn() {
    let key = localStorage.getItem('key');
    if (key === null) {
      return false;
    } else {
      return true;
    }
  }

  function signOut() {
    localStorage.removeItem('key');
  }

  function clearCart() {
    setShoppingCart([]);
    localStorage.setItem('shoppingCart', JSON.stringify([]));
  }

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
    console.log(shoppingCart);
  }

  function removeFromCart(shoppingCartID) {
    const prodIndex = shoppingCart.findIndex(
      ({ cartID }) => cartID === shoppingCartID
    );
    let cart = [...shoppingCart];
    cart.splice(prodIndex, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    setShoppingCart(JSON.parse(localStorage.getItem('shoppingCart')));
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,

        shoppingCart,
        setShoppingCart,
        addToCart,
        clearCart,
        removeFromCart,
        checkIfAlreadyInCart,

        password,
        setPassword,

        verifyCredentials,
        checkIfSignedIn,
        signOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
