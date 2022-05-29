import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMobileView, setDesktopView } from 'redux/features/filmsSlice';
import routes from './routes/routes';
import AppBar from 'components/AppBar';
const HomeView = lazy(() =>
  import('./views/HomeView/' /* webpackChunkName: "home-view" */)
);
const FilmDetailsView = lazy(() =>
  import('./views/FilmDetailsView' /* webpackChunkName: "FilmDetails-view" */)
);
const VideoView = lazy(() =>
  import('./views/VideoView' /* webpackChunkName: "video-view" */)
);

function App() {
  const dispatch = useDispatch();
  const onResize = () => {
    window.onresize = () => {
      if (window.innerWidth < 481) {
        dispatch(setMobileView(true));
      }
      if (window.innerWidth > 480) {
        dispatch(setMobileView(false));
      }
      if (window.innerWidth > 1200) {
        dispatch(setDesktopView(true));
      }
      if (window.innerWidth < 1201) {
        dispatch(setDesktopView(false));
      }
    };
  };
  useEffect(() => {
    onResize();
  }, []);
  return (
    <>
      <AppBar />
      <div className="container">
        <Suspense fallback={<p>loading...</p>}>
          <Routes>
            <Route path={routes.home} element={<HomeView />} />
            <Route path={routes.film} element={<VideoView />} />
            <Route path={routes.filmDetails} element={<FilmDetailsView />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
export default App;
