import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';
import Comments from '@/components/Comments';

export default function Streams() {
  const { address } = useAccount();

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3 bg-slate-50 h-[600px] rounded-xl'>
          video
        </div>
        <div className='bg-neutral-400 h-[600px] rounded-xl'>
          <Comments />
        </div>
      </div>
    </Layout>
  );
}
