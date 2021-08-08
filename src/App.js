import './styles/main.scss';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './store/user/UserContext';
import LandingPage from './components/Landing/LandingPage';
import ProductsPage from './components/Product/ProductsPage';
import ProductPage from './components/Product/ProductPage';
import Cart from './components/User/Cart';
import SignIn from './components/User/SignIn';

import { ProductProvider } from './store/product/ProductContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="App">
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/products" exact component={ProductsPage} />
              <Route path="/products/item/:id" component={ProductPage} />
              <Route path="/cart" component={Cart} />
              <Route path="/signin" component={SignIn} />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
