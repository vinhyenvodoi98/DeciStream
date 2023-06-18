import useLivePeer from "@/hook/useLivePeer";
import { useReadTableLand } from "@/hook/useReadTableLand";
import { useUploadMetadata } from "@/hook/useUploadNFTStorage";
import { useWriteContract } from "@/hook/useWriteContract";
import { shortenAddress } from "@/utils/addresses";
import { useCreateStream } from "@livepeer/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { SmallSpinner } from "../Icon";
import Loading from "../Loading";
import Text from "../Text";
import DropdownInput from "./DrowdownInput";

export default function CreateRoom () {
  const { address } = useAccount()
  const router = useRouter();
  const [inviteeAddress, setInviteeAdress] = useState<any>(null);
  const [roomId, setRoomId] = useState('')
  const [topic, setTopic] = useState('')
  const [streamId, setStreamId] = useState<null | string>(null)
  const [recordSessions, setRecordSessions] = useState<any>(null)
  const { isLoading: liveLoading ,useCreate, useInvite, useClose ,useCloseStream, useOpenStream, useGetRecord } = useLivePeer()
  const { isLoading, triggerInviteNoti, triggerCreateStream, triggerMigrateVideo } = useWriteContract()
  const { data: channel } = useReadTableLand("Channels")

  const {
    mutateAsync: createStream,
  } = useCreateStream({
    name: address as string,
    record: true
  });

  useEffect(() => {
    const fetchRecord = async () => {
      if(streamId){
        const recordSession = await useGetRecord(streamId)
        setRecordSessions(recordSession[0])
      }
    }
    const interval = setInterval(() => {
      fetchRecord()
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [streamId])

  const channelOptions = useMemo(() => {
    if (!channel) return []
    return channel.map((c:any) => {
      return {
        value: c.user_address,
        label: shortenAddress(c.user_address)
      }
    })
  }, [channel])

  const channelVideoContract = useMemo(() => {
    if (!channel) return null
    const x = channel.filter((data:any) => data.user_address === String(address).toLocaleLowerCase())[0]
    return x ? x.video_erc721_address : null
  }, [channel, address])

  useEffect(() => {
    if(router.query.roomId) setRoomId(router.query.roomId as string)
  }, [router.query.roomId])

  const handleCreate = async () => {
    if(topic.trim() !==''){
      const data = await useCreate()
      setRoomId(data.id)

      const invite = await useInvite(data.id, address as string)
      router.push(`/live?joinUrl=${invite.joinUrl}&roomId=${data.id}`);
    }
  }

  const handleInvite = async () => {
    if (inviteeAddress)  {
      const data = await useInvite(roomId, inviteeAddress.value)
      await triggerInviteNoti(inviteeAddress.value, data.joinUrl.slice(64)) // because push limit 500 words
      setInviteeAdress('');
    }
  }

  const handleOpenStream = async () => {
    const stream = await createStream?.()
    if(stream){
      await triggerCreateStream(topic, stream.playbackId, stream.id)
      await useOpenStream(roomId, stream.id as string)
      setStreamId(stream.id)
    }
  }

  const handleMigrateVideo = async () => {
    const metadata = await useUploadMetadata({name: topic, image: recordSessions.mp4Url})
    await triggerMigrateVideo(channelVideoContract, metadata)
  }

  const handleCloseStream = async () => {
    await useCloseStream(roomId)
  }

  const handleClose = async () => {
    await useClose(roomId)
    setRoomId('')
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <Loading isVisible={isLoading || liveLoading}/>
      <div className="">
        <Text content="Create Room" size="text-xl"/>
      </div>
      <div className="grid grid-cols-7 h-10 gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mb-2 h-10 focus:outline-none focus:border-blue-500 col-span-5"
          placeholder="Enter Topic"
          value={topic}
          onChange={handleTopicChange}
        />
        <button
          onClick={() => handleCreate()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 h-10">
          Create
        </button>
      </div>
      <div className="grid grid-cols-7 h-10 gap-4">
        <div className="col-span-5 h-10">
          <DropdownInput opt={channelOptions} inviteeAddress={inviteeAddress} setInviteeAdress={(inviteeAddress) => setInviteeAdress(inviteeAddress)}/>
        </div>
        <button
          onClick={()=>handleInvite()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2">
          Invite
        </button>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => handleOpenStream()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Open live
        </button>
        <button
          onClick={() => handleCloseStream()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Close live
        </button>
        <button
          onClick={() => handleClose()}
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
      <button
        onClick={() => handleMigrateVideo()}
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${!(!recordSessions || recordSessions.recordingStatus !== 'ready') && 'hover:bg-blue-700'}`}
        disabled={!recordSessions || recordSessions.recordingStatus !== 'ready'}>
          {(recordSessions && recordSessions.recordingStatus === 'waiting') ? <div>Record <SmallSpinner /></div> : <div>Mint Video NFT</div>}
      </button>
    </div>
  )
}
