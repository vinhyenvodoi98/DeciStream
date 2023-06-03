import * as React from 'react';
import Text from '../Text';

import Wallet from '../Wallet';

export default function Header() {
  return (
    <header className='sticky top-0 z-50'>
      <div className='flex h-20 items-center justify-between'>
        <Text content="Decivote" size='text-2xl'/>
        <Wallet />
      </div>
    </header>
  );
}
