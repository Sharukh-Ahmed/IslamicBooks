import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Appcontext';
import { dummyOrders } from '../assets/assets';
import toast from 'react-hot-toast';

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);
    const { currency, axios } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/user')
            if (data.success) {

                setMyOrders(data.orders)

            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchMyOrders();

    }, [myOrders])

    return (
        <div className='mt-28 pb-16 text-white'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            {myOrders.map((order, index) => (
                <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-gray-400'>
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span className='text-primary text-lg font-medium'>Total Amount : {currency}{order.amount}</span>
                    </p>
                    {order.items.map((item, index) => (
                        <div key={index} className={`relative bg-black text-gray-500/70 ${order.items.length !== index + 1 && "border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
                            <div className='flex items-center mb-4 md:mb-0'>
                                <div className='bg-primary/10 p-4 rounded-lg'>
                                    <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                                </div>
                                <div>
                                    <h2 className='text-xl font-medium text-white'>{item.product.name}</h2>
                                    <p>Category: {item.product.category}</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                <p>Quantity: {item.quantity || "1"}</p>
                                <p>Status: {order.status}</p>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p className='text-gray-400'>
                                Amount: {currency}{item.product.offerPrice * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default MyOrders