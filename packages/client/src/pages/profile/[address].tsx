import { CheckIcon, CopyIcon } from "@/components/Icon";
import { useRouter } from 'next/router'
import Layout from "@/components/layout/Layout";
import Text from "@/components/Text";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { shortenAddress } from "@/utils/addresses";
import Image from "next/image";
import CreateChannel from "@/components/CreateChannel";
import { useReadTableLand } from "@/hook/useReadTableLand";
import { useGetSubcriber, useSubcribe } from "@/hook/usePush";
import { useWriteContract } from "@/hook/useWriteContract";
import Loading from "@/components/Loading";
import { useReadContract } from "@/hook/useReadContract";
import { getMetadata } from "@/hook/useUploadNFTStorage";
import Link from "next/link";

const Profile: React.FC = () => {
  const router = useRouter()
  const { address } = router.query
  const { data: channels } = useReadTableLand("Channels");
  const { data: sub } = useReadTableLand("Subscriptions");
  const { data: videoNft } = useReadTableLand("Videos");
  const subcribers = useGetSubcriber()
  const { isLoading, triggerSubscribe } = useWriteContract();
  const { triggerOptin } = useSubcribe()

  const account = useAccount();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const currentChannel = useMemo(
    () => {
      if(!channels || !account) {return {}}
      const fillter =  channels.filter((data : any) => data.user_address.toLowerCase() === String(address).toLowerCase() )
      return fillter[0]
    },
    [channels, account.address],
  )

  const handleSubcribe = async () => {
    subcribers.data.subscribers.includes(String(account.address).toLocaleLowerCase()) || await triggerOptin()
    console.log(currentChannel.subscription_erc721_address)
    await triggerSubscribe(currentChannel.subscription_erc721_address);
  }

  const isProfile = useMemo(
    () => {
      if(!address || !account) {return false}
      return String(address).toLowerCase() === String(account.address).toLowerCase()
    },
    [address, account.address],
  )

  const isHaveChannel = useMemo(
    () => {
      if(!channels || !address) {return false}
      const fillter =  channels.filter((data : any) => data.user_address.toLowerCase() === String(address).toLowerCase() )
      return fillter.length === 1
    },
    [channels, address],
  )

  const isSubscribed = useMemo(
    () => {
      if(!sub || !account) {return false}
      const fillter =  sub.filter((data : any) => (
        data.subscriber_address.toLowerCase() === String(account.address).toLowerCase() &&
        data.user_address.toLowerCase() === String(address).toLowerCase()
      ))
      return fillter.length === 1
    },
    [sub, account.address, address],
  )

  const subcriber = useMemo(
    () => {
    if(!sub || !account) {return 0}
      const fillter =  sub.filter((data : any) => (
        data.user_address.toLowerCase() === String(address).toLowerCase()
      ))
      return fillter.length
    }
    , [sub, address]
  )

  const ownedVideos = useMemo(() => {
    if(!videoNft || !account) {return 0}
      const fillter =  videoNft.filter((data : any) => (
        data.owner_address.toLowerCase() === String(address).toLowerCase()
      ))
      return fillter
  }, [videoNft, address])

  return (
    <Layout>
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <Loading isVisible={isLoading} />
        <div className="flex flex-col items-start mt-6">
          <div className="w-full bg-white overflow-hidden">
            <div className="flex justify-between">
              {address &&
              <div>
                <ProfileENS address={address as string}/>
                <div className="ml-6">{subcriber} Subcriber</div>
              </div>
              }
              <div className="flex items-end">
                {
                  isProfile
                  ?
                    isHaveChannel || <CreateChannel isOpen={isCreateModalOpen} onOpen={()=>setIsCreateModalOpen(true)} onClose={()=>setIsCreateModalOpen(false)}/>
                  :
                    isHaveChannel &&
                    <button
                      className={`${isSubscribed ? "bg-transparent border-2 border-black" : "bg-black text-white "} ml-auto font-bold py-2 px-4 rounded-xl`}
                      onClick={() => handleSubcribe()}
                      disabled={isSubscribed}
                      >
                        {isSubscribed ? "Subscribed  😻" : "Subscribe 🚀"}
                    </button>
                }
              </div>
            </div>
            <hr className="my-4"/>
            <div className="p-4">
              <Text content="Video" size='text-2xl'/>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {videoNft && videoNft.map((video: any, id: number) => (
                  <ProfileVideo video={video} key={id}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

function ProfileENS({address}:{address: string}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyUsername = (name : string) => {
    navigator.clipboard.writeText(name);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const { data } = useEnsName({
    address: address as `0x${string}` ,
    scopeKey: address as `0x${string}` || '',
    chainId: 1
  })

  const ensAvatar = useEnsAvatar({
    address: address as `0x${string}`,
    scopeKey: address as `0x${string}`,
    chainId: 1
  })
  return (
    <div className="flex flex-col items-start mt-4 ml-6">
      {
        ensAvatar.data
        ? <Image
          src={ensAvatar.data}
          style={{ borderRadius: '50%'}}
          width={96}
          height={96}
          alt="Avatar"
        />
        : <img src={`https://robohash.org/${address}&200x200`} className="border-2 bg-indigo-300 h-24 w-24 rounded-full" alt="Avatar"/>
      }
      <div className="flex">
        <h1 className="text-3xl font-bold mt-4">{data || shortenAddress(address as `0x${string}`)}</h1>
        <button
          className="px-2 mt-4"
          onClick={() => handleCopyUsername( address as `0x${string}` )}
        >
          {isCopied ? <CheckIcon/> : <CopyIcon/>}
        </button>
      </div>
    </div>
  )
}

function ProfileVideo({video}:{video:any}){
  const [metadata, setMetadata] = useState<any>(null)
  const { data } = useReadContract(video.video_erc721_address, "tokenURI", [video.tokenId]);
  useEffect(() => {
    const fetchMeta = async () => {
      const res = await getMetadata(data)
      setMetadata(res)
    }
    if(data) fetchMeta()
  }, [data])

  return(
    <div className="bg-gray-200 rounded-md overflow-hidden shadow-md">
      {metadata && metadata.image ?
      <Link href={`/video?videoUrl=${metadata.image}`}>
        <div>
          <img
            className="w-full h-40 object-cover"
            src="https://idsb.tmgrup.com.tr/ly/uploads/images/2021/03/23/102271.jpg"
            alt="video 1"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{metadata && metadata.name ? metadata.name : 'Default'}</h3>
            <p className="text-gray-500">Video contract: {shortenAddress(video.video_erc721_address)}</p>
            <p className="text-gray-500">tokenId: {video.tokenId}</p>
          </div>
        </div>
      </Link>
      :
      <div>
        <img
        className="w-full h-40 object-cover"
        src="https://idsb.tmgrup.com.tr/ly/uploads/images/2021/03/23/102271.jpg"
        alt="video 1"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{metadata && metadata.name ? metadata.name : 'Default'}</h3>
          <p className="text-gray-500">Video contract: {shortenAddress(video.video_erc721_address)}</p>
          <p className="text-gray-500">tokenId: {video.tokenId}</p>
        </div>
      </div>
      }
    </div>
  )
}