import React from "react";
import "../styles/loader.css";
const Loader = () => {
  // basic loader with in line css
  return (
    <div
      style={{ position: "relative", left: "45%", marginTop: "5%" }}
      className="loader"
    ></div>
  );
};
export default Loader;
