import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div id='hero' className='relative'>
            <img src={assets.bottom_banner} alt='Banner' className='w-full h-150 hidden md:block opacity-20'></img>
            <img src={assets.main_banner_bg_sm} alt='Banner' className='w-full h-150 md:hidden opacity-20'></img>
            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24 gap-2'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-140 leading-tight lg:leading-15'>"اطلبوا العلم، فإن طلبه لله عبادة" <br></br>
                    "Seek knowledge, for seeking it for Allah’s sake is an act of worship." 
                    — Imam Ahmad ibn Hanbal رحمه الله</h1>

                <div className='flex items-centermt-6 font-medium text-white'>
                    <Link to={"/books"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
                        Browse Now!
                        <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
                    </Link>
                    <Link to={"/books"} className='group hidden md:flex items-center gap-2 px-7 md:px-9 py-3 cursor-pointer'>
                        Seek Knowledge!
                        <img className='transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default MainBanner