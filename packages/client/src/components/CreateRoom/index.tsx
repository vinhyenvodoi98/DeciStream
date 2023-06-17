import useLivePeer from "@/hook/useLivePeer";
import { useReadTableLand } from "@/hook/useReadTableLand";
import { useWriteContract } from "@/hook/useWriteContract";
import { shortenAddress } from "@/utils/addresses";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import Text from "../Text";
import DropdownInput from "./DrowdownInput";

export default function CreateRoom () {
  const { address } = useAccount()
  const router = useRouter();
  const [inviteeAddress, setInviteeAdress] = useState<any>(null);
  const [roomId, setRoomId] = useState('')
  const { useCreate, useInvite, useClose ,useCloseStream, useOpenStream } = useLivePeer()
  const { triggerInviteNoti } = useWriteContract()
  const { data: channel } = useReadTableLand("Channels")

  const channelOptions = useMemo(() => {
    if (!channel) return []
    return channel.map((c:any) => {
      return {
        value: c.user_address,
        label: shortenAddress(c.user_address)
      }
    })
  }, [channel])

  const handleCreate = async () => {
    console.log("create")
    const data = await useCreate()
    setRoomId(data.id)

    const invite = await useInvite(data.id, address as string)
    router.push(`/live?joinUrl=${invite.joinUrl}`);
  }

  const handleInvite = async () => {
    if (inviteeAddress)  {
      const data = await useInvite(roomId, inviteeAddress.value)
      await triggerInviteNoti(inviteeAddress.value, data.joinUrl.slice(64)) // because push limit 500 words
      setInviteeAdress('');
    }
  }

  const handleOpenStream = async () => {
    const data = await useOpenStream(roomId)
    console.log(data)
  }

  const handleCloseStream = async () => {
    const data = await useCloseStream(roomId)
    console.log(data)
  }

  const handleClose = async () => {
    console.log("close")
    const data = await useClose(roomId)
    console.log(data)
    setRoomId('')
  }

  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="flex justify-between">
        <Text content="Create Room" size="text-xl"/>
        <button
          onClick={() => handleCreate()}
          className="h-6 px-4 bg-blue-500 text-white rounded-full">
          Create
        </button>
      </div>
      <div className="grid grid-cols-7 h-10 gap-4">
        <div className="col-span-5">
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
    </div>
  )
}
