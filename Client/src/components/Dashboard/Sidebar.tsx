// import { useClerk, useUser, Protect } from '@clerk/clerk-react';
import { ChevronUp, Eraser, FileText, Hash, History, House, icons, Image, LayoutDashboardIcon, LogOut, Scissors, Settings, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';


const navItems = [
      {to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboardIcon},
      {to: '/dashboard/history', label: 'History', Icon: History},
      {to: '/dashboard/settings', label: 'Settings', Icon: Settings},
 ]

const Sidebar = ({ sidebar, setSidebar }) => {

//     const {user} = useUser();
// const {signOut, openUserProfile} = useClerk()

   return (
   <div className={`w-[270px] bg-black border-r border-gray-700 flex flex-col justify-between items-center max-sm:absolute top-14
   bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
     <div className='my-7 w-full'>
       {/* <img src={user ? user.imageUrl : "/favicon.svg"} alt="User avatar" className='w-13 rounded-full mx-auto'/>
       <h1 className='mt-1 text-center'>{user ? user.fullName : "Guest"}</h1> */}
       <div className='text-sm text-gray-600 font-medium mx-3 mt-3'> 
        {navItems.map(({to, label, Icon}) => (
            <NavLink
                key={to}
                to={to}
                end={to === '/dashboard'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-br from-[#0B1B2B] to-[#071426] text-[#3B82F6] rounded-xl font-medium w-full px-5 py-3 flex items-center gap-3 shadow-lg mt-2"
                    : "text-gray-600 font-medium w-full px-6 py-3 flex items-center gap-3 rounded-xl hover:bg-gradient-to-br from-[#0B1B2B] to-[#071426] hover:text-blue-600 mt-2"
                }
              >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
        ))}
       </div>
     </div>


    <button className="max-w-full bg-[#020817] border border-blue-500/40 rounded-xl px-6 py-3 my-4 flex items-start gap-3 hover:bg-[#061227] transition">
      <ChevronUp className="text-blue-500 w-4 h-4 mt-1" />      
        <div className="flex flex-col text-left">
          <span className="text-blue-500 font-semibold">
            Upgrade
          </span>
          <span className="text-gray-400 text-sm">
            Unlock unlimited scans
          </span>
        </div> 
   </button>
 </div>
 )
}
export default Sidebar
