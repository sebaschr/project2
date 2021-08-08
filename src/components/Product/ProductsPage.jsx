import Navbar from "../Navbar/Navbar";
import Banner from "../General/Banner";
import ProductCard from "../Product/ProductCard";

import dataJSON from "../../data/products.json";
export default function ProductsPage(props) {
  let products = dataJSON;
  return (
    <>
      <Navbar />

      <Banner
        title="ALL"
        img="https://wallpaperaccess.com/full/221878.jpg"
        size
      />

      <div className="products__container">
        <div className="products">
          {products.map((prod, key) => {
            return <ProductCard product={prod} key={prod.id} />;
          })}
        </div>
      </div>
    </>
  );
}
