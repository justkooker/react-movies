import React, { Component } from 'react';
import services from '../../services/api-services';
import FilmList from 'components/FilmList';

class TrendFilmList extends Component {
  state = {
    trendFilms: [],
  };
  componentDidMount() {
    services.fetchPopularMovies().then(data => {
      this.setState({ trendFilms: [...data] });
    });
  }
  render() {
    const { trendFilms } = this.state;
    return <FilmList trendFilms={trendFilms} />;
  }
}
export default TrendFilmList;
