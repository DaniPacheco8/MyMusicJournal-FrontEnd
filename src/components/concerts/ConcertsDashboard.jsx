import { useState, useEffect } from 'react';
  import { getJournalEntries, deleteJournalEntry } from '../../api/journalService';
  import { Navbar } from '../layout/Navbar';
  import { SecondaryNav } from '../layout/SecondaryNav';
  import { ConcertsHeader } from './ConcertsHeader';
  import { ConcertsFilter } from './ConcertsFilter';
  import { ConcertCard } from './ConcertCard';
  import { LoadingSpinner } from '../common/LoadingSpinner';
  import { useToast } from '../../hooks/useToast';
  import styles from '../../styles/components/ConcertsDashboard.module.scss';

  export const ConcertsDashboard = ({ onAddConcert, onEditConcert }) => {
    const [concerts, setConcerts] = useState([]);
    const [filteredConcerts, setFilteredConcerts] = useState([]);
    const [filterYear, setFilterYear] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [availableYears, setAvailableYears] = useState([]);
    const { success, error: showError } = useToast();

    useEffect(() => {
      const fetchConcerts = async () => {
        try {
          setIsLoading(true);
          const data = await getJournalEntries();
          setConcerts(data);
        } catch (err) {
          showError('Failed to load your concert diary. Please try again.');
          console.error('Error fetching journal entries:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchConcerts();

      // Listen for concert updates
      const handleConcertUpdate = () => {
        fetchConcerts();
      };

      window.addEventListener('concert-updated', handleConcertUpdate);
      return () => window.removeEventListener('concert-updated', handleConcertUpdate);
    }, [showError]);

    useEffect(() => {
      let filtered = concerts;

      if (filterYear) {
        filtered = filtered.filter(
          (concert) => concert.date && new Date(concert.date).getFullYear().toString() === filterYear
        );
      }

      if (filterCity) {
        filtered = filtered.filter((concert) =>
          concert.city && concert.city.toLowerCase().includes(filterCity.toLowerCase())
        );
      }

      setFilteredConcerts(filtered);
    }, [concerts, filterYear, filterCity]);

    useEffect(() => {
      const years = new Set();
      concerts.forEach((concert) => {
        if (concert.date) {
          const year = new Date(concert.date).getFullYear();
          years.add(year);
        }
      });
      setAvailableYears(Array.from(years));
    }, [concerts]);

    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this concert?')) {
        return;
      }

      try {
        await deleteJournalEntry(id);
        setConcerts((prevConcerts) =>
          prevConcerts.filter((concert) => concert.id !== id)
        );
        success('Concert deleted successfully');
      } catch (err) {
        showError('Failed to delete concert. Please try again.');
        console.error('Error deleting concert:', err);
      }
    };

    const refreshJournalEntries = async () => {
      try {
        setIsLoading(true);
        const data = await getJournalEntries();
        setConcerts(data);
        success('Concerts refreshed successfully');
      } catch (err) {
        showError('Failed to refresh entries. Please try again.');
        console.error('Error refreshing entries:', err);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        <Navbar />
        <SecondaryNav />
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
          availableYears={availableYears}
        />

        {isLoading ? (
          <LoadingSpinner />
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
      </>
    );
  };