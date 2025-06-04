import React, { useEffect, useState } from "react";
import { assets, features } from '../assets/assets'
import { Link } from 'react-router-dom'


const BottomBanner = () => {

  return (
    <div className='relative mt-24'>
        <img src={assets.main_banner_bg} alt='Banner' className='w-full h-150 hidden md:block opacity-10'></img>
        <img src={assets.main_banner_bg_sm} alt='Banner' className='w-full h-150 md:hidden opacity-10'></img>
        <div className="absolute inset-0 flex flex-col items-center md:justify-center pt-16 md:pt-0 md:pr-24 md:pl-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">Why Read Books?</h1>
            {features.map((feature, index)=> (
              <div key={index} className="flex items-center text-white gap-4 mt-2">
                <h2 className="md:w-11 w-9">{feature.icon}</h2>
                <div className="w-full">                
                  <h3 className="text-lg md:text-xl font-semibold text-primary">{feature.title}</h3>
                  <h3 className="text-md font-semibold">{feature.description}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
)

}

export default BottomBanner
