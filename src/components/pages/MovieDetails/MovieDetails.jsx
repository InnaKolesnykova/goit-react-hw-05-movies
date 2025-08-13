import React, { useEffect, useState, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const api_key = '6ec0ba8fa041ffdfd513a6b00a854a64';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.movieBox}>
      <button className={styles.btnBack} onClick={handleGoBack}>
        Go Back
      </button>

      <div className={styles.details}>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className={styles.additional}>
        <h3>Additional information</h3>
        <ul className={styles.list}>
          <li>
            <Link to="cast" state={{ from: location.state?.from }}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<p>Loading section...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
