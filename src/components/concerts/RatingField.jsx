import { Star } from 'lucide-react';
import styles from '../../styles/components/RatingField.module.scss';

export const RatingField = ({ value, onChange, error }) => {
  return (
    <div className={styles.ratingField}>
      <label htmlFor="rating-group" className={styles.label}>
        Rating
        <span className={styles.required}>*</span>
      </label>
      <div
        id="rating-group"
        className={styles.starsContainer}
        role="group"
        aria-label="Concert rating (1 to 5 stars)"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={styles.starButton}
            aria-label={`Rate ${star} stars`}
            aria-pressed={value === star}
          >
            <Star
              size={32}
              className={star <= value ? styles.starFilled : styles.starEmpty}
            />
          </button>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
