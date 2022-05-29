const { default: axios } = require('axios');

const KEY = '1e5ce310b13e54a49c5d34c28a1fb385';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const fetchPopularMovies = () => {
  return axios.get(`movie/popular?api_key=${KEY}`);
};
const fetchSearchMovies = (searchQuery, page = 1) => {
  return axios.get(
    `search/movie?api_key=${KEY}&query=${searchQuery}&page=${page}`
  );
};
const fetchFilmDetail = id => {
  return axios
    .get(`/movie/${id}?api_key=${KEY}`)
    .then(response => response.data);
};
const fetchFilmCast = id => {
  return axios
    .get(`movie/${id}/credits?api_key=${KEY}`)
    .then(response => response.data)
    .then(data => data.cast);
};

const fetchIdForYoutube = id => {
  return axios
    .get(`movie/${id}/videos?api_key=${KEY}`)
    .then(response => response.data)
    .then(data => data.results);
};
const fetchUpcomingMovies = () => {
  return axios.get(`movie/upcoming?api_key=${KEY}`);
};
export default {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchFilmDetail,
  fetchFilmCast,
  fetchIdForYoutube,
  fetchUpcomingMovies,
};
