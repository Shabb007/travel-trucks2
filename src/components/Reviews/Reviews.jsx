import React from "react";
import { useSelector } from "react-redux";
import { selectOne } from "../../redux/trucksSlice";
import css from "./Reviews.module.css";
import Review from "../Review/Review";

const Reviews = () => {
  const truck = useSelector(selectOne);

  if (truck.reviews.length === 0) return <h3>No reviews available.</h3>;

  return (
    <ul className={css.reviewsContainer}>
      {truck.reviews.map((review, index) => (
        <li className={css.item}>
          {console.log("Reviews is !:", review)}
          <Review data={review} key={index} />
          {console.log(`Item ${review.id}`)}
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
