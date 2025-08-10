import React, { useState, useCallback, useEffect } from 'react';
import styles from './Movies.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(() => {
    // Load from sessionStorage when the component mounts
    const storedMovies = sessionStorage.getItem('movies');
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  const [api_key] = useState('6ec0ba8fa041ffdfd513a6b00a854a64');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSearchResults = useCallback(async (newQuery) => {
    const apiUrlSearch = `https://api.themoviedb.org/3/search/movie?query=${newQuery}&api_key=${api_key}`;

    try {
      setLoading(true);
      const response = await fetch(apiUrlSearch);
      const json = await response.json();

      if (response.ok) {
        setMovies(json.results);
        setError(null);

        // Save to sessionStorage after fetching results
        sessionStorage.setItem('movies', JSON.stringify(json.results));
      } else {
        setError('Failed to fetch search results');
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to fetch search results');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [api_key]);

  useEffect(() => {
    // Load from sessionStorage when the component mounts
    const storedMovies = sessionStorage.getItem('movies');
    const queryParam = new URLSearchParams(window.location.search).get('query');

    if (!queryParam) {
      // Clear sessionStorage if there is no query parameter in the URL
      sessionStorage.removeItem('movies');
    } else if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      try {
        localStorage.setItem('searchQuery', searchQuery);

        await fetchSearchResults(searchQuery);
        navigate(`/movies?query=${searchQuery}`);
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };

  return (
    <div className={styles.MoviesBox}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          onChange={handleChange}
          type="text"
          value={searchQuery}
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && (
        <ul className={styles.searchResults}>
          {movies.map((movie) => (
            <li className={styles.item} key={movie.id}>
              {movie.original_title && (
                <Link className={styles.link} to={`/movies/${movie.id}`}>
                  {movie.original_title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;