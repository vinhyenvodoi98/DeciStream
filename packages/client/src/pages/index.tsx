import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';

import { useReadContract } from '@/hook/useReadContract';
import { useWriteContract } from '@/hook/useWriteContract';
import Text from '@/components/Text';
import TravelDao from '@/components/TravelDao';
import CurrentSteams from '@/components/CurrentSteams';

export default function HomePage() {
  // const { data } = useReadContract('getCount');
  // const { triggerTransactions } = useWriteContract();
  return (
    <Layout>
      <TravelDao />
      <CurrentSteams />
      {/* <div>data: {data}</div>
      <button onClick={() => triggerTransactions('increment')}>Click</button> */}
    </Layout>
  );
}
