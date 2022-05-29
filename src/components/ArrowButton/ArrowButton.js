import styles from './ArrowButton.module.css';
export default function ArrowButton({func, from }) {
  return (
    <button onClick={func} type="button" className={styles.button}></button>
  );
}
