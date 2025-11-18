import { ArrowRight } from 'lucide-react';
  import styles from './HeroSection.module.scss';

  export const HeroSection = () => {
    return (
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>✨ Your Personal Concert Diary</span>
          </div>

          <h1 className={styles.heroTitle}>
            Save Every <span className={styles.gradientText}>Musical</span> Moment
          </h1>

          <p className={styles.heroDescription}>
            Record your concerts, festivals, and musical experiences. Relive every moment and discover
  your personal music story.
          </p>

          <a href="/register" className={styles.heroBtn}>
            Create My Account
            <ArrowRight size={20} />
          </a>
        </div>
      </section>
    );
  };