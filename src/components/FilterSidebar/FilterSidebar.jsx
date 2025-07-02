import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  clearCampers,
  fetchCampers,
} from "../../store/campersSlice";
import {
  FaMapMarkerAlt,
  FaSnowflake,
  FaTv,
  FaBath,
  FaBroadcastTower,
  FaWifi,
} from "react-icons/fa";
import { MdAcUnit } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import "./FilterSidebar.css";
import { FaUtensils } from "react-icons/fa";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.campers);

  const [localFilters, setLocalFilters] = useState(filters);

  const vehicleTypes = [
    { value: "panelTruck", label: "Van", icon: "🚐" },
    { value: "fullyIntegrated", label: "Fully Integrated", icon: "🚌" },
    { value: "alcove", label: "Alcove", icon: "🏠" },
  ];

  const vehicleEquipment = [
    { key: "AC", label: "AC", icon: <MdAcUnit /> },
    { key: "transmission", label: "Automatic", icon: <GiGearStickPattern /> },
    { key: "kitchen", label: "Kitchen", icon: <FaUtensils /> },
    { key: "TV", label: "TV", icon: <FaTv /> },
    { key: "bathroom", label: "Bathroom", icon: <FaBath /> },
    { key: "radio", label: "Radio", icon: <FaBroadcastTower /> },
  ];

  const handleLocationChange = (e) => {
    setLocalFilters({
      ...localFilters,
      location: e.target.value,
    });
  };

  const handleEquipmentChange = (key) => {
    const newFeatures = localFilters.features.includes(key)
      ? localFilters.features.filter((f) => f !== key)
      : [...localFilters.features, key];

    setLocalFilters({
      ...localFilters,
      features: newFeatures,
    });
  };

  const handleVehicleTypeChange = (type) => {
    setLocalFilters({
      ...localFilters,
      form: localFilters.form === type ? "" : type,
    });
  };

  const handleSearch = () => {
    dispatch(clearCampers());
    dispatch(setFilters(localFilters));
    dispatch(fetchCampers(localFilters));
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-section">
        <label className="filter-label">Location</label>
        <div className="location-input">
          <FaMapMarkerAlt className="location-icon" />
          <input
            type="text"
            placeholder="City"
            value={localFilters.location}
            onChange={handleLocationChange}
            className="location-field"
          />
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Filters</h3>

        <div className="filter-group">
          <h4 className="group-title">Vehicle equipment</h4>
          <div className="equipment-grid">
            {vehicleEquipment.map((equipment) => (
              <button
                key={equipment.key}
                className={`equipment-btn ${
                  localFilters.features.includes(equipment.key) ? "active" : ""
                }`}
                onClick={() => handleEquipmentChange(equipment.key)}
              >
                {equipment.icon}
                <span>{equipment.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4 className="group-title">Vehicle type</h4>
          <div className="vehicle-grid">
            {vehicleTypes.map((type) => (
              <button
                key={type.value}
                className={`vehicle-btn ${
                  localFilters.form === type.value ? "active" : ""
                }`}
                onClick={() => handleVehicleTypeChange(type.value)}
              >
                <span className="vehicle-icon">{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default FilterSidebar;
