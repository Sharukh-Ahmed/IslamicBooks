import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Appcontext'
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const AllProducts = () => {

    const {products, searchQuery, loadingProducts} = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(()=> {
        if(searchQuery.length > 0){
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        }else {
            setFilteredProducts(products)
        }
    }, [products, searchQuery])

  return (
    <div className='mt-28 flex flex-col text-white'>
      {loadingProducts ? (
        <div className='flex flex-col items-center justify-center h-[60vh]'>
          <Loading />
          <p className='mt-6 text-lg font-semibold text-primary'>Loading books for you!</p>
        </div>
      ) : (
        <>
          <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Books</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
          </div>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 mt-6'>
            {filteredProducts.filter((product)=> product.inStock).map((product, index)=> (
              <ProductCard key={index} product={product}/>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AllProducts