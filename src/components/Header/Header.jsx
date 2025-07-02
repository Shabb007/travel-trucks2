import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Travel<span>Trucks</span>
        </Link>
        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={`nav-link ${
              location.pathname === "/catalog" ? "active" : ""
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
