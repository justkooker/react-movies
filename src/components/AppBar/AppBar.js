import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import SearchForm from 'components/SearchForm';

import styles from './AppBar.module.css';
import { useSelector } from 'react-redux';
const setActive = ({ isActive }) =>
  isActive ? `${styles.active}` : `${styles.inactive}`;
export default function AppBar() {
  const mobileView = useSelector(state => state.filmsState.mobileView);
  return (
    <>
      <div className={styles.appBar}>
        {!mobileView && (
          <NavLink to="/" className={styles.logo}>
            film db
          </NavLink>
        )}
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
          <SearchForm />
        </div>
      </div>
    </>
  );
}
