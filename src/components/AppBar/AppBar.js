import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../views/routes';

import SearchForm from 'components/SearchForm';

import styles from './AppBar.module.css';
const setActive = ({ isActive }) =>
  isActive ? `${styles.active}` : `${styles.inactive}`;
export default function AppBar({
  onFormSubmit,
  handleChangeQuery,
  searchQuery,
}) {
  return (
    <>
      <div className={styles.appBar}>
        <NavLink to="/" className={styles.logo}>
          <span>film db</span>
        </NavLink>
        <div className={styles.container}>
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <NavLink to={routes.home} className={setActive}>
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to={routes.film} className={setActive}>
                Video
              </NavLink>
            </li>
          </ul>
          <SearchForm
            onFormSubmit={onFormSubmit}
            handleChangeQuery={handleChangeQuery}
          
            
          />
        </div>
      </div>
    </>
  );
}
