import React from "react";
import { useId } from "react";
import css from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, selectLocationFilter } from "../../redux/filtersSlice";

const SearchBar = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const value = useSelector(selectLocationFilter);

  const handleChange = (e) => {
    dispatch(addLocation(e.target.value));
    console.log(e.target.value);
  };

  return (
    <div>
      <label className={css.searchLabel} htmlFor={searchId}>
        Location
      </label>
      <div className={css.searchContainer}>
        <input
          className={css.searchbar}
          type="text"
          value={value}
          onChange={handleChange}
          id={searchId}
          placeholder="City"
        />
        <svg
          className={css.mapIcon}
          width="20"
          height="20"
          // onClick={handleChange}
        >
          <use href={"/icons.svg#map"}></use>
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
