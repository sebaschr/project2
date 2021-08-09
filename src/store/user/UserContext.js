import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import USERS from '../../data/users.json';
import { useEffect } from 'react';

const secretKey = 'pxq';

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

  const [users, setUsers] = useState();

  useEffect(() => {
    let pUsers = USERS;
    pUsers.forEach((user) => {
      var ciphertext = CryptoJS.AES.encrypt('123', secretKey).toString();
      user.password = ciphertext;
    });
    setUsers(pUsers);
  }, []);
  // // Encrypt
  // var ciphertext = CryptoJS.AES.encrypt("123", secretKey).toString();

  // // Decrypt
  // var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  // var originalText = bytes.toString(CryptoJS.enc.Utf8);

  function verifyCredentials(pUser, pPassword) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === pUser) {
        var bytes = CryptoJS.AES.decrypt(users[i].password, secretKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
      }
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

  function register(pName, pLastName, pEmail, pPassword, pUserName) {
    var encryptedPw = CryptoJS.AES.encrypt(pPassword, secretKey).toString();
    let newUser = {
      username: pUserName,
      password: encryptedPw,
      first_name: pName,
      last_name: pLastName,
      email: pEmail,
      cart: [],
    };
    let oldUsers = [...users];
    oldUsers.push(newUser);
    setUsers(oldUsers);
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
        register,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
