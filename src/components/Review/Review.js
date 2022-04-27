import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import services from '../../services/api-services';
export default function Review() {
  const [reviews, setReviews] = useState([]);
  const { filmId } = useParams();
  useEffect(() => {
    services.fetchFilmReviews(filmId).then(review => setReviews(review));
  }, []);
  return (
    <>
      {reviews.length !==0 ?
      (<ul>
        {reviews.map(({id,author}) => {
          return (
            <li key={id}>
              <p>{author}</p>
            </li>
          );
        })}
      </ul>)
      : (<p>No reviews</p>)}
    </>
  );
}
