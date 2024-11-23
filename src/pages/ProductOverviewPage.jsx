import React from 'react'

import Navbar from '../features/navbar/Navbar'
import ProductOverview from '../features/product-list/product/ProductOverview'

function ProductOverviewPage() {
  return (
    <div>
      <Navbar />
      <ProductOverview  />
    </div>
  )
}

export default ProductOverviewPage