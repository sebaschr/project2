import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ProductCard from '../Product/ProductCard';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../store/product/ProductContext';
import { useHistory } from 'react-router-dom';

export default function ProductsPage(props) {
  const { products, categories, getProductsFromCategory } =
    useContext(ProductContext);
  const history = useHistory();

  const [productsShowing, setProductsShowing] = useState(products);
  const [selectValue, setSelectValue] = useState('');

  useEffect(() => {
    let query = history.location.search;
    if (query.length > 0) {
      setProductsShowing(
        getProductsFromCategory(parseInt(history.location.state))
      );
      setSelectValue(history.location.state);
    } else {
      setProductsShowing(products);
    }
  }, [
    getProductsFromCategory,
    history.location.search,
    history.location.state,
    products,
  ]);

  return (
    <>
      <Navbar />

      <div className="products__container">
        <div className="products__selector">
          <select
            className="products__select"
            onChange={(e) => {
              let value = e.target.value;
              if (value === '') {
                setProductsShowing(products);
                setSelectValue('');
              } else {
                setProductsShowing(getProductsFromCategory(parseInt(value)));
                setSelectValue(value);
              }
            }}
            value={selectValue}
          >
            <option value="" className="products__option">
              all
            </option>
            {categories &&
              categories.length > 0 &&
              categories.map((cat, key) => {
                return (
                  <option
                    className="products__option"
                    key={key}
                    value={cat.category_id}
                  >
                    {cat.category_name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="products">
          {productsShowing.map((prod, key) => {
            return <ProductCard product={prod} key={prod.id} />;
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}
