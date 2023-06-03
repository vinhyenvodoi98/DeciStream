import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';

import Text from '@/components/Text';
import Categories from '@/components/Categories';
import CurrentSteams from '@/components/CurrentSteams';

export default function Dao() {
  const { address } = useAccount();

  return (
    <Layout>
      <Text content={address as string}/>
      <Text content='Dao'/>
    </Layout>
  );
}

