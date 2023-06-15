import Link from "next/link"
import Text from "../Text"
import { useEnsAvatar, useEnsName } from 'wagmi'
import { AvatarSkeleton, TextSkeleton } from "../Skeleton"
import { shortenAddress } from "@/utils/addresses"
import Image from "next/image"
import { useReadTableLand } from "@/hook/useReadTableLand"
import { useMemo } from "react"

export default function Streamers() {
  const { data } = useReadTableLand("Channels");

  const channels = useMemo(() => {
    if (!data) return []
    return data.map((data : any) => data.user_address)
  }, [data])

  return (
    <div className="py-6">
      <Text content="Streamers" size='text-2xl'/>
      <div className="py-6">
        {channels.map((info: string) => <Streamer key={info} address={info} />)}
      </div>
    </div>
  )
}

function Streamer({address}: {address: string}) {
  const { data } = useEnsName({
    address: address as `0x${string}`,
    scopeKey: address,
    chainId: 1
  })

  const ensAvatar = useEnsAvatar({
    name: data,
    scopeKey: address,
    chainId: 1
  })

  return (
    <Link href={`/profile/${address}`} className="px-4 py-2 flex hover:bg-slate-100 rounded-lg">
      <div className="flex justify-center items-center">
        {
          ensAvatar.data
          ? <Image
            src={ensAvatar.data}
            style={{ borderRadius: '50%'}}
            width={30}
            height={30}
            alt="Podcaster Avatar"
          />
          : <img src={`https://robohash.org/${address}&200x200`} className="border-2 bg-indigo-300 h-[30px] w-[30px] bor rounded-full"/>
        }
      </div>
      <div className="flex justify-center items-center p-2 pl-6">
        <Text content={data ||shortenAddress(address)} />
      </div>
    </Link>
  )
}