import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error;
    }
  return response.json();
}
function App({ Component, pageProps }) {
  return (
    <Layout>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}

export default App;
