import FilmList from 'components/FilmList';
import {useSelector } from 'react-redux';
import styles from './VideoView.module.css';

export default function VideoView() {
  const upcomingFilmsStatus = useSelector(
    state => state.filmsState.upcomingFilmsStatus
  );
 
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
