import Link from 'next/link'
import Image from "next/image"
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-dark-1'>
        <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
            <div className='flex items-center gap-2'>
        <Link href='/'>
        <Image 
        src= '/icons/logo.svg'
        alt='logo'
        width={28}
            height={28}
        />
        </Link>
        <p className='text-[20px] font-extrabold text-white'> Virtual Hive</p>
        </div>
        <div>
        <p className='text-white'>2025 Evently. All Rights reserved.</p>
        </div>
        </div>
    </footer>
  )
}

export default Footer