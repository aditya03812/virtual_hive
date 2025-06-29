import type { Metadata } from "next";
import {  Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virtual Hive",
  description: "Virtual Event Management App",
  icons:{
      icon: '/icons/logo.svg'
  }
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl: '/icons/yoom-logo.svg'
        },
        variables:{
          colorText:'#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#1C1F2E',
          colorInputBackground: '#252a41',
          colorInputText:'#fff',
        }}
      }>
        
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-dark-2` }
      >
        {children}
        <Toaster />
      </body>
      </ClerkProvider>
    </html>
  );
}
