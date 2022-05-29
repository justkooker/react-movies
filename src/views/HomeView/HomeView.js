import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTrendFilms } from 'redux/features/filmsSlice';
import TrendFilmList from '../../components/TrendFilmList';

function HomeView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrendFilms());
  }, []);
  return <TrendFilmList />;
}

export default HomeView;
