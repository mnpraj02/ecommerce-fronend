import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../styles/Cart.css";
import MiniCart from "./MiniCart";
import { connect } from "react-redux";

function Cart({ data, isLoggedIn, dispatch }) {
  const location = useLocation();
  const [totalprice, setTotalprice] = useState(0);
  const [Titems, setTitems] = useState(0);
  useEffect(() => {
    let price = 0;
    let items = 0;
    data.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    setTotalprice(price);
    setTitems(items);
  }, [data, totalprice, setTotalprice, Titems, setTitems]);

  return (
    <div className="Cartsummary">
      {Titems === 0 ? (
        <div>
          <h2 style={{ fontfamily: "fantasy", textalign: "center" }}>
            Your Cart Is Empty
          </h2>
          <img
            src="https://cdn.dribbble.com/users/619199/screenshots/3787913/animated_cart.gif"
            alt="Your Cart is Empty"
          ></img>
        </div>
      ) : (
        <div>
          <div className="itemHeading">
            <h1>Items</h1>
          </div>
          <div className="Cart ">
            {data.map((item, index) => {
              return <MiniCart content={item} key={index} />;
            })}
          </div>
          <div className="SummaryHeading">
            <h1>Cart Summary</h1>
          </div>
          <div className="Summary ">
            <h2 id="items">Items: {Titems}</h2>
            <h2 id="totalPrice">Total: ₹{totalprice}</h2>
            <div className="Pbutton">
              <Link
                to={
                  isLoggedIn
                    ? {
                        pathname: "/payment",
                        state: { prevPath: location.pathname },
                      }
                    : "/login"
                }
              >
                <button
                // onClick={() => {
                //   // StripePayment();
                //   console.log("First One is Good!");
                // }}
                >
                  Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.cartReducer.cart,
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Cart);

// add to cart-> cart items( with duplicate check)
//  step-1
// add to cart:
// add to cart -> dispatch -> update the cart items of a user in the Api through redux
// step -2
// fetch the products from the store instead of the api directly
