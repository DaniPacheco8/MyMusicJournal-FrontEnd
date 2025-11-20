import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/components/SecondaryNav.module.scss';

export const SecondaryNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.secondaryNav}>
      <div className={styles.container}>
        <div className={styles.navTabs}>
          <button
            onClick={() => navigate('/dashboard')}
            className={`${styles.navTab} ${
              isActive('/dashboard') ? styles.active : ''
            }`}
          >
            My Concerts
          </button>
          <button
            onClick={() => navigate('/map')}
            className={`${styles.navTab} ${isActive('/map') ? styles.active : ''}`}
          >
            Map
          </button>
        </div>
      </div>
    </nav>
  );
};
