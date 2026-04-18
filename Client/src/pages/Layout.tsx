import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ArrowRight, Menu, Shield, X } from 'lucide-react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { Show, useClerk, UserButton, } from "@clerk/react";
// import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const Navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
//   const {user} = useUser();

  return (
    <div className='flex flex-col items-start justify-start h-screen fixed top-0 left-0 right-0 bottom-0'>
      <nav className='w-full px-3 md:px-8 min-h-14 flex items-center justify-between border-b border-gray-700'>
        <a href="/" className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-10 md:h-12 w-10 md:w-12 text-primary" />
              <div className="absolute inset-0 blur-md bg-primary/20" />
            </div>
            <span className="text-[25px] md:text-[30px] font-semibold tracking-tight">
              <span className="text-foreground">Lex</span>
              <span className="gradient-text-blue">Guard</span>
            </span>
          </a>

          <div className='flex justify-center items-center gap-4'>
            {
              sidebar ? <X className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(false)}/>
               : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(true)}/>
            }
  

            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-[#0d0d0d]'>
           <Outlet />
        </div>
      </div> 
    </div>
  ) 
  
}

export default Layout
