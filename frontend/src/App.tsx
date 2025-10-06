import { Header } from './components/Header';
import { DestinationCard } from './components/DestinationCard';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { AdBanner } from './components/AdBanner';
import { useDestination } from './hooks/useDestination';
import './styles/App.css';

function App() {
  const { destination, loading, error } = useDestination();

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {/* Ad Banner Top */}
        <AdBanner slot="1234567890" format="horizontal" />
        
        <div className="content-wrapper">
          {loading && <Loading />}
          {error && <Error message={error} />}
          {destination && <DestinationCard destination={destination} />}
        </div>
        
        {/* Ad Banner Bottom */}
        {destination && <AdBanner slot="0987654321" format="horizontal" />}
      </main>
      
      <footer className="footer">
        <p>🌍 Próxima Viagem - Inspiração diária para suas aventuras</p>
        <p className="footer-note">Volte amanhã para descobrir um novo destino!</p>
        <div className="footer-links">
          <a href="/privacy.html">Política de Privacidade</a>
          {' | '}
          <a href="/terms.html">Termos de Uso</a>
          {' | '}
          <a href="/about.html">Sobre</a>
          {' | '}
          <a href="/contact.html">Contato</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
