import { Header } from './components/Header';
import { DestinationCard } from './components/DestinationCard';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { InstallPWA } from './components/InstallPWA';
import { DestinationHistory } from './components/DestinationHistory';
import { FavoritesList } from './components/FavoritesList';
import { DarkModeToggle } from './components/DarkModeToggle';
import { RandomDestination } from './components/RandomDestination';
import { LanguageToggle } from './components/LanguageToggle';
import { AdBanner } from './components/AdSense';
import { useDestination } from './hooks/useDestination';
import './styles/App.css';
import './styles/AdSense.css';

function App() {
  const { destination, loading, error, updateDestination } = useDestination();

  return (
    <div className="app">
      <DarkModeToggle />
      <LanguageToggle />
      <InstallPWA />
      <RandomDestination onRandomSelect={updateDestination} />
      <FavoritesList onSelectDestination={updateDestination} />
      <DestinationHistory onSelectDestination={updateDestination} />
      <Header />
      
      {/* Anúncio de teste para validação do AdSense */}
      <div style={{ textAlign: 'center', margin: '1rem 0', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-1841551118944574"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      
          <main className="main-content">
            <div className="content-wrapper">
              {loading && <Loading />}
              {error && <Error message={error} />}
              {destination && (
                <>
                  <AdBanner className="ad-banner-top" />
                  <DestinationCard destination={destination} />
                  <AdBanner className="ad-banner-bottom" />
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
