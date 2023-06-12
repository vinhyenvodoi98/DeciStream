import * as React from 'react';
import { useAccount } from 'wagmi';
import Wallet from '../Wallet';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const { address } = useAccount()

  return(
    <div className='px-8 min-h-screen'>
      <Header />
      {address
      ? children
      : <section>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1 className='mt-8 text-4xl md:text-6xl'>Start from Login</h1>
            <Wallet />
          </div>
        </section>
      }
    </div>
  );
}
