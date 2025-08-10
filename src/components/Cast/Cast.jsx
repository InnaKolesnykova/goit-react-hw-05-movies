import React, { useState, useEffect } from "react";
import styles from './Cast.module.css';

const Cast = ({ movieId }) => {
    const [cast, setCast] = useState([]);
    const [visibleActors, setVisibleActors] = useState(8);
    const apiKey = '6ec0ba8fa041ffdfd513a6b00a854a64';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    useEffect(() => {
        const fetchMovieCredits = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.cast) {
                    setCast(data.cast);
                } else {
                    console.error('No cast data found:', data);
                }
            } catch (error) {
                console.error('Error fetching movie credits:', error);
            }
        };
        fetchMovieCredits();
    }, [apiUrl, movieId]);

    const loadMoreActors = () => {
        setVisibleActors(prevVisibleActors => prevVisibleActors + 8);
    };

    return (
        <div className={styles.cast}>
        {cast.length > 0 ? (
            <>
            <ul className={styles.castList}>
                {cast.slice(0, visibleActors).map((castMember) => (
                <li className={styles.castCard} key={castMember.id}>
                    <div className={styles.placeholder}>
                    {castMember.profile_path ? (
                        <img
                        className={styles.image}
                        src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                        alt={castMember.name}
                        />
                    ) : (
                        <div className={styles.noImage}>No Image</div>
                    )}
                    </div>

                    <div className={styles.infobox}>
                    <p>{`${castMember.name}`}</p>
                    <p>Character: {`${castMember.character}`}</p>
                    </div>
                </li>
                ))}
            </ul>
            {cast.length > visibleActors && (
                <button onClick={loadMoreActors} className={styles.btn}>
                Load More
                </button>
            )}
            </>
        ) : (
            <p>No information about actors available for this movie.</p>
        )}
        </div>
    );
    };

export default Cast;