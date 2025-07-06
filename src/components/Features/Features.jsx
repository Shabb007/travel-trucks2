import React from "react";
import { useSelector } from "react-redux";
import { selectOne } from "../../redux/trucksSlice";
import css from "./Features.module.css";

const Features = () => {
  const truck = useSelector(selectOne);
  return (
    <div className={css.featuresContainer}>
      <div className={css.categories}>
        {truck.transmission && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#diagram"} />
            </svg>
            <p className={css.iconBoxText}>Automatic</p>
          </div>
        )}
        {truck.engine && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#fuel"} />
            </svg>
            <p className={css.iconBoxText}>
              {truck.engine === "petrol" ? "Petrol" : "Diesel"}
            </p>
          </div>
        )}
        {truck.TV && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#tv"} width={20} height={20} />
            </svg>
            <p className={css.iconBoxText}>TV</p>
          </div>
        )}
        {truck.AC && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#wind"} />
            </svg>
            <p className={css.iconBoxText}>AC</p>
          </div>
        )}
        {truck.kitchen && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#cup-hot"} />
            </svg>
            <p className={css.iconBoxText}>Kitchen</p>
          </div>
        )}
        {truck.microwave && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#microwave1"} />
            </svg>
            <p className={css.iconBoxText}>Microwave</p>
          </div>
        )}

        {truck.radio && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#radios"} />
            </svg>
            <p className={css.iconBoxText}>Radio</p>
          </div>
        )}
        {truck.water && (
          <div className={css.iconBox}>
            <svg width={20} height={20}>
              <use href={"/icons.svg#water"} />
            </svg>
            <p className={css.iconBoxText}>Water</p>
          </div>
        )}
      </div>
      <div className={css.featuresDetails}>
        <p className={css.vehicleText}>Vehicle details</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="527"
          height="2"
          viewBox="0 0 527 2"
          fill="none"
        >
          <path d="M0 1H527" stroke="#DADDE1" />
        </svg>
        <ul className={css.featuresList}>
          <li className={css.featuresItem}>
            <p>Form</p>
            <p>{truck.form}</p>
          </li>
          <li className={css.featuresItem}>
            <p>Length</p>
            <p>{truck.length}</p>
          </li>
          <li className={css.featuresItem}>
            <p>Width</p>
            <p>{truck.width}</p>
          </li>
          <li className={css.featuresItem}>
            <p>Height</p>
            <p>{truck.height}</p>
          </li>
          <li className={css.featuresItem}>
            <p>Tank</p>
            <p>{truck.tank}</p>
          </li>
          <li className={css.featuresItem}>
            <p>Consumption</p>
            <p>{truck.consumption}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
