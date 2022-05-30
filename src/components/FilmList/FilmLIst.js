import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import {
  fetchingScrollOn,
  fetchFilmsWithInfiniteScroll,
} from 'redux/features/filmsSlice';
import ArrowButton from 'components/ArrowButton';
import routes from 'routes/routes';
import styles from './FilmList.module.css';
function FilmList({ filmList }) {
  const [activeBtnToTop, setActiveBtnToTop] = useState(false);
  const posterURL = 'https://image.tmdb.org/t/p/w500/';
  const films = useSelector(({ filmsState }) => filmsState.films);
  const fetchingScroll = useSelector(
    ({ filmsState }) => filmsState.fetchingScroll
  );
  const searchQuery = useSelector(({ filmsState }) => filmsState.searchQuery);
  const page = useSelector(({ filmsState }) => filmsState.page);
  const totalCountFilm = useSelector(
    ({ filmsState }) => filmsState.totalCountFilm
  );
  const infiniteScrollParams = {
    searchQuery,
    page,
    totalCountFilm,
    films,
  };
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      50
    ) {
      dispatch(fetchingScrollOn());
    }
    if (e.target.documentElement.scrollTop > 500) {
      setActiveBtnToTop(true);
    }

    if (e.target.documentElement.scrollTop < 500) {
      setActiveBtnToTop(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    if (fetchingScroll && films !== []) {
      dispatch(fetchFilmsWithInfiniteScroll(infiniteScrollParams));
    }
  }, [fetchingScroll]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  return (
    <>
      <ul className={styles.filmList}>
        {filmList.map(film => {
          return (
            <li key={film.id}>
              <div className={styles.linkContainer}>
                <NavLink
                  className={styles.linkContainer}
                  to={`${routes.film}/${film.id}`}
                  state={{ from: { pathname: pathname } }}
                >
                  <img
                    src={`${posterURL}${film.poster_path}`}
                    className={styles.image}
                    alt={film.title}
                  />
                  {film.title}
                </NavLink>
              </div>
            </li>
          );
        })}
      </ul>
      {activeBtnToTop && (
        <div className={styles.toTopBtn}>
          <ArrowButton func={scrollToTop} ariaLabel={'go-to-top'}/>
        </div>
      )}
    </>
  );
}
export default FilmList;
