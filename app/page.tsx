import { Nav } from '@/components/nav';
import {
  About,
  AchievementsAndActivities,
  BackToTop,
  Beyond,
  CaseStudies,
  Certifications,
  Contact,
  Currently,
  DreamWishJar,
  Hero,
  Projects,
  Resume,
  Skills,
} from '@/components/sections';
import { RevealInit } from '@/hooks/use-reveal';

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <CaseStudies />
        <Skills />
        <Certifications />
        <Currently />
        <Resume />
        <AchievementsAndActivities />
        <DreamWishJar />
        <Beyond />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
