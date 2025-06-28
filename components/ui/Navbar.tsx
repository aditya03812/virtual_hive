import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './button'
import NavItems from './NavItems'

const Navbar = () => {
  return (
    <nav className="flex flex-wrap justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Virtual-Hive"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white sm:inline">Virtual Hive</p>
      </Link>

      {/* Nav Items (Always visible, stacked on small) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
        <NavItems />
      </div>

      {/* Right side: Auth controls */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <SignedIn>
          <UserButton />
        </SignedIn>
        
        <SignedOut>
          <Button asChild className="rounded-full bg-blue-500" size="lg">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>

    </nav>
  )
}

export default Navbar
