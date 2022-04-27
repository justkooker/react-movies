import React, { Component, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from 'views/routes';
import styles from './SearchForm.module.css';
export default function SearchForm({ handleChangeQuery, onFormSubmit }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
 const {pathname} = useLocation()
  const handleSubmit = e => {
    e.preventDefault();
    handleChangeQuery(query);
    onFormSubmit();
    resetQuery();
  };
  const resetQuery = () => {
    setQuery('');
   
  };
  const onChangeQuery = e => {
    setQuery(e.target.value);
  };
  const navigateToFilm = ()=> {
    navigate(routes.film);
    if(pathname!==routes.film){
      navigate(routes.film);
    }
    
   
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input onFocus={navigateToFilm} onChange={onChangeQuery} type="text" value={query}></input>
      <button type="submit">Search</button>
    </form>
  );
}
