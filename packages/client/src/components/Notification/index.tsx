import { useEffect, useMemo, useRef, useState } from 'react';
import { NotificationIcon } from '../Icon';
import * as PushAPI from "@pushprotocol/restapi";
import { useAccount } from 'wagmi';
import { useGetNotifications } from '@/hook/usePush';
import Text from '../Text';
import Link from 'next/link';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {address} = useAccount()
  const dropdownRef = useRef<any>(null);

  const {data} = useGetNotifications(address as string)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    const y = parseInt(data[0].sid)
    localStorage.setItem('lastNotification', String(y));
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(data) {
      const lastestNoti = localStorage.getItem('lastNotification');
      if(lastestNoti && data.length > 0) {
        // const x = parseInt(lastestNoti);
        // const y = parseInt(data[0].sid)
        // if (y > x) {
        //   localStorage.setItem('lastNotification', String(y));
        // }
      } else{
        localStorage.setItem('lastNotification', "0");
      }
    }
  }, [data])

  const newNotiNumber = useMemo(() => {
    if (!data || data.length === 0 ) return 0
    const lastestNoti = localStorage.getItem('lastNotification');
    if (!lastestNoti) return 0
    const x = data.filter((data:any) => parseInt(data.sid) > parseInt(lastestNoti))
    return x.length
  }, [data, localStorage.getItem('lastNotification')])

  const filteredData = useMemo(() => {
    if (!data || data.length === 0 ) return []
    return data.map((data:any) => {
      let body = data.body;
      let link = null;
      if(data.title === "Stream invitation !") {
        body = "🎬 Click to join"
        link = data.body
      }

      return {
        title: data.title,
        body,
        link
      }
    })
  }, [data])

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="relative block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
        onClick={toggleDropdown}
      >
        <div className='relative' ref={dropdownRef}>
          {
            newNotiNumber > 0 &&
              <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                {newNotiNumber}
              </span>
          }
          <NotificationIcon />
        </div>
      </button>

      {isOpen && (
        <div className="origin-top-right z-10 absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 divide-y divide-dashed" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {
              filteredData.map((noti:any, id: number) =>
                <Noti key={id} title={noti.title} body={noti.body} link={noti.link}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Noti({title, body, link}:{title:string, body:string, link: null | string}) {
  return(
    <div className='h-[74px] overflow-hidden bg-white text-sm text-gray-700 hover:bg-gray-100'>
      {link
        ?
        <Link href={`/live?joinUrl=https://meet.livepeer.chat/custom?liveKitUrl=wss://livepeer-prod${link}`} className='block px-4 py-2'>
          <Text content={title} />
          <p>{body}</p>
        </Link>
        :
        <div className='block px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-100'>
          <Text content={title} />
          <p>{body}</p>
        </div>}
    </div>
  )
}

export default Notification;

// https://meet.livepeer.chat/custom?liveKitUrl=wss://livepeer-prod-aeuyf3b7.livekit.cloud&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMHg5ZTU3ODRmMTVhOTJmZWFmMWFiOTE5OTg4MWE3NGU3NjdiOGQyNDQwIiwidmlkZW8iOnsicm9vbUpvaW4iOnRydWUsInJvb20iOiI5YmU5YzYyMi01YTM4LTRhNGItYmJmNy02ZjljMDg0MjY3MzcifSwiaWF0IjoxNjg2OTYxMjIzLCJuYmYiOjE2ODY5NjEyMjMsImV4cCI6MTY4Njk2MTUyMywiaXNzIjoiQVBJNTRENHc4c0Nmd2VWIiwic3ViIjoiODVkYmFjYjctOWQ3Mi00YTFlLWFhYmYtMjRhNTYxNTMzOTJkIiwianRpIjoiODVkYmFjYjctOWQ3Mi00YTFlLWFhYmYtMjRhNTYxNTMzOTJkIn0.iExycAcpvRTIHiu5Ih3eMhTRZkWtcBGPJIkAO1MOPQo
// https://meet.livepeer.chat/custom?liveKitUrl=wss://livepeer-prod-aeuyf3b7.livekit.cloud&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMHg5ZTU3ODRmMTVhOTJmZWFmMWFiOTE5OTg4MWE3NGU3NjdiOGQyNDQwIiwidmlkZW8iOnsicm9vbUpvaW4iOnRydWUsInJvb20iOiI5YmU5YzYyMi01YTM4LTRhNGItYmJmNy02ZjljMDg0MjY3MzcifSwiaWF0IjoxNjg2OTYxMjIzLCJuYmYiOjE2ODY5NjEyMjMsImV4cCI6MTY4Njk2MTUyMywiaXNzIjoiQVBJNTRENHc4c0Nmd2VWIiwic3ViIjoiODVkYmFjYjctOWQ3Mi00YTFlLWFhYmYtMjRhNTYxNTMzOTJkIiwianRpIjoiODVkYmFjYjctOWQ3Mi00YTFlLWFhYmYtM
