import React from "react";
import "../styles/NoResult.css";

function NoResult() {
  return (
    //Displaying information if there are no search results
    <div className="noresult-main">
      <h1>Sorry, we were not able to find results for your search.</h1>
      <p>The reasons could be:</p>
      <ul>
        <li>
          The product you are searching for may not be available on our website.
        </li>
        <li>There must be a typo in your search query.</li>
        <li>Try to use more generic terms.</li>
        <li>Connect with us on Mail for further assistance.</li>
      </ul>
    </div>
  );
}

export default NoResult;
