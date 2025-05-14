import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex  w-full h-full items-center justify-center p-10'>
        <SignUp />
    </main>
  )
}

export default SignUpPage