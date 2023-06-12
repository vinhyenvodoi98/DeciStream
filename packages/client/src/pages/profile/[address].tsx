import { CheckIcon, CopyIcon } from "@/components/Icon";
import { useRouter } from 'next/router'
import Layout from "@/components/layout/Layout";
import Text from "@/components/Text";
import React, { useEffect, useState } from "react";
import { useAccount, useEnsAvatar, useEnsName, useWalletClient } from "wagmi";
import { shortenAddress } from "@/utils/addresses";
import Image from "next/image";
import * as PushAPI from "@pushprotocol/restapi";

const Profile: React.FC = () => {
  const router = useRouter()
  const { address } = router.query
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const account = useAccount();

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

  useEffect(() => {
    const getSubscibers = async () => {
    // const subscriptions = await PushAPI.channels.getSubscribers({
    //   channel: 'eip155:80001:0xdA0AE9002cE609F8707f4Cb5D45704b7aAa78624', // user address in CAIP
    //   env: 'staging'
    // });
    // console.log({subscriptions})
   }
   getSubscibers()
  }, [])

  const handleSubcribe = async () => {
    await PushAPI.channels.subscribe({
      signer: walletClient,
      channelAddress: 'eip155:80001:0xD8634C39BBFd4033c0d3289C4515275102423681', // channel address in CAIP
      userAddress: 'eip155:80001:0x52f856A160733A860ae7DC98DC71061bE33A28b3', // user address in CAIP
      onSuccess: () => {
       console.log('opt in success');
      },
      onError: () => {
        console.error('opt in error');
      },
      env: 'staging'
    })
  }

  const chandleCeateChannel = async () => {
    console.log("create channel")
  }

  return (
    <Layout>
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mt-6">
          <div className="w-full bg-white overflow-hidden">
            <div className="flex justify-between">
              {address && <ProfileENS address={address as string}/> }
              <div className="flex items-center">
                {
                  account.address === address
                  ? <button
                    className="ml-auto bg-black text-white font-bold py-2 px-4 rounded"
                    onClick={() => chandleCeateChannel()}
                    >
                      Create Channel
                    </button>
                  : <button
                    className="ml-auto bg-black text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSubcribe()}
                    >
                      Subscribe
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
    name: data,
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
        : <img src={`https://robohash.org/${address}&200x200`} className="h-24 w-24 rounded-full" alt="Avatar"/>
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