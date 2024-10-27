import React from 'react'

export default function HoverText({displayedText,active}) {
  return (
    <div className='flex items-center justify-start py-1 cursor-pointer '>
    <div className={`${active?
    "text-white":"text-gray-500"
    } "font-semibold" hover:text-white`}>{displayedText}</div>
  </div>
  )
}

