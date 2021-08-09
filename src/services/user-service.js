import users from '../data/users.json';

export const signIn = (user, userIndex) => {
  let cart = localStorage.getItem('shoppingCart');
  cart = JSON.parse(cart);

  if (cart) {
    if (cart.length === 0 && user.cart.length > 0) {
      cart = user.cart;
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } else {
      user.cart = cart;
    }
  } else {
    user.cart = cart;
  }

  localStorage.setItem('key', user.username);
};

export const checkIfSignedIn = () => {
  let key = localStorage.getItem('key');
  if (key === null) {
    return false;
  } else {
    return true;
  }
};

export const verifyCredentials = (pUser, pPassword) => {
  console.log(users);
  let correct = false;
  let user = [];
  let userIndex;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === pUser) {
      if (users[i].password === pPassword) {
        correct = true;
        user = users[i];
        userIndex = i;
        break;
      }
    }
  }
  if (correct) {
    signIn(user, userIndex);
  }
  return correct;
};

export const signOut = () => {
  localStorage.removeItem('key');
  localStorage.removeItem('shoppingCart');
};

export const register = (pName, pLastName, pEmail, pPassword, pUserName) => {
  let newUser = {
    username: pUserName,
    password: pPassword,
    first_name: pName,
    last_name: pLastName,
    email: pEmail,
    cart: [],
    id: users[users.length - 1].id + 1,
  };
  const userExists = users.findIndex(({ username }) => username === pUserName);
  if (userExists === -1) {
    users.push(newUser);
    return true;
  } else {
    return false;
  }
};

export const updateCart = (pUsername) => {
  const userExists = users.findIndex(({ username }) => username === pUsername);
  users[userExists].cart = JSON.parse(localStorage.getItem('shoppingCart'));
};
