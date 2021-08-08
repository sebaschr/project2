import React, { createContext, useState } from 'react';
import productsJSON from '../../data/products.json';

const defaultProductsData = {
  products: () => {
    let localProducts = localStorage.getItem('products');
    if (localProducts === null) {
      localStorage.setItem('products', JSON.stringify(productsJSON));
    }
    localProducts = localStorage.getItem('products');
    localProducts = JSON.parse(localProducts);
    return localProducts;
  },
};

export const ProductContext = createContext(defaultProductsData);

export const ProductProvider = (props) => {
  const [products, setProducts] = useState(defaultProductsData.products);

  function getProduct(id) {
    var productID = parseInt(id);
    const product = products.find(({ id }) => id === productID);
    return product;
  }

  return (
    <ProductContext.Provider value={{ products, setProducts, getProduct }}>
      {props.children}
    </ProductContext.Provider>
  );
};
