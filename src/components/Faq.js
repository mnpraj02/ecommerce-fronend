import React from "react";
import Votes from "./Votes";
import "../styles/Faq.css";

function Faq(props) {
  const { question, answer } = props.content;
  let upvotes = props.content.upvotes;

  return (
    //Displays the information related to single faq using props which were sent in the previous component
    <div className="single-faq">
      {/* Votes changed in Votes component */}
      <Votes upvotes={upvotes} />
      <div className="qna">
        <div>
          <h3>{question}</h3>
        </div>
        <div>{answer}</div>
      </div>
    </div>
  );
}

export default Faq;
