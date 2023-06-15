import * as React from 'react';
import Text from '../Text';

import Wallet from '../Wallet';
import { WriteIcon } from '../Icon';
import Link from 'next/link';
import Notification from '../Notification';

export default function Header() {
  return (
    // sticky
    <header className='top-0 z-50 bg-white'>
      <div className='flex h-20 items-center justify-between'>
        <Link href="/" className='flex items-center pr-6'>
          <Text content="ĐeciPodCast" size='text-2xl'/>
        </Link>
        <div className='flex'>
          <Link href="/planning" className='flex items-center pr-6'>
            <WriteIcon />
          </Link>
          <div className='flex items-center pr-6'>
            <Notification />
          </div>
          <Wallet />
        </div>
      </div>
    </header>
  );
}
