import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';
import Comments from '@/components/Comments';

export default function Streams() {
  const { address } = useAccount();

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3 h-[600px] rounded-xl shadow'>
          video
        </div>
        <div className='h-[600px] rounded-xl shadow'>
          <Comments />
        </div>
      </div>
    </Layout>
  );
}
