import { writeContract } from '@wagmi/core';
import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

import DeployedContract from '../../../contracts/contractInfo.json';
import MasterAbi from '../../../contracts/out/Master.sol/Master.json';
import SubcriptionsAbi from '../../../contracts/out/Subcriptions.sol/Subcriptions.json';

export function useWriteContract() {
  const [isLoading, setIsLoading] = useState(false);

  const triggerMasterTransactions = useCallback(
    async (functionName: string, params?: Array<any>) => {
      setIsLoading(true);
      const { hash } = await writeContract({
        address: DeployedContract.deployedTo as `0x${string}`,
        abi: MasterAbi.abi,
        functionName: functionName,
        args: params || [],
      });
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const triggerSubscribe = useCallback(
    async (contractAddress: string) => {
      setIsLoading(true);
      const { hash } = await writeContract({
        address: contractAddress as `0x${string}`,
        abi: SubcriptionsAbi.abi,
        functionName: "mint",
        args: [],
      });
      setIsLoading(false);
    },
    [setIsLoading]
  );

  return {
    isLoading,
    triggerMasterTransactions,
    triggerSubscribe,
  };
}
