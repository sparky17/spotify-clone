import React from 'react'

export default function TextInput({label,placeholder,classname,inputType,value,setValue}) {
  return (
    <div className={`flex flex-col space-y-2 w-full ${classname}`}>
    <label htmlFor="" className='font-semibold'>{label}</label>
    <input type={inputType} placeholder={placeholder} className='p-3 border-2 w-full border-gray-400 border-solid rounded placeholder-gray-500' id={label}
    value={value}
    onChange={(e)=>{
      setValue(e.target.value)
    }}
    />
    </div>
  )
}
