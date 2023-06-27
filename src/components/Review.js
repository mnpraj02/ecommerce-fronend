import React from "react";
import StarRatings from "react-star-ratings";

function Review(props) {
  //Getting required info from props
  console.log(props);
  const { userId, heading, body, rating } = props.content;
  console.log(props.content);
  return (
    //Displaying the info sent from Reviews component
    <div style={{ textAlign: "left", margin: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginLeft: 10 }}>
          {/* <img src="https://img.icons8.com/office/80/000000/user.png" alt="idk"/> */}
          <img
            style={{ height: 40, width: 40, borderRadius: 50 }}
            // src="https://secure.gravatar.com/avatar/8c5d4c4b9ef6c68c4ff91c319d4c56be?d=404&s=300"
            src={userId.avatar}
            alt="avatar"
          />
        </div>
        <div style={{ marginLeft: "1%" }}>
          <h4>{userId.fullName}</h4>
        </div>
      </div>
      <div style={{ marginLeft: 10 }}>
        <StarRatings
          starDimension="22px"
          starSpacing="2px"
          starRatedColor="#ffcc01"
          starEmptyColor="#e3e3e3"
          rating={rating}
        />
      </div>
      <h3>{heading}</h3>
      <p>{body}</p>
      <hr />
    </div>
  );
}

export default Review;
