import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import routes from 'routes/routes';
import { searchMovies } from 'redux/features/filmsSlice';
import styles from './SearchForm.module.css';
export default function SearchForm() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(searchMovies(query));
    resetQuery();
  };
  const resetQuery = () => {
    setQuery('');
  };
  const onChangeQuery = e => {
    setQuery(e.target.value);
  };
  const navigateToFilm = () => {
    navigate(routes.film);
    if (pathname !== routes.film) {
      navigate(routes.film);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        onFocus={navigateToFilm}
        onChange={onChangeQuery}
        aria-label="serch-movies"
        type="text"
        value={query}
      />
      <button aria-label='search-movie-submit-button' type="submit"></button>
    </form>
  );
}
