import { useUserStore } from '@store/user';
import React from 'react';

const HeaderNavigation = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  return (
    <nav className='bg-white w-full max-w-7xl'>
      <div className='max-w-7xl flex relative justify-between items-center mx-auto  h-16 '>
        <div className='inline-flex'>
          <a href='/'>
            <h1 className='header-display'>Noty</h1>
          </a>
        </div>
        <button onClick={() => removeUser()}>
          <p className='font-medium'>Logout</p>
        </button>
      </div>
    </nav>
  );
};

export default HeaderNavigation;
