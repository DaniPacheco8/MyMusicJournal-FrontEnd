import { Plus } from 'lucide-react';
  import styles from '../../styles/components/ConcertsHeader.module.scss';

  export const ConcertsHeader = ({ concertCount, onAddClick }) => {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h2>My Concerts</h2>
            <p>{concertCount} musical experiences recorded</p>
          </div>
          <button
            onClick={onAddClick}
            className={styles.addButton}
            aria-label="Add a new concert"
          >
            <Plus size={20} />
            Add Concert
          </button>
        </div>
      </div>
    );
  };