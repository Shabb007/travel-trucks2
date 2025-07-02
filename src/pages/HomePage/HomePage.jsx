import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Campers of your dreams</h1>
          <p>You can find everything you want in our catalog</p>
          <Link to="/catalog" className="cta-button">
            View Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
