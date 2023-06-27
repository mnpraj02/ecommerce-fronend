import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../styles/Payment.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { emptyCart } from "../actions/cartAction";
import {
  getDeliveryAddress,
  getCards,
  getUpi,
  postCard,
  postUpi,
  postDeliveryAddress,
  postOrder,
} from "../utils/api";
import ConfirmationPage from "./ConfirmationPage";
import "dotenv/config";
import StripeCheckout from "react-stripe-checkout";

function Payment(props) {
  //Taking user data from store(redux)
  const history = useHistory();
  const user = props.user;
  const userId = user._id;
  console.log(userId);
  //Products and previous route info taken using useLocation() in react-router-dom
  const location = useLocation();
  let { products, prevPath } = location.state;
  //If previous path is cart, then the products should be the items present in the cart
  if (prevPath === "/cart") products = props.cartItems;
  // console.log(products);

  const [address, setAddress] = useState([]);
  const [debitCards, setDebitCards] = useState([]);
  const [upi, setUpi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook",
  });

  const [paymentStatus, setPaymentStaus] = useState("Payment Method");
  useEffect(() => {
    setLoading(true);
    products.forEach((product) => {
      product.qty = prevPath === "/cart" ? product.qty : 1;
    });
    Promise.resolve(
      getDeliveryAddress(userId)
        .then((res) => res.data)
        .then(
          (i) => {
            setAddress(i);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        )
    );
    Promise.resolve(
      getCards(userId)
        .then((res) => res.data)
        .then(
          (i) => {
            setDebitCards(i.userDebitCards);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        )
    );
    Promise.resolve(
      getUpi(userId)
        .then((res) => res.data)
        .then(
          (i) => {
            setUpi(i.userUpi);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        )
    );
    window.scrollTo(0, 0); //Page going to top
  }, [userId]);
  //Updating the selected address for shipping
  const addressChange = (e) => {
    const { value } = e.target;
    setSelectedAddress(value);
  };
  //Updating the selected payment details for shipping
  const paymentDetailsChange = (e) => {
    const { value } = e.target;
    setSelectedPayment(value);
  };

  //Storing the selected address and selected payment info in state
  const [selectedAddress, setSelectedAddress] = useState("Shipping Address");
  const [selectedPayment, setSelectedPayment] = useState("Payment Details");

  //Select the payment method (debit/credit/upi)
  const paymentChange = (e) => {
    setPaymentStaus(e.target.value);
  };

  //After the order has been placed, update the user's myOrders
  const addToOrders = () => {
    const d = new Date();
    let date = d.toISOString();
    date = date.slice(0, 10);
    const orders = [];
    //Each given product is pushed into the myOrders of the user
    products.forEach((product) => {
      const order = {
        productId: product._id,
        qty: product.qty,
      };
      orders.push(order);
    });
    console.log(orders, "Orders");
    const data = {
      userId: userId,
      orders: orders,
      orderedOn: date,
    };
    console.log(data, "The information to be posted");
    postOrder(data)
      .then((data) => {
        console.log("Successfully PATCHED", data);
        // toast.success("Information added", toastStyler);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Make Payment
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(
      `https://electorent-api.herokuapp.com/api/create-checkout-session`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
        addToOrders();
        props.dispatch(emptyCart());
        history.push("/userProfile");
      })
      .catch((error) => console.log(error));
  };

  return loading === true ? (
    <Loader />
  ) : (
    <div>
      <div className="shipping-address">
        <h1>Shipping Address</h1>
        <div className="address-list">
          <h3>Please select your preffered shippping address:</h3>
          {/* Displaying the existing addresses */}
          {address.map((addr, index) => {
            return (
              <div className="address-pack" key={index}>
                <input
                  type="radio"
                  id={"address" + index + 1}
                  name="address"
                  value={`
              ${addr.userName}, ${addr.address}, ${addr.locationName}, ${addr.pincode}
              Phone: ${addr.mobileNumber}
            `}
                  onClick={addressChange}
                />
                <label for={"address" + index + 1}>
                  <div>
                    {addr.userName}, {addr.address}, {addr.locationName},
                    {addr.pincode}
                  </div>
                  <div>Phone: {addr.mobileNumber}</div>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="payment-method">
        <h1>Payment: </h1>
        <form>
          <div className="address-list">
            <p>Please select your preffered payment method:</p>
            <div className="address-pack">
              <input
                type="radio"
                id="debit"
                name="address"
                value="debit"
                onClick={paymentChange}
                defaultValue={true}
              />
              <label for="debit">Debit Card</label>
            </div>
            <div className="address-pack">
              <input
                type="radio"
                id="credit"
                name="address"
                value="credit"
                onClick={paymentChange}
              />
              <label for="credit">Credit Card</label>
            </div>
            <div className="address-pack">
              <input
                type="radio"
                id="upi"
                name="address"
                value="upi"
                onClick={paymentChange}
              />
              <label for="upi">UPI</label>
            </div>
          </div>
        </form>
        <div className="payment-list">
          <h2>Saved {paymentStatus === "upi" ? "Upi" : "Cards"}</h2>
          {(paymentStatus === "debit" || paymentStatus === "credit") &&
            debitCards.map((card, index) => {
              return (
                <div className="address-pack" key={index}>
                  <input
                    type="radio"
                    id={"debit" + index + 1}
                    name="address"
                    onClick={paymentDetailsChange}
                    value={`
              ${card.nameOnCard}, ${card.cardNo}, ${card.expiry}
            `}
                  />
                  <label for={"debit" + index + 1}>
                    {card.nameOnCard}, {card.cardNo}, {card.cardType},{" "}
                    {card.expiry}
                  </label>
                </div>
              );
            })}
          {paymentStatus === "upi" &&
            upi.map((upi, index) => {
              return (
                <div className="address-pack" key={index}>
                  <input
                    type="radio"
                    id={"debit" + index + 1}
                    name="address"
                    onClick={paymentDetailsChange}
                    value={`
              ${upi.userName}, ${upi.cardNo}, ${upi.mobileNumber}
            `}
                  />
                  <label for={"debit" + index + 1}>
                    {upi.userName}, {upi.cardNo}, {upi.mobileNumber},{" "}
                    {upi.upiType}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
      {/* Showing the item summary of the products the user is going to buy*/}
      <div className="item-summary">
        <h1>Item Summary</h1>
        {products.map((product, index) => {
          return (
            <div className="item-details" key={index}>
              <img
                src={product.image[0]}
                alt="item"
                style={{ height: "200px", width: "200px" }}
              />
              <div className="item-details-text">
                <h2>{product.title}</h2>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.qty} </p>
                <p>
                  Total Amount: ₹{product.price} x{" "}
                  {/* If the item is coming directly from Buy Now, qty should be 1 if it comes from cart, the code should just be product.qty*/}
                  {product.qty} = ₹{product.price * product.qty}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Showing the address and payment details */}
      <div className="shipping-details">
        <h3>Shipping Address:</h3>
        <p>{selectedAddress}</p>
        <h3>Payment Method</h3>
        <p>
          {paymentStatus} : {selectedPayment}
        </p>
      </div>

      <StripeCheckout
        stripeKey="pk_test_51KsCW0SD3dBrJmKptgdGWmPbXWFHyM72BxI8ZnDTyL8OICtx6NmL61b3TFhZ4eCiyaW5Rsw8oWK85bhL0PQa8WNA00EvVYe6X4"
        token={makePayment}
        name="Buy Now"
        amount={product.price * 100}
      >
        <div className="product-price-btn">
          <button
            type="submit"
            className="proceed-btn"
            // onClick={() => {
            //   addToOrders();
            //   props.dispatch(emptyCart()); //Emptying cart after order is placed
            // }}
            disabled={
              paymentStatus === "Payment Method" ||
              selectedAddress === "Shipping Address" ||
              selectedPayment === "Payment Details"
            }
          >
            Proceed <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </StripeCheckout>
    </div>
  );
}

//For passing state as props
function mapStateToProps(state) {
  return {
    user: state.user.userData,
    cartItems: state.cartReducer.cart,
    isLoggedIn: state.user.isLoggedIn,
  };
}
export default connect(mapStateToProps)(Payment);
