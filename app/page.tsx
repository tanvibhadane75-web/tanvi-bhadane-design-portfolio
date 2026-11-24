import { Nav } from '@/components/nav';
import {
  About,
  AchievementsAndActivities,
  BackToTop,
  Beyond,
  CaseStudies,
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
        <Beyond />
        <DreamWishJar />
        <Currently />
        <Skills />
        <Projects />
        <CaseStudies />
        <Resume />
        <AchievementsAndActivities />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
