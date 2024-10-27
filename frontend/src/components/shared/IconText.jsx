import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

export default function IconText({iconName,displayedText,active}) {
  return (
    <div className='flex items-center justify-start py-1 cursor-pointer '>
      <div className='px-5 py-2'>
        <Icon icon={iconName} color={active?"white":"grey"}
        fontSize={25} />
      </div>
      <div className={`${active?
      "text-white":"text-gray-400"
      } "font-semibold" hover:text-white`}>{displayedText}</div>
    </div>
  )
}
