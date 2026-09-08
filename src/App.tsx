import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import HireMe from './components/HireMe';

const AtprotoIdentity = lazy(() => import('./components/atproto/AtprotoIdentity'));
const NowSection = lazy(() => import('./components/atproto/NowSection'));
const ActivityFeed = lazy(() => import('./components/atproto/ActivityFeed'));
const CommunityGarden = lazy(() => import('./components/atproto/CommunityGarden'));
const GardenNotes = lazy(() => import('./components/atproto/GardenNotes'));

function AtprotoFallback() {
  return (
    <div className="w-full px-6 md:px-12 py-16 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="h-24 rounded-2xl animate-pulse bg-secondary-bg/40" />
      </div>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Hero />
      <div className="grid grid-cols-1 w-full">
        <About />
        <Experience />
      </div>
      <Projects />
      <Suspense fallback={<AtprotoFallback />}>
        <AtprotoIdentity />
        <NowSection />
        <ActivityFeed />
        <CommunityGarden />
        <GardenNotes />
      </Suspense>
      <HireMe />
    </Layout>
  );
}

export default App;
