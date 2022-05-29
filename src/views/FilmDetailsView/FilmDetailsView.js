import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import services from 'services/api-services';
import ArrowButton from 'components/ArrowButton';
import styles from './FilmDetails.module.css';
import { useSelector } from 'react-redux';

export default function FilmDeltails() {
  const { filmId } = useParams();
  const desktopView = useSelector(state => state.filmsState.desktopView);
  const [treiler, setTreiler] = useState(false);
  const [filmDetails, setVideoDetails] = useState({
    yotubeId: '',
    title: '',
    poster_path: '',
    genres: [],
    overview: '',
    budget: '',
    production_companies: [],
  });

  const { state } = useLocation();
  const [yotubeId, setYoutubeId] = useState({ yotubeId: '' });
  const [cast, setCast] = useState([]);
  const posterURL = 'https://image.tmdb.org/t/p/w500/';
  const navigate = useNavigate();
  const goBack = function () {
    navigate(state.from.pathname);
  };
  useEffect(() => {
    desktopView ? setTreiler(true) : setTreiler(false);
  }, [desktopView]);
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
  const showTreilerToggle = () => setTreiler(!treiler);
  cast.length = 4;
  filmDetails.production_companies.length = 3;
  return (
    <>
      <div className={styles.overlay}></div>

      {filmDetails.id !== '' && (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <div style={{ display: "flex" }}>
              <div className={styles.BackButton}>
                <ArrowButton func={goBack} />
              </div>
              <p className={styles.title}>{filmDetails.title}</p>
            </div>
            <div className={styles.visualContainer}>
              <img
                src={`${posterURL}${filmDetails.poster_path}`}
                className={styles.poster}
                alt=""
              />
              {!desktopView && (
                <button
                  onClick={showTreilerToggle}
                  className={styles.showTreilerBtn}
                  type="button"
                >
                  {treiler ? 'Close treiler' : 'Show treiler'}
                </button>
              )}
              {treiler && (
                <iframe
                  className={styles.iframe}
                  src={`https://www.youtube-nocookie.com/embed/${yotubeId}?showinfo=0&modestbranding=1&autoplay=1&controls=1 `}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className={styles.detailsContainer}>
              <ul className={styles.detailList}>
                {filmDetails.genres.map(({ id, name }) => {
                  return (
                    <li key={id} className={styles.genre}>
                      {name}
                    </li>
                  );
                })}
              </ul>
              <ul className={styles.detailList}>
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
        </div>
      )}
    </>
  );
}
