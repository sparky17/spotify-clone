import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import { Link , useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';


export default function SingUp() {
    const [email,setEmail]=useState('');
    const [confirmEmail,setConfirmEmail]=useState('');
    const [userName,setUserName]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [password,setPassword]=useState('');
    const [cookie,setCookie]=useCookies(["token"]);
    const navigate=useNavigate();

    console.log(email,confirmEmail,userName,firstName,lastName,password)

    const signUp=async ()=>{
        if(email!==confirmEmail){
            alert('Email and Confirm email must match please confirm')
            return;
        }
        const data ={ email,userName,firstName,lastName,password};
        console.log(data)
        const response=await makeUnauthenticatedPOSTRequest("/auth/register",data);
        if (response && !response.err){
            console.log(response);
            const token = response.token;
            console.log(token)
            const date=new Date();
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path:"/",expires:date});
            alert("success")
            navigate('/home');
        }else{
            alert("failure")
            console.log(response);
        }
    }

  return (
        <div className='w-full h-full flex flex-col items-center '>
          <div className='logo p-2 border-b-4 border-gray-100 w-full flex justify-center'>
              <Icon icon="logos:spotify" width={200} height={120}/>
          </div>
          <div className="inputRegion w-1/4 py-5 flex items-center justify-center flex-col">
            <div className="font-bold mb-8 text-2xl"> Sing up for free to start listning  </div>
            <TextInput label="Email address" placeholder="Email address" inputType={'text'} classname={'py-2'} value={email} setValue={setEmail}/>
            <TextInput label="Confirm Email address" placeholder=" Confirm Email address" inputType={'text'} classname={'py-2'} value={confirmEmail} setValue={setConfirmEmail}/>
            <TextInput label={'create a password'} placeholder={'Password'} inputType={'password'} classname={'py-2'} value={password} setValue={setPassword}/>
            <div className="w-full flex flex-row justify-between items-center space-x-6">
                <TextInput label={'Firtname '} placeholder={'Enter Your FirstName'} inputType={'text'} classname={'py-2'} value={firstName} setValue={setFirstName}/>
                <TextInput label={'Lastname '} placeholder={'Enter Your LastName'} inputType={'text'} classname={'py-2'} value={lastName} setValue={setLastName}/>
            </div>
            <TextInput label="Create UserName" placeholder="Create UserName" inputType={'text'} classname={'py-2'} value={userName} setValue={setUserName}/>
            <div className="w-full flex items-center justify-center my-8 ">
             <button className='bg-green-500 text-lg font-semibold px-8 py-2 rounded-full' onClick={(e)=>{
                e.preventDefault();
                signUp();
             }}> SIGN UP </button>
            </div>
          <div className="w-full border border-solid border-gray-300 "></div>
          <div className="my-6 font-bold text-lg">
            Already have an Account?
          </div>
          <div className="signUpForSpotify border border-gray-400 w-full flex justify-center py-4 rounded-full text-gray-600 font-bold">
                <Link to={'/login'}>
                Login Insted
                </Link>
            </div>
          </div>
        </div>
  )
}
