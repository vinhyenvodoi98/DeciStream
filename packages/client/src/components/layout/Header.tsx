import Text from '../Text';
import Wallet from '../Wallet';
import { LiveIcon, WriteIcon } from '../Icon';
import Link from 'next/link';
import Notification from '../Notification';
import Image from 'next/image';

export default function Header() {
  return (
    // sticky
    <header className='top-0 z-50 bg-white'>
      <div className='flex h-20 items-center justify-between'>
        <Link href="/" className='flex items-center pr-6'>
          <Image height={40} width={40} src='/images/logo.png' alt="DeciStream Logo"/>
          <Text content="ĐeciStreams" size='text-2xl'/>
        </Link>
        <div className='flex items-center'>
          <Link href="/planning" className='flex items-center justify-center h-9 w-9 mr-6 hover:bg-gray-100 rounded-full'>
            <WriteIcon />
          </Link>
          <Link href="/live" className='flex items-center justify-center h-9 w-9 mr-6 hover:bg-gray-100 rounded-full'>
            <LiveIcon />
          </Link>
          <div className='flex items-center  justify-center h-9 w-9 mr-6 hover:bg-gray-100 rounded-full'>
            <Notification />
          </div>
          <Wallet />
        </div>
      </div>
    </header>
  );
}
