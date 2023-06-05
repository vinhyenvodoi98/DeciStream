import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  foundry,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@rainbow-me/rainbowkit/styles.css';

import { useIsSsr } from '../utils/ssr';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
    polygonMumbai,
    foundry,
    // ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <div className='min-h-screen'>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <QueryClientProvider client={reactQueryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
