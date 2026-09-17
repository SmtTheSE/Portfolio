import { lazy, Suspense, useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import HireMe from './components/HireMe';
import ProfileGate from './components/ProfileGate';

const MOBILE_GATE_KEY = 'smt-portfolio-entered';

const isMobileViewport = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

const hasAlreadyEntered = () => {
    if (typeof window === 'undefined') return true;
    if (!isMobileViewport()) return true;
    try {
        return sessionStorage.getItem(MOBILE_GATE_KEY) === '1';
    } catch {
        return false;
    }
};

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
  const [entered, setEntered] = useState(hasAlreadyEntered);

  if (!entered) {
    return (
      <ProfileGate
        onEnter={() => {
          try {
            sessionStorage.setItem(MOBILE_GATE_KEY, '1');
          } catch {
            // storage unavailable — still let the visitor through
          }
          setEntered(true);
        }}
      />
    );
  }

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
