import React from 'react'
import Image from 'next/image';

const Appbar = () => {
  return (
    <header className='flex fixed top-0 z-50 justify-between items-center p-4 h-16 w-full bg-[#93c5fd40] backdrop-blur-md'>
        <h1 className='text-2xl font-bold'>My Expence</h1>
        {/* <Image alt='menu' src={'/icons/hamburger-menu.svg'} width={30} height={30} /> */}
    </header>
  )
}

export default Appbar;