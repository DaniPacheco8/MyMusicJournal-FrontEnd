
  import { useEffect, useState } from 'react';
  import { MapPin } from 'lucide-react';
  import { getConcertsForMap } from '../api/concertService';
  import { Navbar } from '../components/layout/Navbar';
  import { SecondaryNav } from '../components/layout/SecondaryNav';
  import { MapDisplay } from '../components/map/MapDisplay';
  import styles from '../styles/components/Map.module.scss';

  export const Map = () => {
    const [concerts, setConcerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchConcerts = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await getConcertsForMap();
          setConcerts(data);
        } catch (err) {
          setError('Failed to load concerts map. Please try again.');
          console.error('Error fetching concerts for map:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchConcerts();
    }, []);

    return (
      <>
        <Navbar />
        <SecondaryNav />
        <div className={styles.mapPage}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <MapPin size={28} />
              My Concert Map
            </h1>
          </div>

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className={styles.loading} role="status" aria-live="polite">
            <p>Loading map...</p>
          </div>
        ) : concerts.length === 0 ? (
          <div className={styles.empty}>
            <p>No concerts recorded yet. Add some concerts to your diary to see them on the map!</p>
          </div>
        ) : (
          <MapDisplay concerts={concerts} />
        )}
        </div>
      </>
    );
  };
