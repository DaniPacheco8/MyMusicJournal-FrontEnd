import { Logo } from '../common/Logo';
import styles from '../../styles/components/Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Logo size={40} />
            <span>MyMusicJournal</span>
          </div>
          <div className={styles.footerDivider}></div>
          <p className={styles.footerCopyright}>
            © {currentYear} MyMusicJournal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
