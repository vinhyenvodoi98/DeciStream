import { CheckIcon, CopyIcon } from "@/components/Icon";
import { useRouter } from 'next/router'
import Layout from "@/components/layout/Layout";
import Text from "@/components/Text";
import { useMemo, useState } from "react";
import { useAccount, useSigner, useEnsAvatar, useEnsName } from "wagmi";
import { shortenAddress } from "@/utils/addresses";
import Image from "next/image";
import CreateChannel from "@/components/CreateChannel";
import { useReadTableLand } from "@/hook/useReadTableLand";
import { useGetSubcriber, useSubcribe } from "@/hook/usePush";
import { useWriteContract } from "@/hook/useWriteContract";

const Profile: React.FC = () => {
  const router = useRouter()
  const { address } = router.query
  const { data: channels } = useReadTableLand("Channels");
  const { data: sub } = useReadTableLand("Subscriptions");
  const subcribers = useGetSubcriber()
  const { triggerSubscribe } = useWriteContract();
  const { triggerOptin } = useSubcribe()

  const account = useAccount();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const videos = [
    {
      id: 1,
      title: "Video 1",
      thumbnail: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Video 2",
      thumbnail: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Video 3",
      thumbnail: "https://via.placeholder.com/300x200",
    },
  ];

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

  return (
    <Layout>
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mt-6">
          <div className="w-full bg-white overflow-hidden">
            <div className="flex justify-between">
              {address && <ProfileENS address={address as string}/> }
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
                          {isSubscribed ? "Subscribed  😻" : "Subscribe 🤔"}
                      </button>
                  }
                </div>
            </div>
            <hr className="my-4"/>
            <div className="p-4">
              <Text content="Video" size='text-2xl'/>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-200 rounded-md overflow-hidden shadow-md"
                  >
                    <img
                      className="w-full h-40 object-cover"
                      src={video.thumbnail}
                      alt={video.title}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{video.title}</h3>
                    </div>
                  </div>
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