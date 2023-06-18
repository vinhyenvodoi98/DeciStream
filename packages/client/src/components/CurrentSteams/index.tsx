import useLivePeer from "@/hook/useLivePeer"
import { useReadTableLand } from "@/hook/useReadTableLand"
import { shortenAddress } from "@/utils/addresses"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useEnsAvatar, useEnsName } from "wagmi"
import Text from "../Text"

const imageExample = "https://e0.pxfuel.com/wallpapers/572/94/desktop-wallpaper-banana-background-banana-pink.jpg"

export default function CurrentSteams () {
  const { data: streams } = useReadTableLand("Streams")
  return (
    <div className="py-6">
      <Text content='Streams of the day' size='text-2xl' />
        <div className="relative py-6 grid grid-cols-4 gap-6">
        {streams && streams.map((stream:any) => <Video key={stream.streamId} streamId={stream.streamId} topic={stream.topic} playbackId={stream.playbackId} host={stream.user_address}/>)}
      </div>
    </div>
  )
}

function Video ({ streamId, topic, playbackId, host }: { streamId: string, topic: string, playbackId: string, host: string }) {
  const [isActive, setIsActive] = useState(false)
  const { data: ensName } = useEnsName({
    address: host as `0x${string}` ,
    scopeKey: host as `0x${string}` || '',
    chainId: 1
  })

  const { data: ensAvatar } = useEnsAvatar({
    address: host as `0x${string}`,
    scopeKey: host as `0x${string}`,
    chainId: 1
  })

  const { useIsHealthy } = useLivePeer()
  useEffect(() => {
    const fetchStatus = async () => {
      const status = await useIsHealthy(streamId)
      setIsActive(status.isActive)
    }
    const interval = setInterval(() => {
      fetchStatus()
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  if(!isActive) return null

  return (
    <Link href={`/streams/${playbackId}`} className="flex items-center justify-center w-full h-[380px] shadow rounded-xl">
      <div className="w-full h-full grid grid-rows-4 gap-2">
        <div className="relative rounded-xl w-full p-16 content-evenly items-center overflow-hidden cursor-pointer row-span-3">
          <Image
            src={imageExample}
            layout="fill"
            objectFit="cover"
            alt="Picture of the author"
          />
          <div className="absolute top-5 left-5 rounded-md h-[20px] w-[40px] bg-[#f20e89]/50 flex justify-center content-center">
            <Text content="LIVE" size="text-sm" />
          </div>
        </div>
        <div className="p-4 grid grid-cols-5 gap-4 row-span-1">
          <div className="flex justify-center items-center">
            {
              ensAvatar
              ? <Image
                src={ensAvatar}
                style={{ borderRadius: '50%'}}
                width={40}
                height={40}
                alt="Avatar"
              />
              : <img src={`https://robohash.org/${host}&200x200`} className="border-2 bg-indigo-300 h-10 w-10 rounded-full" alt="Avatar"/>
            }
          </div>
          <div className="col-span-4">
            <Text content={topic} size="text-xl" />
            <Text content={ensName || shortenAddress(host as `0x${string}`)} color="text-gray-500"/>
          </div>
        </div>
      </div>
    </Link>
  )
}