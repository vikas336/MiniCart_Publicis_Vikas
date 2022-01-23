import "./styles.css";
import { useEffect, useState } from "react";
import iconProduct from "./productIcon.png";

export default function Product(props) {
  //const itemList = props.data;
  //console.log("h", props.data);
  const [itemList, setItemList] = useState(props.data);

  function decreaseItem(id) {
    let d = itemList.map((item) => {
      if (item.id === id) {
        item.quantity--;
        sessionStorage.setItem(item.id, item.quantity);
        return item;
      } else {
        return item;
      }
    });
    setItemList(d);
    props.handleFunc(d);
  }
  function increaseItem(id) {
    let inc = itemList.map((item) => {
      if (item.id === id) {
        item.quantity++;
        sessionStorage.setItem(item.id, item.quantity);
        return item;
      } else {
        return item;
      }
    });

    setItemList(inc);
    props.handleFunc(inc);
  }

  useEffect(() => {
    // console.log(itemList);
    //props.handleFunc(itemList);
    setItemList(props.data);
  }, [props, itemList]);

  return (
    <div>
      {itemList.map((item) => (
        <div className="product">
          <div className="productList">
            <img className="productImage" src={iconProduct} />

            <div className="productText">
              <span>{item.title}</span>
              <br />
              <span className="descClass">{item.desc}</span>
            </div>

            <div className="quanity-group">
              <button
                className="minus-buttons"
                disabled={item.quantity == 0}
                onClick={() => decreaseItem(item.id)}
              >
                <i className="fa fa-minus"></i>
              </button>
              <input disabled className="input-quanity" value={item.quantity} />
              <button
                className="plus-buttons"
                onClick={() => increaseItem(item.id)}
              >
                <i className="fa fa-plus"></i>
              </button>

              <span className="priceClass">
                <b>
                  {item.currency}
                  {item.price * item.quantity}
                </b>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
