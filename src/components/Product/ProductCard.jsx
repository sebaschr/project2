import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/user/UserContext';
import AddReduceBtn from './AddReduceBtn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductsPage(props) {
  const { product } = props;
  const link = '/products/item/' + product.id;
  const [counter,setCounter] = useState(1)
  const [taken, setTaken] = useState(null);
  const [inCart, setInCart] = useState(false);

  const { addToCart, checkIfAlreadyInCart, shoppingCart } =
    useContext(UserContext);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let x = checkIfAlreadyInCart(product.id);
    if (x !== -1) {
      setTaken(shoppingCart[x].quantity);
      setInCart(true);
    } else {
      setTaken(1);
    }
  }, [checkIfAlreadyInCart, product.id, shoppingCart]);

  function createItem() {
    let prod = {
      idProduct: product.id,
      quantity: counter,
    };
    addToCart(prod);
  }

  const notify = () =>
    toast.info(`Item added to the cart`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  return (
    <Link
      to={link}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          if (['A', 'BUTTON'].includes(e.target.nodeName)) {
            e.preventDefault();
          }
        }
      }}
      className="products__card"
    >
      <img className="products__image" src={product.image} alt="" />
      <div className="products__content">
        <p className="products__title">{product.product_name}</p>
        <div className="products__desc">
          <p className="products__text">Price: ${product.price}</p>
        </div>
      </div>
      <button
        className="products__button"
        onClick={(e) => {
          e.preventDefault();
          if (hidden) {
            setHidden(false);
          } else {
            console.log(product);
            createItem();
            notify();
            setHidden(true);
          }
        }}
      >
        Add to Cart
      </button>

      {!hidden && (
        <>
          <p>Please enter a quantity</p>

          <AddReduceBtn
            changeWord={(counter) => setCounter(counter)}
          />
          {inCart && <p>{taken} items in the cart already</p>}
          <button
            onClick={(e) => {
              e.preventDefault();
              setHidden(true);
            }}
          >
            Hide
          </button>
        </>
      )}
    </Link>
  );
}
