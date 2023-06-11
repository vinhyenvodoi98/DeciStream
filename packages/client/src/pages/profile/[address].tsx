import { CheckIcon, CopyIcon } from "@/components/Icon";
import { useRouter } from 'next/router'
import Layout from "@/components/layout/Layout";
import Text from "@/components/Text";
import React, { useState } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";
import { shortenAddress } from "@/utils/addresses";
import Image from "next/image";

const Profile: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter()
  const { address } = router.query

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

  const handleCopyUsername = (name : string) => {
    navigator.clipboard.writeText(name);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const { data } = useEnsName({
    address: address as `0x${string}`,
    scopeKey: address as `0x${string}` || '',
    chainId: 1
  })

  const ensAvatar = useEnsAvatar({
    name: data,
    scopeKey: address as `0x${string}`,
    chainId: 1
  })

  return (
    <Layout>
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mt-6">
          <div className="w-full bg-white overflow-hidden">
            <div className="flex justify-between">
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
              <div className="flex items-center">
                <button
                  className="ml-auto bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Subscribe
                </button>
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
