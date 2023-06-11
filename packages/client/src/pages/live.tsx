import Comments from "@/components/Comments";
import CreateRoom from "@/components/CreateRoom";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Player, useCreateStream } from "@livepeer/react";
// import { useMemo, useState } from "react";

export default function Live() {
  const router =  useRouter()

  // useEffect(() => {
  //   // Request display capture permission
  //   navigator.mediaDevices.getDisplayMedia({ video: true })
  //     .then(function(stream) {
  //       // Display capture permission granted
  //       console.log('Permission granted');
  //       // Do something with the stream
  //     })
  //     .catch(function(error) {
  //       // Display capture permission denied or error occurred
  //       console.error('Permission denied or error:', error);
  //     });
  // }, []);

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4 h-[700px]'>
        <div className='col-span-3 h-full rounded-xl shadow'>
          { router.query.joinUrl
            ? <iframe
              className='w-full h-full'
              src={`${router.query.joinUrl as string}&token=${router.query.token as string}`}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              allow="camera; microphone"
              />
            : <div className="w-full h-full flex justify-center items-center bg-gray-400">
                <div className='text-gray-600 flex justify-center items-center text-2xl font-bold h-56 w-56 rounded-full bg-gray-500'>
                  Let's Start!
                </div>
              </div>
          }
        </div>
        <div className="h-full grid grid-rows-3 grid-flow-col gap-4">
          <div className="rounded-xl shadow">
            <CreateRoom/>
          </div>
          <div className='rounded-xl shadow row-span-2'>
            <Comments />
          </div>
        </div>
      </div>
    </Layout>
  )
  // const [streamName, setStreamName] = useState<string>('');
  // const {
  //   mutate: createStream,
  //   data: stream,
  //   status,
  // } = useCreateStream(streamName ? { name: streamName } : null);

  // const isLoading = useMemo(() => status === 'loading', [status]);

  // return (
  //   <Layout>
  //     <div>
  //       <input
  //         type="text"
  //         placeholder="Stream name"
  //         onChange={(e) => setStreamName(e.target.value)}
  //       />
  //       {/* {console.log({stream})} */}
  //       {stream?.playbackId && (
  //         <Player
  //           title={stream?.name}
  //           playbackId={stream?.playbackId}
  //           autoPlay
  //           muted
  //         />
  //       )}

  //       <div>
  //         {!stream && (
  //           <button
  //             onClick={() => {
  //               createStream?.();
  //             }}
  //             disabled={isLoading || !createStream}
  //           >
  //             Create Stream
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </Layout>
  // );
}
