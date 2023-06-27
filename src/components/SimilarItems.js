import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import MiniProduct from "./MiniProduct";
import "./../styles/SimilarItems.css";
import { getAllProducts } from "../utils/api";

function SimilarItems(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  //Same type of products are obtained
  useEffect(() => {
    getAllProducts().then((result) => {
      // set products as deals
      setIsLoaded(true);
      setItems(result.data.products);
    });
  }, [props.type]);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />; //Loader is rendered while the page renders
  } else {
    return (
      <div>
        <h1 className="items-heading">Items you may like:</h1>
        <div className="items-display">
          {/* First 5 items found are displayed */}
          {items.slice(0, 4).map((item) => {
            return (
              <div className="similar-item" onClick={scrollTop}>
                <MiniProduct data={item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SimilarItems;
