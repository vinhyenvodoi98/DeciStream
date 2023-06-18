import * as React from 'react';

import Layout from '@/components/layout/Layout';

import CurrentSteams from '@/components/CurrentSteams';
import Streamers from '@/components/Streamers';

export default function HomePage() {
  return (
    <Layout>
      <div className='grid grid-cols-6 gap-4lex'>
        <div>
          <Streamers />
        </div>
        <div className='col-span-5'>
          {/* <PodCastDaos /> */}
          <CurrentSteams />
        </div>
      </div>
    </Layout>
  );
}
