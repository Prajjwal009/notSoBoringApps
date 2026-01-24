import Header from './components/Header';
import Footer from './components/Footer';
import AppGrid from './components/AppGrid';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <section id="apps-section">
          <h2>Available Apps</h2>
          <AppGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
