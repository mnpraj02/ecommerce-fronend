import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ConfirmationPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0); //Scroll to top once you open the page
  });
  //Getting required contents from previous route
  const location = useLocation();
  const { products, selectedAddress, selectedPayment, paymentStatus } = props;
  return (
    <div className="confirmation">
      <div className="confirmation-heading">
        <h1>Order Successfull!!!</h1>
      </div>
      <div className="item-summary">
        <h1>Item Summary</h1>
        {/* displaying the product details */}
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
                <p>Quantity: {product.qty ? product.qty : 1} </p>
                <p>
                  Total Amount: ₹{product.price} x{" "}
                  {product.qty ? product.qty : 1} = ₹
                  {product.price * (product.qty ? product.qty : 1)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* displaying the shipping details using the variables taken from previous route using useLocation() */}
      <div className="shipping-details">
        <h3>Shipping Address:</h3>
        <p>{selectedAddress}</p>
        <h3>Payment Method</h3>
        <p>
          {paymentStatus} : {selectedPayment}
        </p>
      </div>
    </div>
  );
}

export default ConfirmationPage;
