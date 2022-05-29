import FilmList from 'components/FilmList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrendFilmList } from 'redux/features/filmsSlice';

function TrendFilmList() {
  const trendFilmList = useSelector(state => state.filmsState.trendFilmList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addTrendFilmList);
  }, []);
  return <FilmList filmList={trendFilmList} />;
}
export default TrendFilmList;
