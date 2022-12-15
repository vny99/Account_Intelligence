import React from "react";
import "./Slider.css";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

export default function BtnSlider({ direction, moveSlide }) {
  return (
  <div>

    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      {direction === "next" ? <AiOutlineRight /> : <AiOutlineLeft />}

    </button>

  </div>
  );
 
 
}
