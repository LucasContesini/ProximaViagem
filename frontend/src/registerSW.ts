export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('Nova versão disponível! Recarregue a página.');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('Erro ao registrar Service Worker:', error);
        });
    });
  }
}

// Install prompt for PWA
let deferredPrompt: any;

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    console.log('PWA install prompt ready');
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA foi instalado');
    deferredPrompt = null;
  });
}

export async function promptInstall() {
  if (!deferredPrompt) {
    console.log('Install prompt não disponível');
    return false;
  }

  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response: ${outcome}`);
  
  // Clear the deferred prompt
  deferredPrompt = null;
  
  return outcome === 'accepted';
}
