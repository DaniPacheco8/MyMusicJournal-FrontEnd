import { Calendar, Star, MapPin } from 'lucide-react';
import styles from '../../styles/components/FeaturesSection.module.scss';

const features = [
  {
    icon: Calendar,
    title: 'Record Every Show',
    description:
      'Save artist, date, location, photos and all your personal notes in one place.',
    gradient: 'gradient-purple',
  },
  {
    icon: Star,
    title: 'Rate Experiences',
    description:
      'Rate each concert and write your impressions to never forget any detail.',
    gradient: 'gradient-pink',
  },
  {
    icon: MapPin,
    title: 'Visualize Your Route',
    description:
      'Interactive map with all the places where you have experienced live music.',
    gradient: 'gradient-indigo',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>FEATURES</div>
          <h2>Everything You Need</h2>
          <p>
            Features designed to document every detail of your musical
            experiences
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={styles.featureCard}>
                <div
                  className={`${styles.featureIcon} ${styles[feature.gradient]}`}
                >
                  <Icon size={28} color="white" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
