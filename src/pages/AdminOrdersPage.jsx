import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Orders from '../features/adminproductlist/Orders'

function OrdersPage() {
  return (
    <div>
        <Navbar>
            <Orders/>
        </Navbar>
    </div>
  )
}

export default OrdersPage