import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../common/Logo';
import styles from '../../styles/components/Navbar.module.scss';

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isLandingPage = location.pathname === '/';

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navLogo}>
          <Logo size={40} />
          <span>MyMusicJournal</span>
        </div>

        {isLandingPage && !isAuthenticated && (
          <div className={styles.navLinks}>
            <button
              onClick={() => handleNavClick('features')}
              className={styles.navLink}
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={styles.navLink}
            >
              How It Works
            </button>
          </div>
        )}

        <div className={styles.navButtons}>
          {!isAuthenticated ? (
            <>
              <a href="/login" className={`${styles.btn} ${styles.btnOutline}`}>
                Sign In
              </a>
              <a href="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                Register
              </a>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className={`${styles.btn} ${styles.btnOutline}`}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
