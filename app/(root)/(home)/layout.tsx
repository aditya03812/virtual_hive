import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import React, { ReactNode} from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col relative">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-0 max-md:pb-14 sm:px-14">
          <div className="w-full">
            {children}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default HomeLayout