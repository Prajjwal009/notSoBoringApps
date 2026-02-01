import Header from './components/Header';
import Footer from './components/Footer';
import AppGrid from './components/AppGrid';
import Newsletter from './components/Newsletter';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <section id="apps-section">
          <h2>Apps</h2>
          <p className="section-subtitle">Delightful utilities that make your Mac a little less boring</p>
          <AppGrid />
        </section>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
