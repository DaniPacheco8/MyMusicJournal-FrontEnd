import { useState, useEffect } from 'react';
  import { getConcerts } from '../../api/concertService';
  import { deleteJournalEntry } from '../../api/journalService';
  import { ConcertsHeader } from './ConcertsHeader';
  import { ConcertsFilter } from './ConcertsFilter';
  import { ConcertCard } from './ConcertCard';
  import styles from './ConcertsDashboard.module.scss';

  export const ConcertsDashboard = ({ onAddConcert, onEditConcert }) => {
    const [concerts, setConcerts] = useState([]);
    const [filteredConcerts, setFilteredConcerts] = useState([]);
    const [filterYear, setFilterYear] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch concerts on mount
    useEffect(() => {
      const fetchConcerts = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await getConcerts();
          setConcerts(data);
        } catch (err) {
          setError('Failed to load concerts. Please try again.');
          console.error('Error fetching concerts:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchConcerts();
    }, []);

    // Filter concerts whenever filters change
    useEffect(() => {
      let filtered = concerts;

      if (filterYear) {
        filtered = filtered.filter(
          (concert) => new Date(concert.date).getFullYear().toString() === filterYear
        );
      }

      if (filterCity) {
        filtered = filtered.filter((concert) =>
          concert.city.toLowerCase().includes(filterCity.toLowerCase())
        );
      }

      setFilteredConcerts(filtered);
    }, [concerts, filterYear, filterCity]);

    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this concert?')) {
        return;
      }

      try {
        await deleteJournalEntry(id);
        setConcerts((prevConcerts) =>
          prevConcerts.filter((concert) => concert.id !== id)
        );
      } catch (err) {
        setError('Failed to delete concert. Please try again.');
        console.error('Error deleting concert:', err);
      }
    };

    return (
      <div className={styles.dashboard}>
        <ConcertsHeader
          concertCount={filteredConcerts.length}
          onAddClick={onAddConcert}
        />

        <ConcertsFilter
          filterYear={filterYear}
          onYearChange={setFilterYear}
          filterCity={filterCity}
          onCityChange={setFilterCity}
        />

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className={styles.loading} role="status" aria-live="polite">
            Loading concerts...
          </div>
        ) : filteredConcerts.length === 0 ? (
          <div className={styles.emptyState} role="status">
            <p>No concerts found. Start by adding your first concert!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredConcerts.map((concert) => (
              <ConcertCard
                key={concert.id}
                concert={concert}
                onEdit={onEditConcert}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    );
  };