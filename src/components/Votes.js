import React, { useState } from "react";
import "../styles/Votes.css";

function Votes(props) {
  //For tracking the upvotes in Faq page
  const upvote = props.upvotes;
  const [addend, setAddend] = useState(0);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  //Increasing the votes
  const increaseVotes = () => {
    setAddend((prevValue) => {
      return prevValue === 1 ? 0 : 1;
    });
    if (addend === 1) {
      setUpvoted(false);
    } else {
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  //   Decreasing the votes
  const decreaseVotes = () => {
    setAddend((prevValue) => {
      return prevValue === -1 ? 0 : -1;
    });
    if (addend === -1) {
      setDownvoted(false);
    } else {
      setDownvoted(true);
      setUpvoted(false);
    }
  };
  return (
    <div className="voting-area">
      <button
        onClick={increaseVotes}
        // Green if upvoted else black
        style={{ color: upvoted ? "green" : "black" }}
      >
        <i className="fas fa-caret-up"></i>
      </button>
      <span>{upvote + addend}</span>
      <button
        onClick={decreaseVotes}
        //Red if downvoted else black
        style={{ color: downvoted ? "red" : "black" }}
      >
        <i className="fas fa-caret-down"></i>
      </button>
    </div>
  );
}

export default Votes;
