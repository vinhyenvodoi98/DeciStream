import { useState, useEffect } from 'react';
import Link from "next/link"
import Text from "../Text"

export default function PodCastDaos () {
  const travelDaos = [1,2,3,4,5,6,7,8,9,10]

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const db = new Database<Posts>();
  //       const { results } = await db.prepare<Posts>(`SELECT * FROM ${process.env.NEXT_PUBLIC_CHANNELS_TABLE};`).all();
  //       console.log({results})
  //       setData(results);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="py-6">
      <Text content='PodCast Dao Zone' size='text-2xl' />
      <div className="relative py-6 grid grid-cols-5 gap-6">
        {travelDaos.map(travleDao => <DaoLabel key={travleDao} id={travleDao}/>)}
      </div>
    </div>
  )
}

function DaoLabel ({id}: {id: any}) {
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
