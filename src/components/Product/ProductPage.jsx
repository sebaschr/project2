import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Banner from "../General/Banner";
import ProductCard from "./ProductCard";
import AddReduceBtn from "./AddReduceBtn";
import { ProductContext } from "../../store/product/ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { UserContext } from "../../store/user/UserContext";

export default function ProductPage(props) {
  let { id } = useParams();
  const { getProduct, products } = useContext(ProductContext);
  const { addToCart, checkIfAlreadyInCart, shoppingCart } =
    useContext(UserContext);
  const [counter, setCounter] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [taken, setTaken] = useState(null);
  const [product, setProduct] = useState();
  const [items, setItems] = useState(0);

  useEffect(() => {
    let prod = getProduct(id);
    setProduct(prod);
    let x = checkIfAlreadyInCart(prod.id);
    if (x !== -1) {
      setTaken(shoppingCart[x].quantity);
      setInCart(true);
    } else {
      setTaken(1);
    }
  }, [getProduct, id]);

  function createItem() {
    let prod = {
      idProduct: product.id,
      quantity: items,
    };
    addToCart(prod);
  }

  const notify = () =>
    toast.info(`Item added to the cart`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <Navbar />
      <Banner img="https://wallpaperaccess.com/full/221878.jpg" size />
      <div className="indivProd__links">
        <Link to="/products" className="indivProd__link">
          <FontAwesomeIcon className="indivProd__icon" icon={faChevronLeft} />{" "}
          Back to All
        </Link>
      </div>
      {product && (
        <section className="productPage">
          <img src={product.image} alt="" className="productPage__img" />
          <div className="productPage__content">
            <h2 className="productPage__title">{product.product_name}</h2>
            <p className="productPage__text">
              Price: <span className="productPage__span">${product.price}</span>
            </p>
          </div>
          <button
            className="products__button productPage__btn"
            onClick={(e) => {
              e.preventDefault();
              createItem();
              notify();
            }}
          >
            Add to Cart
          </button>
          <div>
            <AddReduceBtn changeWord={(counter) => setCounter(counter)} />
            {inCart && <p>{taken} items in the cart already</p>}
          </div>
        </section>
      )}
      <h2 className="productPage__title --big">Related Products</h2>
      <div className="productPage__related">
        {products.length > 0 ? (
          products.slice(0, 4).map((prod, key) => {
            return <ProductCard product={prod} key={prod.id} />;
          })
        ) : (
          <h1>Empty</h1>
        )}
      </div>
    </>
  );
}
