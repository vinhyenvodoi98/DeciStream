import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import { Spinner } from '@/components/Icon';
import VideoPlayer from '@/components/VideoPlayer';

export default function Streams() {
  const router = useRouter()

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-4 h-[600px] rounded-xl shadow flex justify-center'>
          {router.query.videoUrl ?
            <VideoPlayer src={router.query.videoUrl} />
              : <Spinner />
          }
        </div>
      </div>
    </Layout>
  );
}
