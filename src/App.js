import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './views/routes';
import services from './services/api-services';

import HomeView from 'views/HomeView';
import VideoView from 'views/VideoView';
import FilmDeltailsView from './views/FilmDetailsView/FilmDeltailView';
import Cast from 'components/Cast';
import Review from 'components/Review';
import AppBar from './components/AppBar';

export default class App extends Component {
  state = {
    searchQuery: '',
    films: [],
    storageFIlm: null,
    page: 1,
    totalCountFilm: 0,
    fetchingScroll: true,
  };
  componentDidMount() {
    const films = JSON.parse(localStorage.getItem('films'));
    this.setState({ storageFIlm: films });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.addFilmsWithFormSubmit();
    }
  }
  handleChangeQuery = query => {
    this.setState({ searchQuery: query, page: 1, films: [] });
  };
  toggleFetchingScroll = () => {
    this.setState({ fetchingScroll: true });
  };
  addFilmsWithFormSubmit = () => {
    const { searchQuery } = this.state;
    if (searchQuery) {
      services
        .fetchSearchMovies(searchQuery)
        .then(({ results, total_results }) => {
          this.setState({
            films: [...results],
            page: this.state.page + 1,
            totalCountFilm: total_results,
          });
          localStorage.setItem('films', JSON.stringify([...results]));
        })
        .finally(() => this.setState({ fetchingScroll: false }));
    }
  };

  addFilmsWithInfiniteScroll = () => {
    const { searchQuery, page, films, totalCountFilm } = this.state;
    if (searchQuery && films.length < totalCountFilm) {
      services
        .fetchSearchMovies(searchQuery, page)
        .then(({ results }) => {
          this.setState(prevState => ({
            films: [...prevState.films, ...results],
            page: prevState.page + 1,
          }));
          localStorage.setItem('films', JSON.stringify([...results]));
        })
        .finally(() => this.setState({ fetchingScroll: false }));
    }
  };
  render() {
    return (
      <>
        <AppBar
          onFormSubmit={this.addFilmsWithFormSubmit}
          handleChangeQuery={this.handleChangeQuery}
        />
        <div className="container">
          <Routes>
            <Route path={routes.home} element={<HomeView />} />
            <Route
              path={routes.film}
              element={
                <VideoView
                  films={this.state.films}
                  storageFilm={this.state.storageFIlm}
                  loadMore={this.addFilmsWithInfiniteScroll}
                  toggleFetchingScroll={this.toggleFetchingScroll}
                  fetchingScroll={this.state.fetchingScroll}
                />
              }
            />
            <Route path={routes.filmDetails} element={<FilmDeltailsView />}>
              <Route path={routes.filmCast} element={<Cast />} />
              <Route path={routes.filmReviews} element={<Review />} />
            </Route>
          </Routes>
        </div>
      </>
    );
  }
}
