import styles from './Home.module.css';
import { useEffect, useState, useCallback } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const apiKey = '6ec0ba8fa041ffdfd513a6b00a854a64';
    const apiUrlTrend = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;

    const getTrendMovie = useCallback(() => {
        fetch(apiUrlTrend)
            .then(res => res.json())
            .then((json) => {
                if (json && json.results && Array.isArray(json.results)) {
                    setMovies(json.results.filter(movie => movie.original_title));
                } else {
                    console.error('Invalid response format:', json);
                }
            })
            .catch((error) => {
                console.error('Error fetching trend movies:', error);
            });
    }, [apiUrlTrend]);

    useEffect(() => {
        getTrendMovie();
    }, [getTrendMovie]);

    return (
        <div className={styles.HomeBox}>
            <h1 className={styles.title}>Trending today</h1>  
            {movies.length > 0 && <MoviesList movies={movies} fromPage="home" />}
        </div>
    );
};

export default Home;
