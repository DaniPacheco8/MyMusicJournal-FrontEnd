import styles from '../../styles/components/HowItWorksSection.module.scss';

  const steps = [
    {
      number: '1',
      title: 'Create Your Account',
      description: 'Quick and easy registration. Just email and password.',
    },
    {
      number: '2',
      title: 'Add Concerts',
      description: 'Document artists, dates, locations and your personal impressions.',
    },
    {
      number: '3',
      title: 'Relive Moments',
      description: 'Explore statistics, maps and your entire music history.',
    },
  ];

  export const HowItWorksSection = () => {
    return (
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>HOW IT WORKS</div>
            <h2>Get Started in 3 Simple Steps</h2>
            <p>In minutes you will be documenting your first concert</p>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div key={index} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
