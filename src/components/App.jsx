import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Movies = React.lazy(() => import('./pages/Movies/Movies'));
const MovieDetails = React.lazy(() => import('./pages/MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('./Cast/Cast'));
const Reviews = React.lazy(() => import('./pages/Reviews/Reviews'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

const App = () => {
  return (
    <div>
      <SharedLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId/*" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
};

export default App;
