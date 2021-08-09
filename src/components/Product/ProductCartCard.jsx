import React, { useContext, useState } from 'react';
import AddReduceBtn from './AddReduceBtn';
import { UserContext } from '../../store/user/UserContext';
export default function ProductCartCard(props) {
  const { removeFromCart, updateQuantity } = useContext(UserContext);

  const { product, prodCartID, prodsInCart } = props;
  const [counter, setCounter] = useState(prodsInCart || 1);

  return (
    <div className="prodCart">
      <img
        className="prodCart__image"
        src={product.image}
        alt={product.product_name}
      />
      <div className="prodCart__content">
        <p className="prodCart__title">{product.product_name}</p>
        <div className="prodCart__desc">
          <p className="products__text">
            Unit price: <span className="products__span">${product.price}</span>
          </p>
        </div>

        <button
          className="prodCart__button"
          onClick={(e) => {
            e.preventDefault();
            removeFromCart(prodCartID);
          }}
        >
          Remove from Cart
        </button>
      </div>
      <div className="prodCart__pricing">
        <AddReduceBtn
          taken={counter}
          changeWord={(counter) => {
            setCounter(counter);
            updateQuantity(prodCartID, counter);
          }}
        />

        <p className="prodCart__price">
          Price:
          <span className="prodCart__span">${product.price * counter}</span>
        </p>
      </div>
    </div>
  );
}
