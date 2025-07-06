import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import style from "./Filters.module.css";
import { addFilter, selectFilter } from "../../redux/filtersSlice";

const Filters = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (filter) => {
    dispatch(addFilter(filter));
  };

  const filters = useSelector(selectFilter);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Filters event form", event.target.form.elements);
    const elements = event.target.form.elements;
    console.log("Elements", elements);
    const { AC, Automatic } = elements;
    console.log("AC", AC);
    console.log("Automatic", Automatic);
  };

  return (
    <form className={style.filtersContainer}>
      <p className={style.filtersText}>Filters</p>
      <div className={style.filterEquipmentContainer}>
        <h3>Vehicle equipment</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="360"
          height="2"
          viewBox="0 0 360 2"
          fill="none"
        >
          <path d="M0 1H360" stroke="#DADDE1" />
        </svg>
        <ul className={style.filterList}>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.AC,
            })}
            onClick={() => handleFilterChange({ AC: !filters.AC })}
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#wind"}></use>
            </svg>
            <p className={style.filterCardText}>AC</p>
          </li>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.transmission,
            })}
            onClick={() =>
              handleFilterChange(
                filters.transmission
                  ? { transmission: "" }
                  : { transmission: "automatic" }
              )
            }
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#diagram"}></use>
            </svg>
            <p className={style.filterCardText}>Automatic</p>
          </li>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.kitchen,
            })}
            onClick={() => handleFilterChange({ kitchen: !filters.kitchen })}
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#cup-hot"}></use>
            </svg>
            <p className={style.filterCardText}>Kitchen</p>
          </li>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.TV,
            })}
            onClick={() => handleFilterChange({ TV: !filters.TV })}
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#tv"}></use>
            </svg>
            <p className={style.filterCardText}>TV</p>
          </li>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.bathroom,
            })}
            onClick={() => handleFilterChange({ bathroom: !filters.bathroom })}
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#shower"}></use>
            </svg>
            <p className={style.filterCardText}>Bathroom</p>
          </li>
        </ul>
      </div>
      <div className={style.filterEquipmentContainer}>
        <h3>Vehicle type</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="360"
          height="2"
          viewBox="0 0 360 2"
          fill="none"
        >
          <path d="M0 1H360" stroke="#DADDE1" />
        </svg>
        <ul className={style.filterList}>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.form === "panelTruck",
            })}
            onClick={() => handleFilterChange({ form: "panelTruck" })}
            // selected={ }
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#bi_grid-1x2"}></use>
            </svg>
            <p className={style.filterCardText}>Van</p>
          </li>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.form === "fullyIntegrated",
            })}
            onClick={() => handleFilterChange({ form: "fullyIntegrated" })}
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#bi_grid"}></use>
            </svg>
            <p className={style.filterCardText}>Fully Integrated</p>
          </li>
          <li
            className={clsx(style.filterItem, {
              [style.active]: filters.form === "alcove",
            })}
            onClick={() => handleFilterChange({ form: "alcove" })}
          >
            <svg width="32" height="32">
              <use href={"/icons.svg#bi_grid-3x3-gap"}></use>
            </svg>
            <p className={style.filterCardText}>Alcove</p>
          </li>
        </ul>
      </div>
      <button
        className={style.filtersButton}
        onClick={handleSearch}
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default Filters;
