import "./styles.css";
import React, { useEffect, useState } from "react";

export default function Cart(props) {
  const [itemList, setItemList] = useState(props.data);

  useEffect(() => {
    // console.log(itemList);
    //props.handleFunc(itemList);
    setItemList(props.data);
  }, [props, itemList]);

  function deleteItem(id) {
    let delItem = itemList.map((item) => {
      if (item.id === id) {
        item.quantity = 0;
        sessionStorage.setItem(item.id, item.quantity);
        return item;
      } else {
        return item;
      }
    });
    setItemList(delItem);
    props.handleFunc(delItem);
  }

  return (
    <div>
      {itemList.map((item) =>
        item.quantity != 0 ? (
          <div className="product">
            <div className="productListCart">
              <button
                className="del-buttons"
                onClick={() => deleteItem(item.id)}
              >
                <i class="fa fa-times"></i>
              </button>

              <div className="productText">
                <span>{item.title}</span>
                <br />
                <span>
                  <b>
                    {" "}
                    {item.currency}
                    {item.price * item.quantity}
                  </b>
                </span>
              </div>

              <div className="quanity-groupCart">
                <span style={{ marginRight: "5px" }}>Qty {item.quantity}</span>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )
      )}
    </div>
  );
}
