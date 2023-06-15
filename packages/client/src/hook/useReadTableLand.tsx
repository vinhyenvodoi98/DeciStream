import { useQuery } from '@tanstack/react-query';
import { Database } from "@tableland/sdk";

interface Channels {
  user_address: string;
  subscription_erc721_address: string;
  video_erc721_address: string;
}

interface Subscriptions {
  subscription_erc721_address: string;
  subscriber_address: string;
  tokenId: number;
}

interface Videos {
  video_erc721_address: string;
  owner_address: string;
  tokenId: number;
}

export function getReadTableLand(table:string) {
  return ['tableLand', table];
}

export function useReadTableLand(table:string) {
  const {
    isLoading,
    isError: hasError,
    data: data,
  } = useQuery({
    queryKey: getReadTableLand(table),
    queryFn: () => {
      return fetchChannelsData(table);
    },
    refetchInterval: 10500,
  });

  return { isLoading, hasError, data };
}

async function fetchChannelsData(table: string): Promise<any> {
  const db = new Database<Channels | Subscriptions | Videos>();
  let data;
  switch (table) {
    case 'Channels':
      data = await db.prepare<Channels>(`SELECT * FROM ${process.env.NEXT_PUBLIC_CHANNELS_TABLE} ;`).all();
      break;
    case 'Subscriptions':
      data = await db.prepare<Subscriptions>(`
      SELECT * FROM
        ${process.env.NEXT_PUBLIC_SUBCRIPTIONS_TABLE},
        ${process.env.NEXT_PUBLIC_CHANNELS_TABLE}
      WHERE
        ${process.env.NEXT_PUBLIC_SUBCRIPTIONS_TABLE}.subscription_erc721_address = ${process.env.NEXT_PUBLIC_CHANNELS_TABLE}.subscription_erc721_address;`).all();
      break;
    case 'Videos':
      data = await db.prepare<Videos>(`SELECT * FROM ${process.env.NEXT_PUBLIC_VIDEOS_TABLE};`).all();
      break;
    default:
      console.log('Unknown ');
      // Thực hiện các hành động mặc định khi không có trường hợp nào khớp
      return null;
  }
  return data.results;
}

export function getSubscribedChannels(address:string) {
  return ['subcribedChannels', address];
}

export function useGetSubscribedChannels(address:string) {
  const {
    isLoading,
    isError: hasError,
    data: data,
  } = useQuery({
    queryKey: getSubscribedChannels(address),
    queryFn: () => {
      if(!address) return []
      return fetchSubcribedChannel(address);
    },
    refetchInterval: 10500,
  });

  return { isLoading, hasError, data };
}

async function fetchSubcribedChannel(address: string): Promise<any> {
  const db = new Database<Channels | Subscriptions | Videos>();
  const data = await db.prepare<Subscriptions>(`
  SELECT * FROM
    ${process.env.NEXT_PUBLIC_CHANNELS_TABLE},
    ${process.env.NEXT_PUBLIC_SUBCRIPTIONS_TABLE}
  WHERE
    ${process.env.NEXT_PUBLIC_SUBCRIPTIONS_TABLE}.subscription_erc721_address = ${process.env.NEXT_PUBLIC_CHANNELS_TABLE}.subscription_erc721_address
    AND
    ${process.env.NEXT_PUBLIC_SUBCRIPTIONS_TABLE}.subscriber_address = '${address}'
  ;`).all();
  return data.results;
}
