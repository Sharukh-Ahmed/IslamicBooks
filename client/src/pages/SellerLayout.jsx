import React from 'react'
import { useAppContext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import { NavLink, Outlet, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SellerLayout = () => {

    const { axios, navigate } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message)
                navigate('/')
            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    const sidebarLinks = [
        { name: "Add product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    return (<>
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
                        className={({ isActive }) => `flex items-center py-3 px-4 gap-3 ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                            : "hover:bg-primary/10 border-primary hover:border-r-[6px]"
                            }`
                        }
                    >
                        <img src={item.icon} alt="" className='w-7 h-7' />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet />
        </div>

    </>
    );
}

export default SellerLayout