import Image from "next/image"
import Link from "next/link"
import Text from "../Text"

const imageExample = "https://e0.pxfuel.com/wallpapers/572/94/desktop-wallpaper-banana-background-banana-pink.jpg"

export default function CurrentSteams () {
  const categories = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <div>
      <Text content='Streams of the day' size='text-2xl' />
        <div className="relative p-6 grid grid-cols-4 gap-6">
        {categories.map(category => <Video key={category} id={category}/>)}
      </div>
    </div>
  )
}

function Video ({id}: {id: any}) {
  return (
    <Link href={`/streams/${id}`} className="flex items-center justify-center w-full h-[380px] shadow rounded-xl">
      <div className="w-full h-full">
        <div className="relative rounded-xl w-full h-2/3 p-16 content-evenly items-center overflow-hidden cursor-pointer">
          <Image
            src={imageExample}
            layout="fill"
            objectFit="cover"
            alt="Picture of the author"
          />
          <div className="absolute top-5 left-5 rounded-md h-[20px] w-[40px] bg-[#f20e89]/50 flex justify-center content-center">
            <Text content="LIVE" size="text-sm" />
          </div>
        </div>
        <div className="p-4 grid grid-cols-5 gap-4">
          <div>
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="h-[40px] w-[40px] rounded-full"/>
          </div>
          <div className="col-span-4">
            <Text content="Title hoge higo" size="text-xl" />
            <Text content="auther" color="text-gray-500"/>
          </div>
        </div>
      </div>
    </Link>
  )
}