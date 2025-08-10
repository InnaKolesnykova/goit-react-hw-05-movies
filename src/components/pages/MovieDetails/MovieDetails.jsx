import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link, useLocation, useNavigate, Route, Routes, Outlet } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { fetchMovieDetails } from '../../components/fetch/fetchMovieDetail';

const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [subPageVisits, setSubPageVisits] = useState(0); 
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [movieId]);

  const date = movieDetails ? movieDetails.release_date.slice(0, 4) : '';

  useEffect(() => {
    if (location.pathname.includes('cast') || location.pathname.includes('reviews')) {
      setSubPageVisits((prevCount) => prevCount + 1);
    }
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1 - subPageVisits);
  };

  return (
    <div className={styles.container}>
      <Link
        to={location.state?.from === '/' ? '/' : '/movies'}
        className={styles.backLink}
        onClick={goBack}
      >
        Go back
      </Link>

      {movieDetails && (
        <div className={styles.mainDiv}>
          <div className={styles.posterPlaceholder}>
            {movieDetails.poster_path ? (
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                height="440px"
              />
            ) : (
              <div className={styles.placeholderText}>No Poster Available</div>
            )}
          </div>
          <div className={styles.info}>
            <h1>{`${movieDetails.title} (${date})`}</h1>
            <p>User Score: {movieDetails.vote_average}</p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h2>Genres</h2>
            {movieDetails.genres && (
              <ul>
                {movieDetails.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <div className={styles.linkBox}>
        <Link className={styles.link} to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link className={styles.link} to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<Outlet />}
          />
          <Route path="cast" element={<Cast movieId={movieId} />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetails;