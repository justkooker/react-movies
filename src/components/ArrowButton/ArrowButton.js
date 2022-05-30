import styles from './ArrowButton.module.css';
export default function ArrowButton({func, ariaLabel }) {
  return (
    <button onClick={func} type="button" aria-label={ariaLabel} className={styles.button}></button>
  );
}
