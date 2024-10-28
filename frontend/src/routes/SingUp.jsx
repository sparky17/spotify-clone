import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';
import { z } from 'zod';

// Enable TLD list
export default function SingUp() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
      const trimmedEmail = email.trim();
      const trimmedConfirmEmail = confirmEmail.trim();
      const trimmedUserName = userName.trim();
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();

      // Define the validation schema with Zod
      const schema = z.object({
          email: z.string().email().nonempty(),
          confirmEmail: z.string().email().nonempty().refine((val) => val === trimmedEmail, {
              message: "Confirm email must match email",
          }),
          userName: z.string().min(3),
          firstName: z.string().nonempty(),
          lastName: z.string().nonempty(),
          password: z.string().min(6)
      });

      // Validate the data
      try {
          schema.parse({
              email: trimmedEmail,
              confirmEmail: trimmedConfirmEmail,
              userName: trimmedUserName,
              firstName: trimmedFirstName,
              lastName: trimmedLastName,
              password,
          });
      } catch (error) {
          if (error instanceof z.ZodError) {
              alert(error.errors[0].message);
              return; // Exit if validation fails
          }
      }

      const data = { email: trimmedEmail, userName: trimmedUserName, firstName: trimmedFirstName, lastName: trimmedLastName, password };
      const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);

      if (response && !response.err) {
          const token = response.token;
          const date = new Date();
          date.setDate(date.getDate() + 30);
          setCookie("token", token, { path: "/", expires: date });
          alert("Success! Redirecting to home.");
          navigate('/home');
      } else {
          alert("Signup failed. Please try again.");
      }
  };

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div className='logo p-2 border-b-4 border-gray-100 w-full flex justify-center'>
                <Icon icon="logos:spotify" width={200} height={120} />
            </div>
            <div className="inputRegion w-1/4 py-5 flex items-center justify-center flex-col">
                <div className="font-bold mb-8 text-2xl">Sign up for free to start listening</div>
                <TextInput label="Email address" placeholder="Email address" inputType={'text'} classname={'py-2'} value={email} setValue={setEmail} />
                <TextInput label="Confirm Email address" placeholder="Confirm Email address" inputType={'text'} classname={'py-2'} value={confirmEmail} setValue={setConfirmEmail} />
                <TextInput label={'Create a password'} placeholder={'Password'} inputType={'password'} classname={'py-2'} value={password} setValue={setPassword} />
                <div className="w-full flex flex-row justify-between items-center space-x-6">
                    <TextInput label={'First Name'} placeholder={'Enter Your First Name'} inputType={'text'} classname={'py-2'} value={firstName} setValue={setFirstName} />
                    <TextInput label={'Last Name'} placeholder={'Enter Your Last Name'} inputType={'text'} classname={'py-2'} value={lastName} setValue={setLastName} />
                </div>
                <TextInput label="Create User Name" placeholder="Create User Name" inputType={'text'} classname={'py-2'} value={userName} setValue={setUserName} />
                <div className="w-full flex items-center justify-center my-8 ">
                    <button className='bg-green-500 text-lg font-semibold px-8 py-2 rounded-full' onClick={(e) => {
                        e.preventDefault();
                        signUp();
                    }}> SIGN UP </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-bold text-lg">
                    Already have an Account?
                </div>
                <div className="signUpForSpotify border border-gray-400 w-full flex justify-center py-4 rounded-full text-gray-600 font-bold">
                    <Link to={'/login'}>
                        Login Instead
                    </Link>
                </div>
            </div>
        </div>
    );
}
