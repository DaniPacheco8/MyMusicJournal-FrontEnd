import { useState, useEffect } from 'react';
  import { X, ChevronDown } from 'lucide-react';
  import { createJournalEntry, updateJournalEntry } from '../../api/journalService';
  import { getConcerts } from '../../api/concertService';
  import {
    isValidNotes,
    isValidRating,
  } from '../../utils/validators';
  import { FormField } from './FormField';
  import { RatingField } from './RatingField';
  import styles from '../../styles/components/ConcertFormModal.module.scss';

  export const ConcertFormModal = ({ isOpen, entry, onClose, onSuccess }) => {
    const [allConcerts, setAllConcerts] = useState([]);
    const [filteredConcerts, setFilteredConcerts] = useState([]);
    const [selectedConcert, setSelectedConcert] = useState(null);

    const [filterYear, setFilterYear] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [filterArtist, setFilterArtist] = useState('');

    const [formData, setFormData] = useState({
      personalNotes: '',
      rating: 0,
      backgroundImage: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchConcerts = async () => {
        try {
          const concerts = await getConcerts();
          setAllConcerts(concerts);
        } catch (error) {
          console.error('Error fetching concerts:', error);
        }
      };

      if (isOpen) {
        fetchConcerts();
      }
    }, [isOpen]);

    useEffect(() => {
      let filtered = allConcerts;

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

      if (filterArtist) {
        filtered = filtered.filter((concert) =>
          concert.artist.toLowerCase().includes(filterArtist.toLowerCase())
        );
      }

      setFilteredConcerts(filtered);
    }, [allConcerts, filterYear, filterCity, filterArtist]);

    useEffect(() => {
      if (entry) {
        setSelectedConcert({
          id: entry.concertId,
          artist: entry.artist,
          date: entry.date,
          venue: entry.venue,
          city: entry.city,
          genre: entry.genre,
        });
        setFormData({
          personalNotes: entry.personalNotes || '',
          rating: entry.rating || 0,
          backgroundImage: entry.backgroundImage || '',
        });
      } else {
        setSelectedConcert(null);
        setFormData({
          personalNotes: '',
          rating: 0,
          backgroundImage: '',
        });
      }
      setErrors({});
      setFilterYear('');
      setFilterCity('');
      setFilterArtist('');
    }, [entry, isOpen]);

    const validateForm = () => {
      const newErrors = {};

      if (!selectedConcert) {
        newErrors.concert = 'Please select a concert';
      }

      if (!formData.personalNotes || !isValidNotes(formData.personalNotes)) {
        newErrors.personalNotes = 'Notes must be between 10 and 5000 characters';
      }

      if (!formData.rating || !isValidRating(formData.rating)) {
        newErrors.rating = 'Rating must be between 1 and 5';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      try {
        const entryData = {
          concertId: selectedConcert.id,
          personalNotes: formData.personalNotes,
          rating: formData.rating,
          backgroundImage: formData.backgroundImage || null,
        };

        if (entry) {
          await updateJournalEntry(entry.id, entryData);
        } else {
          await createJournalEntry(entryData);
        }

        onSuccess();
        onClose();
      } catch (error) {
        setErrors({
          submit: error.message || 'Failed to save concert. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getAvailableYears = () => {
      const years = new Set(
        allConcerts.map((c) => new Date(c.date).getFullYear().toString())
      );
      return Array.from(years).sort().reverse();
    };


    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    return (
      <div
        className={styles.modalOverlay}
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        role="presentation"
      >
        <div
          className={styles.modalContent}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className={styles.modalHeader}>
            <h2 id="modal-title" className={styles.title}>
              {entry ? 'Edit Concert Entry' : 'Add Concert to Your Diary'}
            </h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Concert Selection Section */}
            <div className={styles.concertSection}>
              <h3 className={styles.sectionTitle}>Select Concert</h3>

              {/* Filters */}
              <div className={styles.filtersGrid}>
                <FormField
                  id="filter-year"
                  label="Year"
                  type="select"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  aria-label="Filter concerts by year"
                >
                  <option value="">All Years</option>
                  {getAvailableYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </FormField>

                <FormField
                  id="filter-city"
                  label="City"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  placeholder="Search city..."
                  aria-label="Filter concerts by city"
                />

                <FormField
                  id="filter-artist"
                  label="Artist"
                  value={filterArtist}
                  onChange={(e) => setFilterArtist(e.target.value)}
                  placeholder="Search artist..."
                  aria-label="Filter concerts by artist"
                />
              </div>

              {errors.concert && (
                <span className={styles.errorMessage}>{errors.concert}</span>
              )}

              <div className={styles.concertList}>
                {filteredConcerts.length === 0 ? (
                  <p className={styles.noConcerts}>
                    No concerts found with the selected filters
                  </p>
                ) : (
                  filteredConcerts.map((concert) => (
                    <button
                      key={concert.id}
                      type="button"
                      onClick={() => setSelectedConcert(concert)}
                      className={`${styles.concertOption} ${
                        selectedConcert?.id === concert.id ? styles.selected : ''
                      }`}
                      aria-pressed={selectedConcert?.id === concert.id}
                    >
                      <div className={styles.concertInfo}>
                        <span className={styles.artist}>{concert.artist}</span>
                        <span className={styles.details}>
                          {concert.venue}, {concert.city} •{' '}
                          {new Date(concert.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                        {concert.genre && (
                          <span className={styles.genre}>{concert.genre}</span>
                        )}
                      </div>
                      {selectedConcert?.id === concert.id && (
                        <ChevronDown size={20} className={styles.checkmark} />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {selectedConcert && (
              <div className={styles.journalSection}>
                <h3 className={styles.sectionTitle}>Your Experience</h3>

                <div className={styles.selectedConcertInfo}>
                  <p className={styles.selectedArtist}>{selectedConcert.artist}</p>
                  <p className={styles.selectedDetails}>
                    {selectedConcert.venue}, {selectedConcert.city}
                  </p>
                </div>

                <FormField
                  id="personal-notes"
                  label="Your Notes"
                  type="textarea"
                  value={formData.personalNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, personalNotes: e.target.value })
                  }
                  onBlur={() => validateForm()}
                  error={errors.personalNotes}
                  placeholder="Share your thoughts and memories about this concert..."
                  required
                  rows={5}
                  maxLength={5000}
                  aria-label="Personal notes about the concert"
                />

                <RatingField
                  value={formData.rating}
                  onChange={(rating) => setFormData({ ...formData, rating })}
                  error={errors.rating}
                />

                <FormField
                  id="background-image"
                  label="Concert Photo URL (Optional)"
                  type="url"
                  value={formData.backgroundImage}
                  onChange={(e) =>
                    setFormData({ ...formData, backgroundImage: e.target.value })
                  }
                  placeholder="https://example.com/photo.jpg"
                  aria-label="Concert photo URL"
                />
              </div>
            )}

            {errors.submit && (
              <div className={styles.submitError} role="alert">
                {errors.submit}
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || !selectedConcert}
                aria-busy={isLoading}
              >
                {isLoading
                  ? entry
                    ? 'Saving...'
                    : 'Adding...'
                  : entry
                    ? 'Save Changes'
                    : 'Add to Diary'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
