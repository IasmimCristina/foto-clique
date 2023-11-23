import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import React from 'react'

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className=' w-full mid:flex'>
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        {/* Its an outlet because this layout is used as a route element in App.tsx */}
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout