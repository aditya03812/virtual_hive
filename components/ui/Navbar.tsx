'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './button'
import NavItems from './NavItems'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="flex flex-wrap justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Virtual-Hive"
          className="max-md:size-10"
        />
        <p className="text-[26px] font-extrabold text-white">Virtual Hive</p>
      </Link>

      {/* Hamburger icon (visible on <lg screens) */}
      <button
        className="lg:hidden text-white"
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Nav Items (visible on lg+, toggled on smaller screens) */}
      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } flex-col lg:flex lg:flex-row lg:items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0`}
      >
        <NavItems />

        {/* Auth Controls inside menu for mobile/medium */}
        <div className="flex flex-col lg:hidden gap-2 mt-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full bg-blue-500" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>

      {/* Auth Controls for large screens */}
      <div className="hidden lg:flex items-center gap-4">
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
