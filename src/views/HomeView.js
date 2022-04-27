import React, { Component } from 'react';
import TrendFilmList from '../components/TrendFilmList'


class HomeView extends Component {
  render() {
    return <TrendFilmList trendFilms={this.props.trendFilms} />;
  }
}

export default HomeView;
