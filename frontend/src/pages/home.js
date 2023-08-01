import React from 'react';
import logo from '../assets/images/logo512.png';
import AareBern from '../components/AareBern/AareBern';

export default function homePage() {
  return (
    <div className='flex flex-col items-center'>
      <AareBern />
      <div className='flex justify-center'>
        <img src={logo} alt="logo" className='rounded-full m-5 max-w-full' />
      </div>
    </div>
  );
}
