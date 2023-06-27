import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { handlerfc } from "../actions/cartAction";
import { handleinc } from "../actions/cartAction";
import { handledec } from "../actions/cartAction";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";

function MiniCart(props) {
  // const { content } = props.content;

  const increaseQuantity = () => {
    const { stockAvailable, qty } = props.content;
    if (qty > stockAvailable) {
      toast.error("You quantity has exceeded the available stock", toastStyler);
    } else {
      props.dispatch(handleinc(props.content, props.content.qty));
    }
  };
  return (
    <div className="Item1">
      <div className="image">
        <img src={props.content.image[0]} alt={props.content.productName} />
      </div>
      <div className="column">
        <h4 id="title">{props.content.productName}</h4>
        <h4 id="price">₹{props.content.price}</h4>
        <h5 id="total">
          Total:{props.content.qty} x {props.content.price}=₹
          {props.content.qty * props.content.price}
        </h5>
      </div>

      <div className="cart-button">
        <div className="plusAndMinus">
          <button id="increment" onClick={() => increaseQuantity()}>
            +
          </button>
          <button
            id="decrement"
            onClick={() =>
              props.dispatch(handledec(props.content, props.content.qty))
            }
          >
            -
          </button>
        </div>

        <div className="Rbutton">
          <button
            id="remove"
            onClick={() => props.dispatch(handlerfc(props.content))}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(MiniCart);
