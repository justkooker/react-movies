import React, { useEffect } from 'react';
import FilmList from 'components/FilmList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from 'redux/features/filmsSlice';
import styles from './VideoView.module.css';

export default function VideoView() {
  const dispatch = useDispatch();

  const upcomingFilmsStatus = useSelector(
    state => state.filmsState.upcomingFilmsStatus
  );
  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, []);
  const filmList = useSelector(state => state.filmsState.films);
  return (
    <>
      {upcomingFilmsStatus && (
        <p className={styles.upcoming}>Upcoming movies</p>
      )}
      <FilmList filmList={filmList} />
    </>
  );
}
