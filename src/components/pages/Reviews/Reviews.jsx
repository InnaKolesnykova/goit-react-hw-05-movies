import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Reviews.module.css'; 

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const { movieId } = useParams();
  const apiKey = '6ec0ba8fa041ffdfd513a6b00a854a64';
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();

        if (json.results) {
          setReviews(json.results);
        } else {
          console.error('Unexpected response structure:', json);
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [apiUrl]);

  const loadMoreReviews = () => {
  if (reviews.length > visibleReviews) {
    setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 4);
  }
};

  
  return (
    <div className={styles.reviewBox}>
      <h2 className={styles.reviewsTitle}>Movie Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.slice(0, visibleReviews).map((review) => (
            <li className={styles.reviewsItem} key={review.id}>
              <h3 className={styles.reviewsAuthor}><span className={styles.reviewAuthorSign}>Author: </span>{review.author}</h3>
              <p className={styles.review}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
      {reviews.length > visibleReviews && (
          <button onClick={loadMoreReviews} className={styles.btn}>Load More</button>
      )}
    </div>
  );
};

export default Reviews;