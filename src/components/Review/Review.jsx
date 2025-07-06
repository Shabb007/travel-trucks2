import React from "react";
import StarRating from "../StarRating/StarRating";
import style from "./Review.module.css";

const Review = ({ data: { reviewer_name, reviewer_rating, comment } }) => {
  return (
    <div className={style.reviewContainer}>
      <div className={style.iconAndStars}>
        <div className={style.icon}>{reviewer_name.slice(0, 1)}</div>
        <div>
          <p>{reviewer_name}</p>
          <StarRating rating={reviewer_rating} />
        </div>
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default Review;
