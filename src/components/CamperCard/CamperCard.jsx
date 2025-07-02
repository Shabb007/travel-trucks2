import React from "react";
import "./CamperCard.css";

const CamperCard = ({ camper }) => {
  return (
    <div className="camper-card">
      <div className="camper-image">
        <img
          src={camper.gallery?.[0]?.thumb || "/placeholder.jpg"}
          alt={camper.name}
        />
      </div>
      <div className="camper-info">
        <h3>{camper.name}</h3>
        <p className="price">€{camper.price}.00</p>
        <p className="location">{camper.location}</p>
        <p className="description">{camper.description}</p>
        <button className="show-more-btn">Show more</button>
      </div>
    </div>
  );
};

export default CamperCard;
