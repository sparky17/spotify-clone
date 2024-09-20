import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'


export default function Layout({children}) {

  return (
    <div className='flex gap-2'>
      <Sidebar/>
      <div className="w-3/4 border border-s-white">
      {children}
      </div>
    </div>
  )
}
