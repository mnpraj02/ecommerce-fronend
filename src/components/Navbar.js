import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { handleProductSearch, userLogout } from "../actions";
import { getAllProducts } from "../utils/api";
// styles for the cart icon in the navbar
const styles = {
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    borderRadius: "50%",
    padding: "0px 6px",
    position: "absolute",
    right: 1,
    top: 12,
  },
};

const validation = (searchWord) => {
  if (searchWord.length < 3) {
    return false;
  } else {
    return true;
  }
};
const Navbar = (props) => {
  const [searchWord, setSearchWord] = useState("");
  const [products, setProducts] = useState([]); // eslint-disable-line
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      // console.log("all products ");
      // console.log(res.data.products);
      setAllProducts(res.data.products);
    });
  }, []);

  const updateSearchWord = () => {
    // search word from the state
    // search the products based on the searchWord in the reducer(redux)
    console.log("search word: ", searchWord);
    let searchResults = allProducts.filter((product) => {
      let productTitle = product.productName.toLowerCase();
      let searWord = searchWord.toLowerCase();
      return productTitle.includes(searWord);
    });
    setProducts(searchResults);
    props.dispatch(handleProductSearch(searchResults));
  };
  const { cart } = props;
  return (
    <div className="navbar-container">
      <div className="links">
        <Link to="/">
          <h1>Electorent</h1>
        </Link>
      </div>
      <div className="search-container">
        <form>
          <input
            style={{
              textAlign: "left",
              padding: 3,
              outline: "none",
              fontSize: 20,
            }}
            placeholder="Search"
            className="search-input"
            onChange={(e) => {
              setSearchWord(e.target.value);
              let result = validation(searchWord);
              if (result) {
                updateSearchWord();
              } else {
                e.preventDefault();
              }
            }}
          />
          <Link to="/products" style={{ marginLeft: "-1%" }}>
            <button
              className="search-button"
              onClick={(e) => {
                let result = validation(searchWord);
                if (result) {
                  updateSearchWord();
                } else {
                  toast.warning("please make a search greater than 3");
                  e.preventDefault();
                }
              }}
            >
              <i style={{ color: "black" }} className="fas fa-search fa-2x"></i>
            </button>
          </Link>
        </form>
      </div>
      <div className="navbar-routes">
        <div className="links" style={styles.cartIconContainer}>
          <Link to="/cart">
            <img
              style={{ height: 30, width: 30 }}
              src={process.env.PUBLIC_URL + `/images/cart.png`}
              alt="cart icon"
            />
            <span style={styles.cartCount}>
              <b>{cart.length}</b>
            </span>
          </Link>
        </div>
        <div className="links">
          <Link to="/userProfile">
            <img
              style={{ height: 30, width: 30 }}
              src={process.env.PUBLIC_URL + `/images/user.png`}
              alt="User Profile"
            />
          </Link>
        </div>
        {/* renders the logout button only if the user is logged in */}
        {props.isLoggedIn && (
          <div className="links">
            <Link to="/">
              <img
                style={{ height: 30, width: 30 }}
                src={process.env.PUBLIC_URL + `/images/login.png`}
                alt="Login/Logout"
                onClick={() => {
                  // logging the user out from the website if the user is loggedIn
                  props.dispatch(userLogout());
                  toast.success("Logged out successfully!", toastStyler);
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// maps the state of the store to the props of the component
function mapStateToProps(state) {
  return {
    searchResults: state.search,
    isLoggedIn: state.user.isLoggedIn,
    cart: state.cartReducer.cart,
  };
}
export default connect(mapStateToProps)(Navbar);
