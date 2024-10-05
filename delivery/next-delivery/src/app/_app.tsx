import { AppProps } from 'next/app';
// _app.tsx or page.tsx
import '../styles/index.css';  // Assuming this is the file where you added Tailwind CSS

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
