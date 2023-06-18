// import { useState, useEffect } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';

import VideosAbi from '../../../contracts/out/Videos.sol/Videos.json';

export function getReadContractKey(contractAddress:string, functionName: string, params?: Array<any>) {
  return ['readContract', contractAddress, functionName, params];
}

export function useReadContract(contractAddress: string, functionName: string, params?: Array<any>) {
  const {
    isLoading,
    isError: hasError,
    data: data,
  } = useQuery({
    queryKey: getReadContractKey(contractAddress, functionName, params),
    queryFn: () => {
      if (!functionName) return null;
      return fetchContractData(contractAddress ,functionName, params);
    },
    refetchInterval: 7500,
  });

  return { isLoading, hasError, data };
}

export function getCachedReadContract(
  queryClient: QueryClient,
  contractAddress: string,
  functionName: string,
  params?: Array<any>
) {
  return queryClient.getQueryData(getReadContractKey(contractAddress, functionName, params));
}

async function fetchContractData(
  contractAddress: string,
  functionName: string,
  params?: Array<any>
): Promise<any> {
  const data = await readContract({
    address: contractAddress as `0x${string}`,
    abi: VideosAbi.abi,
    functionName: functionName,
    args: params || [],
  });
  return data;
}
