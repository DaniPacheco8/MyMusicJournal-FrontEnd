import { Calendar, MapPin, Star, Edit2, Trash2 } from 'lucide-react';
  import styles from './ConcertCard.module.scss';

  export const ConcertCard = ({ concert, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    };

    return (
      <article className={styles.card}>
        <div
          className={styles.cardImage}
          style={{
            backgroundImage: concert.backgroundImage
              ? `url(${concert.backgroundImage})`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
          role="img"
          aria-label={`Concert image for ${concert.concertTitle}`}
        >
          <div className={styles.imageOverlay} />
          <div className={styles.genreBadge}>{concert.genre || 'Music'}</div>
          <div className={styles.cardInfo}>
            <h3 className={styles.artist}>{concert.concertTitle}</h3>
            <div className={styles.dateInfo}>
              <Calendar size={16} aria-hidden="true" />
              <span>{concert.date ? formatDate(concert.date) : 'No date'}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.venue}>
            <MapPin size={16} aria-hidden="true" />
            <span className={styles.venueText}>
              {concert.city || 'No location'}
            </span>
          </div>

          <div className={styles.rating} aria-label={`Rating: ${concert.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < concert.rating ? styles.starFilled : styles.starEmpty}
                aria-hidden="true"
              />
            ))}
          </div>

          <p className={styles.notes}>{concert.personalNotes}</p>

          <div className={styles.actions}>
            <button
              onClick={() => onEdit(concert)}
              className={styles.editButton}
              aria-label={`Edit entry: ${concert.concertTitle}`}
            >
              <Edit2 size={16} />
              Edit
            </button>
            <button
              onClick={() => onDelete(concert.id)}
              className={styles.deleteButton}
              aria-label={`Delete entry: ${concert.concertTitle}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </article>
    );
  };