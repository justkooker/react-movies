import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';
export default function BackButton() {
  const navigate = useNavigate();
  const goBack = function () {
    navigate(-1);
  };
  return (
    <button onClick={goBack} type="button" className={styles.button}></button>
  );
}
