import { useEffect, useMemo, useState } from 'react';
import { NotificationIcon } from '../Icon';
import * as PushAPI from "@pushprotocol/restapi";
import { useAccount } from 'wagmi';
import { useGetNotifications } from '@/hook/usePush';
import Text from '../Text';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {address} = useAccount()

  const {data} = useGetNotifications(address as string)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    const y = parseInt(data[0].sid)
    localStorage.setItem('lastNotification', String(y));
  };

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
    console.log(x, parseInt(lastestNoti))
    return x.length
  }, [data, localStorage.getItem('lastNotification')])

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="relative block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
        onClick={toggleDropdown}
      >
        <div className='relative'>
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
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {
              data.map((noti:any, id: number) =>
                <Noti key={id} title={noti.title} body={noti.body}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Noti({title, body}:{title:string, body:string}) {
  return(
    <div className='block px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-100'>
      <Text content={title} />
      <p>{body}</p>
    </div>
  )
}

export default Notification;
