import './App.module.css';

import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import Navigation from '../Navigation/Navigation';
import { ToastContainer } from 'react-toastify';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage')
);
const CamperPage = lazy(() => import('../../pages/CamperPage/CamperPage'));

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
      >
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<CatalogPage />} path="/catalog" />
          <Route element={<CamperPage />} path="/catalog/:id">
            <Route index element={<Navigate to="features" replace />} />
            <Route element={<CamperFeatures />} path="features" />
            <Route element={<CamperReviews />} path="reviews" />
          </Route>
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}

export default App;
