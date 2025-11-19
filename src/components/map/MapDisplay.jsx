import { useEffect, useRef } from 'react';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import styles from './MapDisplay.module.scss';

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });

  export const MapDisplay = ({ concerts }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);

    useEffect(() => {
      if (!mapContainer.current) return;

      const avgLat = concerts.reduce((sum, c) => sum + c.latitude, 0) / concerts.length;
      const avgLng = concerts.reduce((sum, c) => sum + c.longitude, 0) / concerts.length;

      map.current = L.map(mapContainer.current).setView([avgLat, avgLng], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        accessibility: true,
      }).addTo(map.current);

      concerts.forEach((concert) => {
        const marker = L.marker([concert.latitude, concert.longitude])
          .bindPopup(
            `<div class="${styles.popup}">
              <strong>${concert.artist}</strong><br/>
              ${concert.city}<br/>
              <small>${new Date(concert.date).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}</small>
            </div>`
          )
          .addTo(map.current);

        markers.current.push(marker);
      });

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    }, [concerts]);

    return (
      <div className={styles.mapContainer} role="region" aria-label="Concert map">
        <div
          ref={mapContainer}
          className={styles.mapElement}
          aria-label="Interactive map showing concert locations"
        />
        <div className={styles.mapInfo}>
          <p>Click on markers to see concert details</p>
        </div>
      </div>
    );
  };
