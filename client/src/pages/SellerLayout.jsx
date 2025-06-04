import React from 'react'
import { useAppContext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import { NavLink, Outlet, Link } from 'react-router-dom';

const SellerLayout = () => {

    const {setIsSeller} = useAppContext();

    // const dashboardicon = (
    //     <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    //         <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
    //     </svg>
    // );

    // const overviewicon = (
    //     <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    //         <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z" />
    //     </svg>
    // );

    // const chaticon = (
    //     <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    //         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    //     </svg>
    // );

    const logout = async() => {
        setIsSeller(false);
    }

    const sidebarLinks = [
        { name: "Add product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    return ( <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <div className='flex items-center gap-2'>
                <NavLink to='/' >
                    <img className="cursor-pointer w-24 md:w-28" src="/Site Logo.png" alt="Logo" />
                </NavLink>
                <NavLink to='/' className='text-3xl text-primary'>ISLAMIC BOOKS
                </NavLink>
                </div>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1 hover:cursor-pointer hover:bg-primary hover:text-white transition'>Logout</button>
                </div>
            </div>
            <div className='flex bg-white'>
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                        className={({isActive}) => `flex items-center py-3 px-4 gap-3 ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-primary/10 border-primary hover:border-r-[6px]"
                            }`
                        }
                    >
                        <img src={item.icon} alt="" className='w-7 h-7'/>
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet/>
            </div>
            
        </>
    );
}

export default SellerLayout