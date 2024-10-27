import React from 'react'

export default function PasswordPInput({label,placeholder,classname}) {
  return (
    <div className={`flex flex-col space-y-2 w-full ${classname}`}>
    <label htmlFor={label} className='font-semibold'>{placeholder}</label>
    <input type='password' placeholder={placeholder} className='p-2 border-2 w-full border-gray-400 border-solid rounded placeholder-gray-500' id={label}></input>
    </div>
  )
}
