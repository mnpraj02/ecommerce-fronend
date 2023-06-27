import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    //Footer displayed at the bottom of each page
    <div className="footer-container">
      <h2>Connect with Us</h2>
      <div className="footer-row-2">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fas fa-envelope"></i>
      </div>
      <hr className="footer-hr" />
      <div className="footer-row-1">
        <h3>
          <i className="fas fa-shopping-bag"></i> Sell on Electorent
        </h3>
        <h3>
          <i className="fas fa-address-card"></i> About Us
        </h3>
        <h3>
          <i className="fas fa-money-check-alt"></i> Electorent Card
        </h3>
        <h3>
          <i className="fas fa-pen"></i> Terms and Conditions
        </h3>
      </div>
      <hr className="footer-hr" />
      <p>Electorent © 2021-2022</p>
    </div>
  );
}

export default Footer;
