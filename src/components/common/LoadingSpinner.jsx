import styles from '../../styles/components/LoadingSpinner.module.scss';

export const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className={styles.fullScreen} role="status" aria-live="polite">
        <div className={`${styles.spinner} ${styles[size]}`} />
        <p className={styles.loadingText}>Carregando...</p>
      </div>
    );
  }

  return (
    <div className={styles.inline} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
};
