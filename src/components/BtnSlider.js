import React, { Component } from "react";
import "../styles/slider.css";
class BtnSlider extends Component {
  render() {
    // console.log(this.props.moveSlide);
    return (
      <button
        className={
          this.props.direction === "next"
            ? "btn-slide next-slide"
            : "btn-slide prev-slide"
        }
        onClick={this.props.moveSlide}
      >
        <i
          className={`fas fa-arrow-${
            this.props.direction === "prev" ? "left" : "right"
          }`}
        ></i>
      </button>
    );
  }
}

export default BtnSlider;
