import React, { Component } from "react";
import { sliderData } from "../data";
import BtnSlider from "./BtnSlider";
import "../styles/slider.css";
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { slideIndex: 1 };
  }
  nextSlide = () => {
    // sets the next image to the display
    const currState = this.state.slideIndex;
    this.setState({
      ...this.state,
      slideIndex: currState === sliderData.length ? 1 : currState + 1,
    });
  };
  prevSlide = () => {
    // sets the prev image to the display
    const currState = this.state.slideIndex;
    this.setState({
      ...this.state,
      slideIndex: currState === 1 ? sliderData.length : currState - 1,
    });
  };
  moveDot = (index) => {
    // state has slide index
    this.setState({
      ...this.state,
      slideIndex: index,
    });
  };
  render() {
    const { slideIndex } = this.state;
    return (
      <div className="container-slider">
        {sliderData.map((obj, index) => {
          return (
            <div
              key={obj.id}
              className={slideIndex === index + 1 ? "active-anim" : "slide"}
            >
              <img
                style={{ height: 600 }}
                src={process.env.PUBLIC_URL + `/images/slider${index + 1}.png`}
                alt={index}
              />
            </div>
          );
        })}
        <BtnSlider moveSlide={this.nextSlide} direction={"next"} />
        <BtnSlider moveSlide={this.prevSlide} direction={"prev"} />
        <div className="container-dots">
          {Array.from({ length: sliderData.length }).map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => this.moveDot(index + 1)}
                className={slideIndex === index + 1 ? "dot active" : "dot"}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Slider;
