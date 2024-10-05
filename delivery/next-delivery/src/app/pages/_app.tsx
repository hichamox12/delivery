import { AppProps } from 'next/app';
import '../styles/globals.css';  // Global CSS
import 'leaflet/dist/leaflet.css';  // Leaflet's CSS

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
