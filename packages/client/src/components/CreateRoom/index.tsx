import useLivePeer from "@/hook/useLivePeer";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";
import Text from "../Text";

export default function CreateRoom () {
  const { address } = useAccount()
  const router = useRouter();
  const [inviteeAddress, setInviteeAdress] = useState('');
  const [roomId, setRoomId] = useState('')
  const { useCreate, useInvite, useClose ,useCloseStream, useOpenStream } = useLivePeer()
  const handleChange = (event: any) => {
    setInviteeAdress(event.target.value);
  };

  const handleCreate = async () => {
    console.log("create")
    const data = await useCreate()
    setRoomId(data.id)

    const invite = await useInvite(data.id, address as string)
    router.push(`/live?joinUrl=${invite.joinUrl}`);
  }

  const handleInvite = async () => {
    if (inviteeAddress.trim() !== '') {
      console.log(address)
      const data = await useInvite(roomId, inviteeAddress)
      console.log(data)
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
      <div className="flex">
        <input
            type="text"
            value={inviteeAddress}
            onChange={handleChange}
            placeholder="Input address or ENS"
            className="flex-grow p-2 border mr-2 border-gray-300 rounded"
          />
          <button
            onClick={()=>handleInvite()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
