import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './FilmList.module.css';
function FilmList({
  films,
  storageFilm,
  trendFilms,
  loadMore,
  toggleFetchingScroll,
  fetchingScroll = false,
}) {
  const posterURL = 'https://image.tmdb.org/t/p/w500/';

  let data;
  if (trendFilms) {
    data = trendFilms;
  } else if (films === null) {
    data = storageFilm;
  } else {
    data = films;
  }
  const link = film => {
    return data === trendFilms ? (
      <div className={styles.linkContainer}>
        <img src={`${posterURL}${film.poster_path}`} className={styles.image} />
        <NavLink to={`film/${film.id}`}>{film.title}</NavLink>
      </div>
    ) : (
      <div className={styles.linkContainer}>
        <img src={`${posterURL}${film.poster_path}`} className={styles.image} />
        <NavLink to={`${film.id}`}>{film.title}</NavLink>
      </div>
    );
  };

  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      50 
    ) {
      toggleFetchingScroll();
    }
  };
  useEffect(() => {
    if (fetchingScroll && films !== []) {
      loadMore();
    }
  }, [fetchingScroll]);
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  return (
    data && (
      <ul className={styles.filmList}>
        {data.map(film => {
          return <li key={film.id}>{link(film)}</li>;
        })}
      </ul>
    )
  );
}
export default FilmList;
