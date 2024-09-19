import React from 'react'
import {BiSolidHome} from "react-icons/bi";

export default function Sidebar() {
    console.log("side")

  return (
    <div className='w-1/4 border border-s-white sidebar'> 
    <div className="nav secondary_bg rounded-lg px-4 py-4">
        <div>
            <BiSolidHome className='font-bold text-xl'/>
            <span>Home</span>
        </div>
    </div>
      Sidebar
    </div>
  )
}
