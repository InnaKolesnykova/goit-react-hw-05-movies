import React from 'react';
import PropTypes from 'prop-types';
import styles from './MoviesList.module.css';
import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ movies, fromPage }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.original_title || movie.name}
                className={styles.movieImg}
              />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}
            <p className={styles.movieTitle}>
              {movie.original_title || movie.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  fromPage: PropTypes.string
};

export default MoviesList;
