import Link from "next/link"
import Text from "../Text"
import { useEnsAvatar, useEnsName } from 'wagmi'
import { AvatarSkeleton, TextSkeleton } from "../Skeleton"
import { shortenAddress } from "@/utils/addresses"
import Image from "next/image"

export default function Podcasters() {
  const podcasters = ["0x2484930A74674AA452cB5b83599A2797f0e3a939","0xAC288d6A0e4a3C47d733d443aBEe9e764C407210"]
  return (
    <div className="py-6">
      <Text content="Podcasters" size='text-2xl'/>
      <div className="py-6">
        {podcasters.map((info, id) => <Podcaster key={id} address={info} />)}
      </div>
    </div>
  )
}

function Podcaster({address}: {address: string}) {
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
          : <img src={`https://robohash.org/${address}&200x200`} className="h-[30px] w-[30px] rounded-full"/>
        }
      </div>
      <div className="flex justify-center items-center p-2 pl-6">
        <Text content={data ||shortenAddress(address)} />
      </div>
    </Link>
  )
}