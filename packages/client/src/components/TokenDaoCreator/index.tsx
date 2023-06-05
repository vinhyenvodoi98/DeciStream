import React, { useEffect, useState } from 'react';

const TokenDaoCreator = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='h-full'>
      <div className={`${isSticky ? 'sticky top-20' : ''} mt-8`}>
        <div className="bg-white p-4 shadow">
          <h2 className="text-lg font-bold mb-2">Create Dao NFT</h2>
          <p className="text-gray-600">Mô tả đơn giản về tác giả</p>
          <div>Image</div>
          <SubmitButtom />
        </div>
      </div>
    </div>
  );
};

export default TokenDaoCreator;

const SubmitButtom = () => {
  return(
    <a href="#_" className="relative inline-block text-lg group">
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
      <span className="relative">Button Text</span>
      </span>
    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
</a>
  )
}