import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import filmsApiServices from '../../services/api-services';
export const searchMovies = createAsyncThunk(
  'searchMovies',
  async function (query, { rejectWithValue, dispatch }) {
    try {
      const response = await filmsApiServices.fetchSearchMovies(query);
      if (response.status === 200) {
        const { data } = response;
        dispatch(resetSearchParams());
        dispatch(setUpcomingMoviesStatus(false));
        dispatch(addFilmsWithFormSubmit({ data, query }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUpcomingMovies = createAsyncThunk(
  'fetchUpcomingMovies',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await filmsApiServices.fetchUpcomingMovies();
      if (response.status === 200) {
        const { results } = response.data;
        dispatch(setUpcomingMoviesStatus(true));
        dispatch(addUpcomigFilmsToState(results));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchFilmsWithInfiniteScroll = createAsyncThunk(
  'fetchFilmsWithInfiniteScroll',
  async function (
    { searchQuery, films, totalCountFilm, page },
    { rejectWithValue, dispatch }
  ) {
    try {
      if (searchQuery && films.length < totalCountFilm) {
        const response = await filmsApiServices.fetchSearchMovies(
          searchQuery,
          page
        );
        if (response.status === 200) {
          dispatch(addFilmsWithInfiniteScroll(response.data));
        }
        dispatch(fetchingScrollOff());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchTrendFilms = createAsyncThunk(
  'fetchTrendFilms',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await filmsApiServices.fetchPopularMovies();
      const { results } = response.data;
      if (response.status === 200) {
        dispatch(addTrendFilmList(results));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    searchQuery: '',
    trendFilmList: [],
    upcomingFilmsStatus: null,
    page: 1,
    totalCountFilm: 0,
    fetchingScroll: false,
    mobileView: null,
    desktopView: null,
    mediumScreenView: null,
  },
  reducers: {
    fetchingScrollOn(state) {
      state.fetchingScroll = true;
    },
    fetchingScrollOff(state) {
      state.fetchingScroll = false;
    },
    addFilmsWithFormSubmit(state, { payload }) {
      state.searchQuery = payload.query;
      state.films = payload.data.results;
      state.page = state.page + 1;
      state.totalCountFilm = payload.data.total_results;
    },
    addFilmsWithInfiniteScroll(state, { payload }) {
      state.films = [...state.films, ...payload.results];
      state.page = state.page + 1;
    },
    addTrendFilmList(state, { payload }) {
      state.trendFilmList = payload;
    },
    resetSearchParams(state) {
      state.page = 1;
      state.films = [];
      state.searchQuery = '';
      state.totalCountFilm = 0;
    },
    setMobileView(state, { payload }) {
      state.mobileView = payload;
    },
    setDesktopView(state, { payload }) {
      state.desktopView = payload;
    },
    addUpcomigFilmsToState(state, { payload }) {
      state.films = payload;
    },
    setUpcomingMoviesStatus(state, { payload }) {
      state.upcomingFilmsStatus = payload;
    },
    setMediumScreenView(state, { payload }) {
      state.mediumScreenView = payload;
    },
  },
});
export const {
  fetchingScrollOn,
  addFilmsWithFormSubmit,
  addFilmsWithInfiniteScroll,
  addTrendFilmList,
  resetSearchParams,
  fetchingScrollOff,
  setMobileView,
  setDesktopView,
  addUpcomigFilmsToState,
  setUpcomingMoviesStatus,
  setMediumScreenView
} = filmsSlice.actions;
export default filmsSlice.reducer;
