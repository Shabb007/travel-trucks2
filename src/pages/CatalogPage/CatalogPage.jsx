import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, loadMore } from "../../store/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/Loader/Loader";
import "./CatalogPage.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error, pagination } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchCampers());
    }
  }, [dispatch, items.length]);

  const handleLoadMore = () => {
    dispatch(loadMore());
    dispatch(fetchCampers());
  };

  if (error) {
    return (
      <div className="catalog-page">
        <div className="container">
          <div className="error-message">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button
              onClick={() => dispatch(fetchCampers())}
              className="retry-btn"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-layout">
          <FilterSidebar />

          <div className="catalog-content">
            {loading && items.length === 0 ? (
              <Loader />
            ) : (
              <>
                <div className="campers-list">
                  {items.map((camper) => (
                    <CamperCard key={camper.id} camper={camper} />
                  ))}
                </div>

                {items.length === 0 && !loading && (
                  <div className="no-results">
                    <h3>No campers found</h3>
                    <p>Try adjusting your filters</p>
                  </div>
                )}

                {pagination.hasMore && items.length > 0 && (
                  <div className="load-more-container">
                    <button
                      className="load-more-btn"
                      onClick={handleLoadMore}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Load more"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
