import { fileToBlob } from "@/utils/images";
import { NFTStorage } from "nft.storage";
import { useState } from "react";
import axios from 'axios';

export async function useUploadMetadata(_metadata: any) {
  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE || '' })
  const content = new Blob([JSON.stringify(_metadata)])
  const metadata = await client.storeBlob(content)
  return metadata;
}

export async function useUploadImage(image: File) {
  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE || '' })
  const content = fileToBlob(image)
  const metadata = await client.storeBlob(content)
  return metadata;
}

export async function getMetadata(ipfsLink: string) {
  try {
    const response = await axios.get(`https://${ipfsLink}.ipfs.nftstorage.link`);
    return response.data;
  } catch (error) {
    console.log('Failed to create new room', error);
    return null
  }
}
