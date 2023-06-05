import Image from "next/image"
import Link from "next/link"
import Text from "../Text"

const imageExample = "https://bridgesandballoons.com/Images/2016/02/Japan-itinerary-20.jpg"

export default function TravelDaos () {
  const travelDaos = [1,2,3,4,5,6,7,8,9,10]
  return (
    <div className="py-6">
      <Text content='Travel Dao Zone' size='text-2xl' />
      <div className="relative p-6 grid grid-cols-5 gap-6">
        {travelDaos.map(travleDao => <Video key={travleDao} id={travleDao}/>)}
      </div>
    </div>
  )
}

function Video ({id}: {id: any}) {
  return (
    <Link href={`/dao/${id}`} className="flex items-center justify-center w-full rounded-lg shadow">
      <div className="p-4 grid grid-cols-4 gap-4">
        <div className="pt-2">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="h-[40px] w-[40px] rounded-full"/>
        </div>
        <div className="col-span-3">
          <Text content="Title hoge higo" size="text-xl" />
          <Text content="auther" color="text-gray-400"/>
          <Text content="Tokyo - Japan" color="text-gray-300"/>
        </div>
      </div>
    </Link>
  )
}