import Image from "next/image"
import Link from "next/link"
import Text from "../Text"

const imageExample = "https://bankless.ghost.io/content/images/public/images/36313cdc-9715-4d49-a490-65942b04a0dc_640x800.webp"

export default function Categories () {
  const categories = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <div className="py-6">
      <Text content='Vote' size='text-2xl' />
      <div className="relative p-6 grid grid-cols-6 gap-6">
        {categories.map(category => <Video key={category} id={category}/>)}
      </div>
    </div>
  )
}

function Video ({id}: {id: any}) {
  return (
    <Link href={`/dao/${id}`} className="flex items-center justify-center w-full h-[280px]">
      <div className="relative rounded-xl h-[220px] w-[120px] p-16 content-evenly items-center overflow-hidden">
        <Image
          src={imageExample}
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
        />
      </div>
    </Link>
  )
}