import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/adminproductlist/product/AdminProductList'

function AdminHome() {
  return (
    <div><Navbar />
            <AdminProductList/>
    </div>
  )
}

export default AdminHome