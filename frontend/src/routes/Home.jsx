import React from 'react';
import spotify_logo from '../assets/images/spotify_logo_white.svg';
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react/dist/iconify.js';
import HoverText from '../components/shared/HoverText';
import { Link } from 'react-router-dom';

const focusCard = [
    {
        img: 'https://plus.unsplash.com/premium_photo-1664104722498-7fa26de2144d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Song One',
        description: 'This is a description for Song One.'
    },
    {
        img: 'https://plus.unsplash.com/premium_photo-1729640836925-c8996dbb87a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Song Two',
        description: 'This is a description for Song Two.'
    },
    {
        img: 'https://images.unsplash.com/photo-1728743264694-4ac39fa29385?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Song Three',
        description: 'This is a description for Song Three.'
    },
    {
        img: 'https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Song Four',
        description: 'This is a description for Song Four.'
    },
    {
        img: 'https://images.unsplash.com/photo-1729100125167-51168a81102d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Song Five',
        description: 'This is a description for Song Five.'
    }
];

export default function Home() {
  return (
    <div className="h-full w-full flex">
      <div className='h-full w-1/6 bg-black flex flex-col justify-between'>
      <div className="">
        <div className="logoDiv p-6">
          <img src={spotify_logo} alt="Spotify Logo" width={130} />
        </div>

        <div className="py-5">
        <IconText iconName="material-symbols:home" displayedText="Home" />
        <IconText iconName="material-symbols:search-rounded" displayedText="Search" active/>
        <IconText iconName="icomoon-free:books" displayedText="Library" />
        </div>

        <div className="py-5">
        <IconText iconName="icomoon-free:plus" displayedText="Create Playlist" />
        <IconText iconName="icomoon-free:heart" displayedText="Liked Songs " />

        </div>
      </div>
        <div className="px-5 pb-10 ">
            <div className="border flex  space-x-1 border-gray-400 rounded-full text-white w-2/5 px-2 py-1 items-center justify-center flex-row text-sm font-semibold cursor-pointer hover:border-white ">
                <div className="">
                <Icon icon="carbon:earth-europe-africa"/> </div>
                <div className="">English</div>
                
           
            </div>
        </div>
      
      </div>

      <div className='h-full w-full bg-gray-800  overflow-auto'>
        <div className="navbar w-full h-1/10 bg-black opacity-80 flex flex-row items-center justify-end">
            <div className="w-1/3    flex h-full">
                <div className="w-3/5 flex justify-around items-center">
                    <HoverText displayedText={"Premium"} />
                    <HoverText displayedText={"Support"} />
                    <HoverText displayedText={"Download"} />
                    <div className="h-1/2 border-r border-white "></div>
                </div>
                <div className='w-2/5 flex justify-around h-full items-center'>
                    <Link to={'/signup'}>
                    <HoverText displayedText={"Sing Up"} />
                    </Link>
                    <div className="bg-white h-2/3 py-5 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                    <Link to={'/login'}>
                        Log in
                    </Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="content p-8 overflow-auto"> 
            <PlaylistView title={"Focus"} cardData={focusCard}/>
            <PlaylistView title={"Spotify"} cardData={focusCard}/>
            <PlaylistView title={"Sound of India"} cardData={focusCard}/>

        </div>

      </div>
    </div>
  );
}

const PlaylistView = ({ title, cardData }) => {
    return (
        <div className='text-white mt-4 pt-0'>
            <div className="text-2xl font-semibold mb-5">{title}</div>
            <div className="w-full flex justify-between space-x-3">
                {Array.isArray(cardData) && cardData.length > 0 ? (
                    cardData.map((item, index) => (
                        <Card 
                            key={index}
                            title={item.title} 
                            description={item.description} 
                            imgUrl={item.img} 
                        />
                    ))
                ) : (
                    <div>No Songs Added</div>
                )}
            </div>
        </div>
    );
};

const Card = ({ title, description, imgUrl }) => {
    return (
        <div className='bg-black bg-opacity-50 w-1/5 p-2 py-4 rounded-lg cursor-pointer'>
            <img 
                className='rounded mb-3 h-48 w-full object-cover' 
                src={imgUrl} 
                alt="A description of the image" 
            />
            <div className="text-white text-xl font-bold">{title}</div>
            <div className="text-gray-300">{description}</div>
        </div>
    );
};
