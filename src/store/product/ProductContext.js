import React, { createContext, useState } from 'react';
import productsJSON from '../../data/products.json';
import categoriesJSON from '../../data/categories.json';

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
  categories: () => {
    let localCategories = localStorage.getItem('categories');
    if (localCategories === null) {
      localStorage.setItem('categories', JSON.stringify(categoriesJSON));
    }
    localCategories = localStorage.getItem('categories');
    localCategories = JSON.parse(localCategories);
    return localCategories;
  },
};

export const ProductContext = createContext(defaultProductsData);

export const ProductProvider = (props) => {
  const [products, setProducts] = useState(defaultProductsData.products);
  const [categories, setCategories] = useState(defaultProductsData.categories);

  function getProduct(id) {
    var productID = parseInt(id);
    const product = products.find(({ id }) => id === productID);
    return product;
  }

  function getProductsFromCategory(categoryID) {
    let categoriesbyID = products.filter((product) => {
      if (product.categories.includes(categoryID)) {
        return true;
      } else {
        return false;
      }
    });
    return categoriesbyID;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getProduct,
        categories,
        setCategories,
        getProductsFromCategory,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
