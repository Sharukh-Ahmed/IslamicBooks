import React from 'react'
import Navbar from "./components/Navbar.jsx"
import MainBanner from './components/MainBanner.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/Appcontext.jsx'
import Login from './components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'
import SellerLayout from './pages/SellerLayout.jsx'
import AddProduct from './components/seller/AddProduct.jsx'
import ProductList from './components/seller/ProductList.jsx'
import Orders from './components/seller/Orders.jsx'
import About from './pages/About.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import NeedHelp from './pages/NeedHelp.jsx'
import  Contact  from './pages/Contact.jsx'
import FAQs from './pages/FAQs.jsx'

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin, isSeller} = useAppContext();

  return <div className='text-default min-h-screen text-gray-700'>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}

      <Toaster/>

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/books' element={<AllProducts/>}/>
          <Route path='/books/:category' element={<ProductCategory/>}/>
          <Route path='/books/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/need-help" element={<NeedHelp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
            <Route index element={isSeller ? <AddProduct/> : null}/>
            <Route path='product-list' element={<ProductList/>}/>
            <Route path='orders' element={<Orders/>}/>
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
      </div>
}

export default App