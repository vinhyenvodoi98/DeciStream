import Comments from "@/components/Comments";
import CreateRoom from "@/components/CreateRoom";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Live() {
  const router =  useRouter()
  const [roomOwner, setRoomOwner] = useState<boolean>(false)

  useEffect(() => {
    if(router.query.roomId || !router.query.joinUrl) setRoomOwner(true)
  }, [router.query.roomId])

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
          { roomOwner &&
            <div className="rounded-xl shadow">
              <CreateRoom/>
            </div>
          }
          <div className={`rounded-xl shadow ${roomOwner ? 'row-span-2' : 'row-span-3'}`}>
            <Comments />
          </div>
        </div>
      </div>
    </Layout>
  )
}
