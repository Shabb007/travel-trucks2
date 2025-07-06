import React from "react";
import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("../pages/DetailsPage/DetailsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const Features = lazy(() => import("./Features/Features"));
const Reviews = lazy(() => import("./Reviews/Reviews"));

import style from "./App.module.css";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={style.container}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/catalog" element={<CatalogPage />}></Route>
          <Route path="/catalog/:catalogId" element={<DetailsPage />}>
            <Route index element={<Navigate to="features" />} />
            <Route path="features" element={<Features />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
