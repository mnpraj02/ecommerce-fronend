import React, { useState, useEffect } from "react";
import Reviews from "./Reviews";
import Faqs from "./Faqs";
import StarRatings from "react-star-ratings";
import "../styles/ProductPage.css";
import SimilarItems from "./SimilarItems";
import { useParams, Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { handleaddtoCart } from "../actions/cartAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { getOneProduct, getReviews, getFaqs } from "../utils/api";
function ProductPage(props) {
  const [disabled, setDisabled] = useState(false);
  const { isLoggedIn } = props;
  const { productId } = useParams(); //Taking the productId from the url parameters
  const [item, setItem] = useState({});
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [resourceType, setResourceType] = useState();
  const [activeDiv, setActiveDiv] = useState(3);
  const location = useLocation();
  const toggleAnimation = (index) => {
    setActiveDiv(index);
  };
  //GET request for the product using the productId
  useEffect(() => {
    Promise.resolve(
      getOneProduct(productId)
        .then((res) => res.data)
        .then(
          (i) => {
            setItem(i);
            setIsLoaded(true);
            setResourceType(<SimilarItems type={i.type} />);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    );
    Promise.resolve(
      getReviews(productId)
        .then((res) => res.data)
        .then(
          (result) => {
            setReviews(result);
          },
          (error) => {
            setError(error);
          }
        )
    );

    Promise.resolve(
      getFaqs(productId)
        .then((res) => res.data)
        .then(
          (result) => {
            setFaqs(result);
          },
          (error) => {
            setError(error);
          }
        )
    );
    window.scrollTo(0, 0);
  }, [productId]);
  //Showing error msg if an error occurs
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      //Rendering the Loader animation while loading the data
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      // Once the data is loaded without any error we get to see this part
      <div>
        <div className="product">
          <div className="product-image">
            <img src={item.image[0]} alt="Product" />
          </div>
          <div className="product-info-productpage">
            <h1>{item.productName}</h1>
            <p>{item.description}</p>
            <p>
              <b>
                {/* Setting the discount */}
                {"₹" + Math.ceil(((100 - item.discount) / 100) * item.price)}
              </b>
              <strike> {"₹" + item.price}</strike>
              <span className="discount_percentage">
                {" Save " +
                  " ₹" +
                  Math.ceil(
                    item.price - ((100 - item.discount) / 100) * item.price
                  ) +
                  ("(" + item.discount + "%)")}
              </span>
            </p>
            <h3>
              Rating:
              <StarRatings
                rating={item.rating.rate}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#FF9529"
              />
              ({item.rating.count} reviews)
            </h3>
            <div style={{ margin: "10px" }}>
              <div className="productpage-buttons">
                <button
                  onClick={() => {
                    // Checking if the product is in the cart
                    props.cartItems.forEach((cartItem) => {
                      if (item._id === cartItem._id) setDisabled(true);
                    });
                    //Adding item to store
                    props.dispatch(handleaddtoCart(item._id));
                    toast.success("Your Item Is Added", toastStyler); //Success msg
                  }}
                  disabled={disabled}
                >
                  {/* If the product is already in the cart it cannot be added again. We can simply go the cart page to view the product and increase the quantity there */}
                  {disabled ? "Already in Cart" : "Add to Cart"}
                </button>
                <button disabled={item.type !== "Rent"}>Rent Now</button>
              </div>
              {/* Checking if the user is logged in redirecting to login page if not */}
              <Link
                to={
                  isLoggedIn //cant buy the product without logging in
                    ? {
                        pathname: "/payment",
                        // Sending the required information to the payment page
                        state: {
                          products: [item], //Sent as an array as the cartItems products will be present as an array
                          productId: productId,
                          prevPath: location.pathname,
                        },
                      }
                    : {
                        pathname: "/login",
                      }
                }
              >
                <button
                  className="buynow-button"
                  disabled={item.type !== "Buy"}
                >
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="other-info">
          <div className="categories-area" id="button-category">
            <div className="button-area">
              <button
                onClick={() => {
                  setResourceType(<Reviews items={reviews} />); //Show reviews component on clicking the reviews button
                  toggleAnimation(1);
                }}
                className={activeDiv === 1 ? "gelatine" : ""}
              >
                Reviews
              </button>
              <button
                onClick={() => {
                  setResourceType(<Faqs items={faqs} />); //Show faqs component on clicking the faqs button
                  toggleAnimation(2);
                }}
                className={activeDiv === 2 ? "gelatine" : ""}
              >
                FAQs
              </button>
              <button
                onClick={() => {
                  toggleAnimation(3);
                  setResourceType(<SimilarItems type={item.type} />); //Show similar items component on clicking the similar items button
                }}
                className={activeDiv === 3 ? "gelatine" : ""}
              >
                Similar Items
              </button>
            </div>
          </div>
          {/* The resourceType  (Review/Faq/SimilarItems) is shown here */}
          <div className="resource-display">{resourceType}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    cartItems: state.cartReducer.cart,
  };
};

export default connect(mapStateToProps)(ProductPage);
