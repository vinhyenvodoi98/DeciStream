import { fileToBlob } from "@/utils/images";
import { NFTStorage } from "nft.storage";

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
