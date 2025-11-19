import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { getConcertsForMap } from '../api/concertService';
import { Navbar } from '../components/layout/Navbar';
import { SecondaryNav } from '../components/layout/SecondaryNav';
import { MapDisplay } from '../components/map/MapDisplay';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useToast } from '../hooks/useToast';
import styles from '../styles/components/Map.module.scss';

export const Map = () => {
  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error: showError } = useToast();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setIsLoading(true);
        const data = await getConcertsForMap();
        setConcerts(data);
      } catch (err) {
        showError('Failed to load concerts map. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcerts();
  }, [showError]);

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

        {isLoading ? (
          <LoadingSpinner />
        ) : concerts.length === 0 ? (
          <div className={styles.empty}>
            <p>
              No concerts recorded yet. Add some concerts to your diary to see
              them on the map!
            </p>
          </div>
        ) : (
          <MapDisplay concerts={concerts} />
        )}
      </div>
    </>
  );
};
