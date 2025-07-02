import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Header from "./components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage/CatalogPage.jsx";
import CamperDetailPage from "./pages/CamperDetailPage/CamperDetailPage.jsx";
import Loader from "./components/Loader/Loader.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
