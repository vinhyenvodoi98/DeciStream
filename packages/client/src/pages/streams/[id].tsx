import Layout from '@/components/layout/Layout';
import Comments from '@/components/Comments';
import { Player } from '@livepeer/react';
import { useRouter } from 'next/router';
import { Spinner } from '@/components/Icon';

export default function Streams() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3 h-[600px] rounded-xl shadow flex justify-center'>
          {id ?
            <Player
              playbackId={id as string}
              autoPlay
              muted
              />
              : <Spinner />
          }
        </div>
        <div className='h-[600px] rounded-xl shadow'>
          <Comments />
        </div>
      </div>
    </Layout>
  );
}
