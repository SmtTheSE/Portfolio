import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import HeroWindows from './components/HeroWindows';
import Intro from './components/Intro';
import SelectedWork from './components/SelectedWork';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SectionShell } from './components/SectionShell';

const AtprotoIdentity = lazy(() => import('./components/atproto/AtprotoIdentity'));
const NowSection = lazy(() => import('./components/atproto/NowSection'));
const ActivityFeed = lazy(() => import('./components/atproto/ActivityFeed'));
const CommunityGarden = lazy(() => import('./components/atproto/CommunityGarden'));
const GardenNotes = lazy(() => import('./components/atproto/GardenNotes'));

function AtprotoFallback() {
  return (
    <div className="w-full px-5 md:px-7 py-16">
      <div className="h-24 animate-pulse bg-panel/60" />
    </div>
  );
}

/** Old two-page URLs map onto sections of the single page. */
const LEGACY_HASHES: Record<string, string> = {
  '#projects': '#work',
  '#opensource': '#work',
  '#experience': '#about',
  '#hire': '#contact',
  '#now': '#lab',
  '#garden': '#lab',
  '#notes': '#lab',
};

function LegacyRedirect() {
  const { hash } = useLocation();
  return <Navigate to={{ pathname: '/', hash: LEGACY_HASHES[hash] ?? hash }} replace />;
}

/**
 * Handles landing on a URL with a hash (for example from the old /portfolio#projects).
 * Retries briefly because the lazy-loaded Lab sections may not be in the DOM yet.
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const changedPage = lastPath.current !== pathname;
    lastPath.current = pathname;
    if (!changedPage) return;

    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let tries = 0;
    let timer: number;
    const scroll = () => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (tries++ < 20) {
        timer = window.setTimeout(scroll, 100);
      }
    };
    scroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-fg font-sans antialiased">
      <Nav />
      <main>
        <HeroWindows />
        <Intro />
        <SelectedWork />
        <About />
        <div id="lab" className="scroll-mt-16">
          <SectionShell id="lab-intro" title="Lab" subtitle="Experiments">
            <p className="text-[14px] leading-[1.55] text-fg/90 max-w-[52ch]">
              Small experiments with the AT Protocol: a Now page, a feed, a garden of people and sites I
              like, and notes.
            </p>
          </SectionShell>
          <Suspense fallback={<AtprotoFallback />}>
            <AtprotoIdentity />
            <NowSection />
            <ActivityFeed />
            <CommunityGarden />
            <GardenNotes />
          </Suspense>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<LegacyRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
