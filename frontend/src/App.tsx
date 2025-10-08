import { Header } from './components/Header';
import { DestinationCard } from './components/DestinationCard';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { InstallPWA } from './components/InstallPWA';
import { DestinationHistory } from './components/DestinationHistory';
import { FavoritesList } from './components/FavoritesList';
import { DarkModeToggle } from './components/DarkModeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { useDestination } from './hooks/useDestination';
import './styles/App.css';

function App() {
  const { destination, loading, error, showFallback, updateDestination } = useDestination();

  return (
    <div className="app">
      <DarkModeToggle />
      <LanguageToggle />
      <InstallPWA />
      <FavoritesList onSelectDestination={updateDestination} />
      <DestinationHistory onSelectDestination={updateDestination} />
      <Header />
      
      
          <main className="main-content">
            <div className="content-wrapper">
              {loading && <Loading />}
              {error && <Error message={error} />}
              {destination && (
                <>
                  {showFallback && (
                    <div className="fallback-notice">
                      <p>📡 Carregando dados atualizados...</p>
                    </div>
                  )}
                  <DestinationCard destination={destination} />
                </>
              )}
            </div>
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
