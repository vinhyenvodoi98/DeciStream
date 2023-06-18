import { writeContract, waitForTransaction } from '@wagmi/core';
import { useCallback, useState } from 'react';

import DeployedContract from '../../../contracts/contractInfo.json';
import MasterAbi from '../../../contracts/out/Master.sol/Master.json';
import SubcriptionsAbi from '../../../contracts/out/Subcriptions.sol/Subcriptions.json';

export function useWriteContract() {
  const [isLoading, setIsLoading] = useState(false);

  const triggerMasterTransactions = useCallback(
    async (functionName: string, params?: Array<any>) => {
      setIsLoading(true);
      try {
        const { hash } = await writeContract({
          mode: "recklesslyUnprepared",
          address: DeployedContract.deployedTo as `0x${string}`,
          abi: MasterAbi.abi,
          functionName: functionName,
          args: params || [],
        });
        const data = await waitForTransaction({
          hash
        })
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const triggerSubscribe = useCallback(
    async (contractAddress: string) => {
      setIsLoading(true);
      try {
        const { hash } = await writeContract({
          mode: "recklesslyUnprepared",
          address: contractAddress as `0x${string}`,
          abi: SubcriptionsAbi.abi,
          functionName: "mint",
          args: [],
        });
        const data = await waitForTransaction({
          hash
        })
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const triggerInviteNoti = useCallback(
    async (to: string, inviteLink: string) => {
      setIsLoading(true);
      try {
        const { hash } = await writeContract({
          mode: "recklesslyUnprepared",
          address: DeployedContract.deployedTo as `0x${string}`,
          abi: MasterAbi.abi,
          functionName: "inviteNotify",
          args: [to, inviteLink],
        });
        const data = await waitForTransaction({
          hash
        })
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const triggerCreateStream = useCallback(
    async (topic: string, playbackId: string, streamId: string) => {
      setIsLoading(true);
      try {
        const { hash } = await writeContract({
          mode: "recklesslyUnprepared",
          address: DeployedContract.deployedTo as `0x${string}`,
          abi: MasterAbi.abi,
          functionName: "createStream",
          args: [topic, playbackId, streamId],
        });
        const data = await waitForTransaction({
          hash
        })
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    },
    [setIsLoading]
  );

  return {
    isLoading,
    triggerMasterTransactions,
    triggerSubscribe,
    triggerInviteNoti,
    triggerCreateStream
  };
}
