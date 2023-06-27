import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleCategorySearch } from "../actions";

class Categories extends Component {
  handleCategoryClick = (category) => {
    // search based on category
    console.log("searching for ", category);
    this.props.dispatch(handleCategorySearch(category));
  };
  render() {
    return (
      <div>
        <div className="categories-container">
          <ul className="categories-list">
            <Link to="/products">
              <li>
                <div className="category-item">
                  <img
                    alt="category-img"
                    src={process.env.PUBLIC_URL + `/images/mens.png`}
                    onClick={() => {
                      this.handleCategoryClick("mens");
                    }}
                  />
                  <p> Mens</p>
                </div>
              </li>
            </Link>
            <Link to="/products">
              <li>
                <div className="category-item">
                  <img
                    alt="category-img"
                    src={process.env.PUBLIC_URL + `/images/womens.png`}
                    onClick={() => {
                      this.handleCategoryClick("womens");
                    }}
                  />
                  <p> Womens</p>
                </div>
              </li>
            </Link>
            <Link to="/products">
              <li>
                <div className="category-item">
                  <img
                    alt="category-img"
                    src={process.env.PUBLIC_URL + `/images/kids.png`}
                    onClick={() => {
                      this.handleCategoryClick("kids");
                    }}
                  />
                  <p> Kids</p>
                </div>
              </li>
            </Link>
            <Link to="/products">
              <li>
                <div className="category-item">
                  <img
                    alt="category-img"
                    src={process.env.PUBLIC_URL + `/images/mobiles.png`}
                    onClick={() => {
                      this.handleCategoryClick("mobiles");
                    }}
                  />
                  <p> Mobiles</p>
                </div>
              </li>
            </Link>
            <Link to="/products">
              <li>
                <div className="category-item">
                  <img
                    alt="category-img"
                    src={process.env.PUBLIC_URL + `/images/laptop.png`}
                    onClick={() => {
                      this.handleCategoryClick("accessories");
                    }}
                  />
                  <p> accessories</p>
                </div>
              </li>
            </Link>
            <Link to="/products">
              <li>
                <div className="category-item">
                  <img
                    alt="category-img"
                    src={process.env.PUBLIC_URL + `/images/home-appliance.png`}
                    onClick={() => {
                      this.handleCategoryClick("appliances");
                    }}
                  />
                  <p> Appliances</p>
                </div>
              </li>
            </Link>
            <Link to="/products">
              <li>
                <div className="category-item">
                  <img
                    alt="category-img"
                    src={process.env.PUBLIC_URL + `/images/household.png`}
                    onClick={() => {
                      this.handleCategoryClick("home");
                    }}
                  />
                </div>
                <p> Home</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}
// maps the state of the store to the props of the component
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Categories);
