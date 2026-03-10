import Layout from './components/Layout';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';

function App() {
  return (
    <Layout>
      <Hero />
      <Projects />
      <div className="grid grid-cols-1 w-full border-b border-deep-black">
        <About />
        <Experience />
      </div>
    </Layout>
  );
}

export default App;