import { Logo } from '../common/Logo';
  import styles from './Navbar.module.scss';

  export const Navbar = () => {
    const handleNavClick = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navLogo}>
            <Logo size={40} />
            <span>MyMusicJournal</span>
          </div>

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

          <div className={styles.navButtons}>
            <a href="/login" className={`${styles.btn} ${styles.btnOutline}`}>
              Sign In
            </a>
            <a href="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    );
  };
