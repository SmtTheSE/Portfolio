import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
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

/**
 * Handles cross-page links like /portfolio#projects. Retries briefly because
 * the lazy-loaded sections may not be in the DOM yet on first paint.
 * In-page anchor clicks are left to the browser.
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

function IntroPage() {
  return (
    <div className="min-h-screen bg-white text-text-main font-sans antialiased">
      <Hero />
    </div>
  );
}

function PortfolioPage() {
  return (
    <Layout>
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
