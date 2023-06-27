import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import Loader from "./Loader";
import { getOneProduct, postReview } from "../utils/api";
function ReviewForm(props) {
  const [item, setItem] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [error, setError] = useState();
  //Getting data from previous Route
  const location = useLocation();
  const productId = location.state.productId;
  //Fetching the required product for which we want to post the review
  useEffect(() => {
    Promise.resolve(
      getOneProduct(productId)
        .then((res) => res.data)
        .then(
          (i) => {
            setItem(i);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    );
    window.scrollTo(0, 0); //Page going to top
  }, [productId]);
  const history = useHistory();
  const [body, setBody] = useState("");
  const [heading, setHeading] = useState("");
  const { user } = props;

  const [star, setStar] = useState(0);

  // Tracking changes in Star,Body,Heading

  function changeStar(newStar) {
    setStar(newStar);
  }

  const getBody = (event) => {
    setBody(event.target.value);
  };

  const getHeading = (event) => {
    setHeading(event.target.value);
  };

  const addReview = (event) => {
    //Add review only if body and heading are not empty
    if (body.length < 4 || heading.length < 4) {
      toast.warning(
        "Enter atleast 4 characters in Body and heading",
        toastStyler
      );
    } else if (!star) {
      toast.warning("Atleast 1 star should be given", toastStyler);
    } else {
      const data = {
        productId: productId,
        userId: user._id,
        heading: heading,
        body: body,
        rating: star,
      };
      // item.Reviews.unshift(data); //Adding the review in the 1st position of array

      //PATCH request for the product(Updating the review)
      // fetch(`http://localhost:3000/products/${productId}`, {
      //   method: "PATCH", // or 'PUT'
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(item),
      // })
      postReview(data)
        .then((response) => console.log(response.json()))
        .then((data) => {
          console.log("Success:", data);
          toast.success("Review Posted successfully", toastStyler);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      event.preventDefault();
      setBody("");
      setHeading("");
      setStar(0);
      history.push("/"); //Redirect to home after the review has been posted
    }
  };
  if (error) {
    return <div>Error in Review form: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      //Rendering the Loader animation while loading the data
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex" }}>
        <img
          style={{ width: "40%", height: "91vh" }}
          src="https://www.episervice.org/webres/Image/Blog%20Graphics%20(2).png"
          alt="review-matters"
          width="50%"
          height="650px"
        />
        <div style={{ width: "60%" }} className="review-form">
          <h2>Submit your Review</h2>
          <StarRatings
            rating={star}
            changeRating={changeStar}
            starHoverColor="#ffcc01"
            starRatedColor="#ffcc01"
            starDimension="40px"
          />
          <input
            id="review-textarea"
            placeholder="Write your heading"
            onChange={getHeading}
            value={heading}
            required
          />
          <textarea
            style={{ resize: "none" }}
            id="review-textarea"
            placeholder="Write the body"
            onChange={getBody}
            value={body}
            rows={5}
            required
          />
          <button id="review-submit-button" onClick={addReview}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user.userData,
  };
}
export default connect(mapStateToProps)(ReviewForm);
