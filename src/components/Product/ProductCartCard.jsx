import React, { useContext, useState } from 'react';
import AddReduceBtn from './AddReduceBtn';
import { UserContext } from '../../store/user/UserContext';
export default function ProductCartCard(props) {
  const { removeFromCart } = useContext(UserContext);

  const { product, prodCartID } = props;
  const [counter, setCounter] = useState(product.prodsInCart);

  return (
    <div className="prodCart">
      <img className="prodCart__image" src={product.image} alt="" />
      <div className="prodCart__content">
        <p className="prodCart__title">{product.product_name}</p>
        <div className="prodCart__desc">
          <p className="prodCart__text">Unit Price: ${product.price}</p>
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

      <AddReduceBtn
        quantity={product.quantity}
        taken={product.prodsInCart}
        changeWord={(counter) => setCounter(counter)}
      />

      <p className="prodCart__price">
        Price:{' '}
        <span className="prodCart__span">${product.price * counter}</span>
      </p>
    </div>
  );
}
