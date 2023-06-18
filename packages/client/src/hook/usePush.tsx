import {  useQuery } from '@tanstack/react-query';
import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useAccount, useSigner } from 'wagmi';
import { useCallback, useState } from 'react';

export function getPushSubcriber() {
  return ['push'];
}

export function useGetSubcriber() {
  const {
    isLoading,
    isError: hasError,
    data: data,
  } = useQuery({
    queryKey: getPushSubcriber(),
    queryFn: () => {
      return fetchSubcriber();
    },
    refetchInterval: 5500,
  });

  return { isLoading, hasError, data };
}

async function fetchSubcriber(): Promise<any> {
  const subscriptions = await PushAPI.channels.getSubscribers({
    channel: 'eip155:80001:0xdA0AE9002cE609F8707f4Cb5D45704b7aAa78624', // user address in CAIP
    env: 'staging' as ENV
  });
  return subscriptions;
}

export function getPushNotifications(address: string) {
  return ['notifications', address];
}

export function useGetNotifications(address: string) {
  const {
    isLoading,
    isError: hasError,
    data: data,
  } = useQuery({
    queryKey: getPushNotifications(address),
    queryFn: () => {
      return fetchNotifications(address);
    },
    refetchInterval: 5500,
  });

  return { isLoading, hasError, data };
}

async function fetchNotifications(address: string): Promise<any> {
  const spams = await PushAPI.user.getFeeds({
    user: `eip155:80001:${address}`, // user address in CAIP
    env: 'staging' as ENV,
  });
  return spams.filter((spam:any) => spam.app === "DeciPodcast").map((feed:any) => {
    return {
      title: feed.title,
      body: feed.message,
      sid: feed.sid
    }
  });
}

export function useSubcribe() {
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const triggerOptin = useCallback(
    async () => {
      setIsLoading(true);
      address && process.env.NEXT_PUBLIC_PUSH_CHANNEL && await PushAPI.channels.subscribe({
        signer: signer as any,
        channelAddress: `eip155:80001:${process.env.NEXT_PUBLIC_PUSH_CHANNEL}`, // channel address in CAIP
        userAddress: `eip155:80001:${address}`, // user address in CAIP
        onSuccess: () => {
         console.log('opt in success');
        },
        onError: (error) => {
          console.error('opt in error',error);
        },
        env: 'staging' as ENV
      })
      setIsLoading(false);
    },
    [setIsLoading]
  );

  return {
    isLoading,
    triggerOptin,
  };
}
