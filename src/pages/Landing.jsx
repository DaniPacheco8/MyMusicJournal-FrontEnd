import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/layout/Footer';
import styles from '../styles/components/Landing.module.scss';

export const Landing = () => {
  return (
    <div className={styles.landing}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};
