import Link from "next/link"
import Text from "../Text"
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { shortenAddress } from "@/utils/addresses"
import Image from "next/image"
import { useReadTableLand } from "@/hook/useReadTableLand"
import { useMemo } from "react"

export default function Streamers() {
  const { data: channels } = useReadTableLand("Channels")
  const { data: subscribedChannel } = useReadTableLand("Subscriptions")
  const { address } = useAccount()

  const subChannels = useMemo(() => {
    if (!subscribedChannel) return []
    return subscribedChannel.map((data : any) => data.user_address)
  }, [subscribedChannel])

  const otrChannels = useMemo(() => {
    if (!channels || !subChannels || subChannels.length === 0 || !address) return []
    return channels.filter((channel:any) => !subChannels.includes(channel.user_address) && address.toLocaleLowerCase() !== channel.user_address).map((data : any) => data.user_address)
  }, [channels, subChannels, address])

  return (
    <div className="py-6 grid grid-rows-3 gap-4">
      {subChannels.length > 0 &&
        <div className="col-span">
          <Text content="Subscribed 🍿" size='text-2xl'/>
          <div className="py-6">
            {subChannels.map((info: string) => <Streamer key={info} address={info} />)}
          </div>
        </div>
      }
      <div className="col-span-2">
        <Text content="Channels 👀" size='text-2xl'/>
        <div className="py-6">
          {otrChannels.map((info: string) => <Streamer key={info} address={info} />)}
        </div>
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
    address: address as `0x${string}`,
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