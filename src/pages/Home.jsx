import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/product/ProductList'

function Home() {
  return (
    <div><Navbar />
            <ProductList/>
    </div>
  )
}

export default Home