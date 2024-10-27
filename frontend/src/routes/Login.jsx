import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import { Link } from 'react-router-dom';
// import PasswordPInput from '../components/shared/PasswordInput'; not using it 

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  console.log(email,password)

  return (
    <div className='w-full h-full flex flex-col items-center '>
      <div className='logo p-2 border-b-4 border-gray-100 w-full flex justify-center'>
          <Icon icon="logos:spotify" width={200} height={120}/>
      </div>
      <div className="inputRegion w-1/4 py-5 flex items-center justify-center flex-col">
        <div className="font-bold mb-8">To Continue Login here  </div>
        <TextInput label="Email address" placeholder="Email address" inputType={'text'} classname={'py-2'} value={email} setValue={setEmail}/>
        <TextInput label={'create a password'} placeholder={'Password'} inputType={'password'} classname={'py-2'} value={password} setValue={setPassword}/>

        <div className="w-full flex items-center justify-end my-8 ">
         <button className='bg-green-500 text-lg font-semibold px-8 py-2 rounded-full'> LOG IN </button>
        </div>
      <div className="w-full border border-solid border-gray-300 "></div>
      <div className="my-6 font-bold text-lg">
        Don't have an Account?
      </div>
      <div className="signUpForSpotify border border-gray-400 w-full flex justify-center py-4 rounded-full text-gray-600 font-bold">
      <Link to={'/signup'}>
        SIGN UP FOR SPOTIFY
      </Link>
        </div>
      </div>
    </div>
  )
}
