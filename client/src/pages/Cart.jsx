import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAppContext } from '../context/Appcontext'
import { dummyAddress } from '../assets/assets'
import ImageSlider from '../components/ImageSlider'

const Cart = () => {
    const [showAddress, setShowAddress] = React.useState(false)
    const { products, currency, cartItems, removeFromCart, updateCartItem, navigate, getCartCount, getCartAmount } = useAppContext()
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");

    const getCart = () => {
        let tempArray = []
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key)
            product.quantity = cartItems[key]
            tempArray.push(product)
        }
        setCartArray(tempArray)
    }

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems])

    const placeOrder = async ()=> {

    }


    // const staticProducts = [
    //     { name: "Running Shoes", description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"], offerPrice: 250, price: 200, quantity: 1, size: 42, image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png", category: "Footwear", },
    //     { name: "Running Shoes", description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"], offerPrice: 250, price: 200, quantity: 1, size: 42, image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png", category: "Footwear", },
    //     { name: "Running Shoes", description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"], offerPrice: 250, price: 200, quantity: 1, size: 42, image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png", category: "Footwear", },
    // ]
    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-24 text-white">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{`${getCartCount()} items`}</span>
                </h1>



                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="cursor-pointer w-16 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img onClick={() => { navigate(`/books/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-400">
                                    <p>Category: <span>{product.category || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={e => updateCartItem(product._id, Number(e.target.value))} value={cartItems[product._id]} className='outline-none'>
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button onClick={() => navigate("/books")} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <svg className='group-hover:-translate-x-1 transition' width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-800">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : `No address found`}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses.map((address, index)=>(<p onClick={() => {setSelectedAddress(address); setShowAddress(false)}} className="text-gray-800 p-2 hover:bg-gray-100">
                                    {address.street}, {address.city}, {address.state}, {address.country} 
                                </p>))}
                                <p onClick={() => navigate("/add-address")} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value) } className="w-full text-black border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-800 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{(getCartAmount() * 2 / 100)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
        
    ) : null
}

export default Cart