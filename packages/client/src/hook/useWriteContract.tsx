import { writeContract } from '@wagmi/core';
import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

import DeployedContract from '../../../contracts/contractInfo.json';
import MasterAbi from '../../../contracts/out/Master.sol/Master.json';

export function useWriteContract() {
  const [isLoading, setIsLoading] = useState(false);

  const triggerTransactions = useCallback(
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

  return {
    isLoading,
    triggerTransactions,
  };
}
