import React from 'react';
import { BiLibrary, BiSolidHome } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";

export default function Sidebar() {
  console.log("side");

  return (
    <>
      <div className='w-1/4 sidebar'> 
        <div className="nav secondary_bg rounded-lg p-6">
          <div className='flex mt-5 items-center gap-4 text-lg'>
            <BiSolidHome className='font-bold text-2xl'/>
            <span className='text-xl font-semibold'>Home</span>
          </div>
          <div className='flex mt-5 items-center gap-4 text-lg'>
            <FiSearch className='font-bold text-2xl'/>
            <span className='text-xl font-semibold'>Search</span>
          </div>
        </div>

        {/* Added margin for gap */}
        <div className="your_libraries mt-4 secondary_bg rounded-lg p-6">
          <div className='flex justify-between items-center gap-4'>
            <div className='flex gap-2 text-xl'>
              <BiLibrary className='font-bold text-2xl'/>
              <span className='text-xl font-semibold'>Your Library</span>
              <button className='hover:bg-blue rounded-[50%] p-2'>
                <FaCirclePlus className='font-bold text-2xl'/> 
              </button>
            </div>
          </div>
          <div className='flex mt-5 items-center gap-4 text-lg'>
            <FiSearch className='font-bold text-2xl'/>
            <span className='text-xl font-semibold'>Search</span>
          </div>
        </div>
      </div>
    </>
  );
}
