import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTrendFilms,fetchUpcomingMovies } from 'redux/features/filmsSlice';
import TrendFilmList from '../../components/TrendFilmList';

export default function HomeView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrendFilms());
    dispatch(fetchUpcomingMovies());

  }, []);
  return <TrendFilmList />;
}

