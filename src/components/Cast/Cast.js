import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from '../../services/api-services';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { filmId } = useParams();
  useEffect(() => {
    services.fetchFilmCast(filmId).then(cast => setCast(cast));
  }, []);

  return (
    <>
      {cast.length !== 0 ? (
        <ul>
          {cast.map(({id,name}) => {
            return (
              <li key={id}>
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No credits</p>
      )}
    </>
  );
}
