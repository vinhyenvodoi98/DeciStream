import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
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
import { createReactClient, studioProvider, LivepeerConfig , ThemeConfig} from '@livepeer/react';

const { chains, provider } = configureChains(
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

const wagmiConfig = createClient({
  autoConnect: true,
  connectors,
  provider
});

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY || '',
  }),
});

const theme: ThemeConfig = {
  colors: {
    accent: 'rgb(0, 145, 255)',
    containerBorderColor: 'rgba(0, 145, 255, 0.9)',
  },
  fonts: {
    display: 'Inter',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <div className='min-h-screen'>
      <WagmiConfig client={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <QueryClientProvider client={reactQueryClient}>
            <LivepeerConfig client={livepeerClient} theme={theme}>
              <Component {...pageProps} />
            </LivepeerConfig>
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
