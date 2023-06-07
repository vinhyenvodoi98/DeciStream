import { useEffect, useState } from 'react';
import { NotificationIcon } from '../Icon';
import * as PushAPI from "@pushprotocol/restapi";
import { useAccount } from 'wagmi';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {address} = useAccount()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const main = async (address: string) => {
      const spams = await PushAPI.user.getFeeds({
        user: `eip155:5:${address}`, // user address in CAIP
        env: 'staging',
      });
      console.log(spams)
    }
    if(address) main(address)
  }, [address])

  return (
    <div className="relative inline-block text-left">
      {/* Biểu tượng chuông */}
      <button
        type="button"
        className="relative z-10 block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
        onClick={toggleDropdown}
      >
        <NotificationIcon />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Notification 1
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Notification 2
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
