import React from "react";
const StarRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          fill={i < rating ? "#FFC531" : "#F2F4F7"} // Change fill color
          dynamically
          width="16"
          height="16"
        >
          <use href={"/icons.svg#star"}></use>
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
