import './App.module.css';

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import Navigation from '../Navigation/Navigation';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage')
);
const CamperPage = lazy(
  () => import('../../pages/CamperPage/CamperPage')
);

const CamperFeatures = lazy(() => import('../CamperFeatures/CamperFeatures'));
const CamperReviews = lazy(() => import('../CamperReviews/CamperReviews'));

//fix suspense

function App() {
  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <MoonLoader
            color="#d15065"
            cssOverride={{ margin: '20px 0' }}
            size="80px"
          />
        }
      ></Suspense>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<CatalogPage />} path="/catalog" />
        <Route element={<CamperPage />} path="/catalog/:id">
          <Route element={<CamperFeatures />} path="features" />
          <Route element={<CamperReviews />} path="reviews" />
        </Route>
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}

export default App;
