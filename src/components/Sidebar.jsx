import { useClerk, useUser } from '@clerk/clerk-react'
import { House, Image, LogOut, SquarePen, Video } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems=[
    {to:'/ai', label:'Dashboard',Icon : House},
    {to:'/ai/generate-image', label:'Generate Images',Icon : Image},
    {to:'/ai/generate-videos', label:'Generate Videos',Icon : Video},
    {to:'/ai/post-insta', label:'Post On Meta',Icon : SquarePen},
    {to:'/ai/post-x', label:'Post On X ',Icon : SquarePen},
    
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signout, openUserProfile } = useClerk()
  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className='my-7 w-full flex flex-col items-center'>
        <img src={user.imageUrl} alt="User Avatar" className='w-13 rounded-full mx-auto' />
        <h1 className='mt-1 text-center'>{user.fullName}</h1>
        <div className='px-6 mt-5 text-sm text-grey-500 font-medium'>
            {navItems.map((item) => (
               <NavLink
                 key={item.to}
                 to={item.to}
                 end={item.to === '/ai'}
                 onClick={() => setSidebar(false)}
                 className={({ isActive }) =>
                   `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#124170] text-white' : ''}`
                 }
               >
                 {({ isActive }) => (
                   <>
                     <item.Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                     {item.label}
                   </>
                 )}
               </NavLink>
            ))}
        </div>
      </div>
      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
        <div onClick={openUserProfile} className='flex gap-2 item-center cursor-pointer'>
         <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
         <div>
          <h1 className='text-sm font-medium'>{user.fullName}</h1>
         </div>
        </div>
        <LogOut onClick={signout} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
       
      </div>
    </div>
  )
}

export default Sidebar
