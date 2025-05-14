import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './button'
import NavItems from './NavItems'



const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
        <Link href='/' className='flex items-center gap-1'>
        <Image 
        src="/icons/logo.svg"
        width = {32}
        height = {32}
        alt = "Virtual-Hive"
        className = 'max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'> Virtual Hive</p>
        </Link>
        
          <div className="md:flex-between w-full max-w-xs max-sm:hidden ">
            <NavItems />
          </div>
        

        <div className='flex-between gap-5'>
        <SignedIn>
            <UserButton />
            <MobileNav />
          </SignedIn>
        <SignedOut>
            <Button asChild className="rounded-full bg-blue-500" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
            <MobileNav />
        </div>

    </nav>
  )
}

export default Navbar