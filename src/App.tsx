import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';

const AtprotoIdentity = lazy(() => import('./components/atproto/AtprotoIdentity'));
const NowSection = lazy(() => import('./components/atproto/NowSection'));
const ActivityFeed = lazy(() => import('./components/atproto/ActivityFeed'));
const AtprotoNetwork = lazy(() => import('./components/atproto/AtprotoNetwork'));
const CommunityGarden = lazy(() => import('./components/atproto/CommunityGarden'));
const GardenNotes = lazy(() => import('./components/atproto/GardenNotes'));
const AtmosphereDigest = lazy(() => import('./components/atproto/AtmosphereDigest'));

function AtprotoFallback() {
  return (
    <div className="w-full border-t border-border-light px-6 md:px-12 py-16 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="h-24 border border-border-light animate-pulse bg-secondary-bg/40" />
      </div>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<AtprotoFallback />}>
        <AtprotoIdentity />
      </Suspense>
      <Projects />
      <div className="grid grid-cols-1 w-full border-b border-deep-black">
        <About />
        <Experience />
      </div>
      <Suspense fallback={<AtprotoFallback />}>
        <NowSection />
        <ActivityFeed />
        <CommunityGarden />
        <GardenNotes />
        <AtmosphereDigest />
        <AtprotoNetwork />
      </Suspense>
    </Layout>
  );
}

export default App;
