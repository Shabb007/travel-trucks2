import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCamperById,
  addToFavorites,
  removeFromFavorites,
} from "../../store/campersSlice";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
  FaGasPump,
  FaBed,
  FaTv,
  FaBath,
  FaBroadcastTower,
  FaUtensils,
} from "react-icons/fa";
import { MdAcUnit } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import Loader from "../../components/Loader/Loader";
import BookingForm from "../../components/BookingForm/BookingForm";
import "./CamperDetailPage.css";

const CamperDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCamper, loading, error, favorites } = useSelector(
    (state) => state.campers
  );
  const [activeTab, setActiveTab] = useState("features");

  const isFavorite = favorites.includes(id);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  const formatPrice = (price) => {
    return `€${price.toFixed(2)}`;
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="detail-page">
        <div className="container">
          <div className="error-message">
            <h2>Camper not found</h2>
            <p>{error}</p>
            <button onClick={() => navigate("/catalog")} className="back-btn">
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCamper) return null;

  const camper = currentCamper;

  return (
    <div className="detail-page">
      <div className="container">
        <div className="camper-header">
          <h1>{camper.name}</h1>
          <div className="camper-meta">
            <div className="rating">
              <FaStar className="star" />
              <span>{camper.rating}</span>
              <span className="reviews">
                ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className="location">
              <FaMapMarkerAlt />
              <span>{camper.location}</span>
            </div>
          </div>
          <div className="price-favorite">
            <span className="price">{formatPrice(camper.price)}</span>
            <button className="favorite-btn" onClick={handleFavoriteClick}>
              {isFavorite ? (
                <FaHeart className="favorite-active" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
        </div>

        <div className="gallery">
          {camper.gallery?.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image.thumb}
                alt={`${camper.name} ${index + 1}`}
                onError={(e) => {
                  e.target.src = "/placeholder-camper.jpg";
                }}
              />
            </div>
          ))}
        </div>

        <p className="description">{camper.description}</p>

        <div className="detail-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "features" ? "active" : ""}`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            <div className="tab-panel">
              {activeTab === "features" && <CamperFeatures camper={camper} />}
              {activeTab === "reviews" && (
                <CamperReviews reviews={camper.reviews || []} />
              )}
            </div>

            <div className="booking-section">
              <BookingForm camperId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CamperFeatures = ({ camper }) => {
  const getFeaturesList = () => {
    const features = [];

    if (camper.adults)
      features.push({ icon: <FaUsers />, label: `${camper.adults} adults` });
    if (camper.transmission)
      features.push({
        icon: <GiGearStickPattern />,
        label: camper.transmission,
      });
    if (camper.engine)
      features.push({ icon: <FaGasPump />, label: camper.engine });
    if (camper.AC) features.push({ icon: <MdAcUnit />, label: "AC" });
    if (camper.kitchen)
      features.push({ icon: <FaUtensils />, label: "Kitchen" });
    if (camper.beds)
      features.push({ icon: <FaBed />, label: `${camper.beds} beds` });
    if (camper.TV) features.push({ icon: <FaTv />, label: "TV" });
    if (camper.bathroom) features.push({ icon: <FaBath />, label: "Bathroom" });
    if (camper.radio) features.push({ icon: <FaBroadcastTower />, label: "Radio" });

    return features;
  };

  return (
    <div className="features-content">
      <div className="features-list">
        {getFeaturesList().map((feature, index) => (
          <div key={index} className="feature">
            {feature.icon}
            <span>{feature.label}</span>
          </div>
        ))}
      </div>

      <div className="vehicle-details">
        <h3>Vehicle details</h3>
        <div className="details-list">
          {camper.form && (
            <div className="detail-item">
              <span>Form</span>
              <span>{camper.form}</span>
            </div>
          )}
          {camper.length && (
            <div className="detail-item">
              <span>Length</span>
              <span>{camper.length}</span>
            </div>
          )}
          {camper.width && (
            <div className="detail-item">
              <span>Width</span>
              <span>{camper.width}</span>
            </div>
          )}
          {camper.height && (
            <div className="detail-item">
              <span>Height</span>
              <span>{camper.height}</span>
            </div>
          )}
          {camper.tank && (
            <div className="detail-item">
              <span>Tank</span>
              <span>{camper.tank}</span>
            </div>
          )}
          {camper.consumption && (
            <div className="detail-item">
              <span>Consumption</span>
              <span>{camper.consumption}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CamperReviews = ({ reviews }) => {
  if (!reviews.length) {
    return (
      <div className="no-reviews">
        <p>No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="reviews-content">
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review-header">
            <div className="reviewer-avatar">
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className="reviewer-info">
              <h4>{review.reviewer_name}</h4>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.reviewer_rating ? "star filled" : "star empty"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CamperDetailPage;
