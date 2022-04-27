import React, { useEffect, useState } from 'react';
import FilmList from 'components/FilmList';

export default function VideoView({ films, storageFilm, loadMore ,toggleFetchingScroll,fetchingScroll}) {
 
  return <FilmList films={films} storageFilm={storageFilm} loadMore={loadMore} fetchingScroll={fetchingScroll} toggleFetchingScroll={toggleFetchingScroll}/>;
}
