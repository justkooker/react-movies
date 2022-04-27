import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from '../../services/api-services';
import BackButton from 'components/BackButton';
import styles from './FilmDetails.module.css';

export default function FilmDeltails() {
  const { filmId } = useParams();
  const [filmDetails, setVideoDetails] = useState({
    yotubeId: '',
    title: '',
    poster_path: '',
    genres: [],
    overview: '',
    budget: '',
    production_companies: [],
  });
  const [yotubeId, setYoutubeId] = useState({ yotubeId: '' });
  const [cast, setCast] = useState([]);
  const posterURL = 'https://image.tmdb.org/t/p/w500/';
  useEffect(() => {
    services.fetchFilmDetail(filmId).then(details => setVideoDetails(details));
  }, []);
  useEffect(() => {
    services
      .fetchIdForYoutube(filmId)
      .then(videos => videos.find(video => video.type === 'Trailer'))
      .then(({ key }) => setYoutubeId(key));
  }, []);
  useEffect(() => {
    services.fetchFilmCast(filmId).then(data => setCast([...data]));
  }, []);
  cast.length = 4;
  return (
    <>
      <div className={styles.overlay}></div>

      <div className={styles.BackButton}>
        <BackButton />
      </div>
      {filmDetails.id !== '' && (
        <div className={styles.container}>
          <p className={styles.title}>{filmDetails.title}</p>
          <div className={styles.aaa}>
            <img src={`${posterURL}${filmDetails.poster_path}`} alt="" />
            <iframe
              width="100%"
              height="auto"
              src={`https://www.youtube.com/embed/${yotubeId}?showinfo=0&modestbranding=1&autoplay=1&controls=1 `}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className={styles.detailsContaner}>
            <ul>
              {filmDetails.genres.map(({ id, name }) => {
                return (
                  <li key={id} className={styles.genre}>
                    {name}
                  </li>
                );
              })}
            </ul>
            <ul>
              {filmDetails.production_companies.map(({ id, name }) => {
                return (
                  <li key={id} className={styles.company}>
                    {name}
                  </li>
                );
              })}
            </ul>
            <p className={styles.overview}>{filmDetails.overview}</p>

            <ul className={styles.castList}>
              <span className={styles.section}>stars</span>
              {cast.map(({ id, name }) => (
                <li key={id} className={styles.castListItem}>
                  {name}
                </li>
              ))}
            </ul>
            <div className={styles.sectionContainer}>
              <span className={styles.section}>budget</span>
              <span className={styles.budget}> ${filmDetails.budget}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
