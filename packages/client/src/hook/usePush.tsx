import {  useQuery } from '@tanstack/react-query';
import * as PushAPI from "@pushprotocol/restapi";

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
    refetchInterval: 10500,
  });

  return { isLoading, hasError, data };
}

async function fetchSubcriber(): Promise<any> {
  const subscriptions = await PushAPI.channels.getSubscribers({
    channel: 'eip155:80001:0xdA0AE9002cE609F8707f4Cb5D45704b7aAa78624', // user address in CAIP
    env: 'staging'
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
    refetchInterval: 10500,
  });

  return { isLoading, hasError, data };
}

async function fetchNotifications(address: string): Promise<any> {
  const spams = await PushAPI.user.getFeeds({
    user: `eip155:80001:${address}`, // user address in CAIP
    env: 'staging',
  });
  return spams.filter((spam:any) => spam.app === "DeciPodcast").map((feed:any) => feed.notification);
}
