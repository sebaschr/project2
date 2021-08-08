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
  const [taken, setTaken] = useState();
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState();
  const [items, setItems] = useState(0);
  useEffect(() => {
    let prod = getProduct(id);
    setProduct(prod);
  }, [getProduct, id]);

  useEffect(() => {
    let x = checkIfAlreadyInCart(parseInt(id));
    if (x !== -1) {
      setTaken(shoppingCart[x].quantity);
      setInCart(true);
    } else {
      setTaken(1);
    }
  }, [checkIfAlreadyInCart, id, shoppingCart]);

  function createItem() {
    let prod = {
      idProduct: product.id,
      quantity: items,
    };
    setLoading(true);
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
            <p className="productPage__text">
              Available Units:{product.quantity}
            </p>
          </div>
          <div
            className="productPage__btns"
            style={loading ? { opacity: 0.8 } : { opacity: 1 }}
          >
            <AddReduceBtn
              quantity={product.quantity}
              changeWord={(items) => setItems(items)}
            />
            {inCart && <p>{taken} items in the cart already</p>}

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
