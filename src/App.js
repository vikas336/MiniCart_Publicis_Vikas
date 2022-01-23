import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Cart from "./Cart";
import iconCart from "./cartIcon.png";

export default function App() {
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [flag, setFlag] = useState(false);
  const api = "https://dnc0cmt2n557n.cloudfront.net/products.json";

  useEffect(() => {
    const data = async () => {
      const a = await axios.get(api);

      a.data.products.map((item) => {
        if (!sessionStorage.getItem(item.id)) {
          item.quantity = 1;
          sessionStorage.setItem(item.id, 1);
        } else {
          item.quantity = sessionStorage.getItem(item.id);
        }
      });
      //console.log(a);

      return a;
    };
    data().then((item) => {
      setProduct(item.data.products);
      handleUpdate(item.data.products);
    });
  }, [flag]);

  useEffect(() => {
    // console.log(product);
  }, [product]);

  function handleUpdate(newData) {
    let a = 0;
    let p = 0;
    newData.map((item) => {
      a = a + Number(sessionStorage.getItem(item.id));
      p = p + item.price * Number(sessionStorage.getItem(item.id));
    });
    setTotalItem(a);
    setTotalPrice(p);
    if (flag && a == 0) {
      setFlag(!flag);
    }
  }

  function cartOpen() {
    setFlag(!flag);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="headerList">
          <div className="itemText">
            <span>
              <b>${totalPrice}</b>
            </span>
            <br />
            <span>
              <b>{totalItem} items</b>
            </span>
            <button className="cart-buttons" onClick={cartOpen}>
              {!flag ? (
                <i className="fa fa-sort-desc iconClass" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-sort-asc iconClass" aria-hidden="true"></i>
              )}
            </button>
          </div>
          <img className="cartImage" src={iconCart} />
        </div>
      </div>
      {!flag ? (
        <Product data={product} handleFunc={handleUpdate} />
      ) : (
        <React.Fragment>
          <div className="arrow-up"></div>
          <Cart data={product} handleFunc={handleUpdate} />
        </React.Fragment>
      )}
    </div>
  );
}
