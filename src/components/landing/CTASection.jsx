import styles from '../../styles/components/CTASection.module.scss';

export const CTASection = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2>Start Writing Your Music Story</h2>
        <p>
          Join thousands of music lovers who are already documenting their
          musical experiences
        </p>
        <a href="/register" className={styles.ctaBtn}>
          Create My Account
        </a>
      </div>
    </section>
  );
};
