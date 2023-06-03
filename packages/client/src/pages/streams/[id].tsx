import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';

import Text from '@/components/Text';
import Categories from '@/components/Categories';
import CurrentSteams from '@/components/CurrentSteams';

export default function Streams() {
  const { address } = useAccount();

  return (
    <Layout>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 bg-slate-50 h-[500px] rounded-xl'>
          video
        </div>
        <div className='bg-neutral-400 h-[500px] rounded-xl'>
          comment
        </div>
      </div>
    </Layout>
  );
}
