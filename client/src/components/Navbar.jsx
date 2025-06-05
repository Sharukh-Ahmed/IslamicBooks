import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/Appcontext.jsx'

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount } = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate('/')
    }

    useEffect(()=> {
        if(searchQuery.length > 0){
            navigate("/books")
        }
    }, [searchQuery])

    return (
        <nav className="fixed top-0 left-0 right-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 shadow-lg shadow-black/90 bg-black/90 transition-all">

            <div onClick={() => setOpen(false)} className='flex items-center gap-3'>
                <NavLink to='/' >
                    <img className='h-9' src="/Site Logo.png" alt="dummyLogoColored"></img>
                </NavLink>
                <NavLink to='/' className='text-3xl text-primary'>ISLAMIC BOOKS
                </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 text-white ">
                <NavLink to='/' className='hover:text-primary hover:text-shadow-lg hover:text-shadow-gray-400/50 transition-all duration-300'>Home</NavLink>
                <NavLink to='/books' className='hover:text-primary hover:text-shadow-lg hover:text-shadow-gray-400/50 transition-all duration-300'>All Books</NavLink>
                <NavLink to='/about' className='hover:text-primary hover:text-shadow-lg hover:text-shadow-gray-400/50 transition-all duration-300'>About</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search Books" />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4'></img>
                </div>

                <div onClick={() => navigate("cart")} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {!user ? (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-full">
                    Login
                </button>) : (
                    <div className='relative group'>
                        <img src={assets.profile_icon} alt='profile_icon' className='w-10 hover:cursor-pointer'></img>
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-gray-500 shadow-border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                            <li onClick={() => { navigate("my-orders") }} className='p-1.5 pl-3 hover:bg-primary/30 cursor-pointer'>My Orders</li>
                            <li onClick={() => { navigate("/seller") }} className='p-1.5 pl-3 hover:bg-primary/30 cursor-pointer'>Seller?</li>
                            <li onClick={logout} className='p-1.5'><button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-full">
                                Logout
                            </button></li>
                        </ul>
                    </div>
                )}


            </div>

            <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={() => navigate("cart")} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#F97316" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#F97316" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#F97316" />
                </svg>
            </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to='/books' onClick={() => setOpen(false)}>All Books</NavLink>
                    {user &&
                        <NavLink to='/my-orders' onClick={() => setOpen(false)}>My Orders</NavLink>
                    }
                    <NavLink to='/seller' onClick={() => setOpen(false)}>Seller?</NavLink>

                    {!user ? (<button onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true);
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>) : (<button
                        onClick={logout}
                        className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Logout
                    </button>)}

                </div>)}

        </nav>
    )
}

export default Navbar