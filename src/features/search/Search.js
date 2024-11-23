import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchFilteredProductsAsync, fetchSearchedProductsAsync, selectFilteredProducts, selectSearchedProducts } from './searchSlice'
import { FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

function Search() {
  const param = useParams()
  const dispatch = useDispatch()
  var products = useSelector(selectSearchedProducts)
  const total = products
  var products = useSelector(selectFilteredProducts)

  const allProducts = useSelector(selectSearchedProducts)
    useEffect(() => {
      dispatch(fetchSearchedProductsAsync(param.search))
    }, [param.search ])
    // console.log(products)

  const handleFilter = (e, section, option) => {
    // console.log(e.target.value, section, option)
    if (e.target.checked) {
      // console.log(section.id, option)
      dispatch(fetchFilteredProductsAsync({"product":total.products,"filter": section.id,"option": option}))
    }
    else{
      dispatch(fetchSearchedProductsAsync(param.search))
    }

  }
  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: products?.category
    },
    {
      id: 'brand',
      name: 'Brands',
      options: products?.brands
    },
  ];
    

    return (

      <div className="bg-white">
      {products?.products && (
        <div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mt-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {products?.products?.length} Products
            </h1>

            <div className="flex items-center">

              <button
                type="button" 
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                // onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter handleFilter={handleFilter} filters={filters}></DesktopFilter>
              {/* Product grid */}
              <div className="lg:col-span-3">
              <div>
            {products && (
              <section class="text-gray-600 body-font">
              <div class="container px-5 py-12 mx-auto" bis_skin_checked="1">
                <div class="flex flex-wrap " bis_skin_checked="1">
                  {products.products.map((products) => (
                    <Link to={"/product/"+products.id} class="lg:w-1/3 md:w-1/2 p-4 w-full" bis_skin_checked="1">
                    <a class="block relative h-72 border rounded-xl overflow-hidden">
                      <img alt="ecommerce" class="w-full h-full " src={products.thumbnail}></img>
                    </a>
                    <div class="mt-4" bis_skin_checked="1">
                      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{products.category}</h3>
                      <h2 class="text-gray-900 title-font text-lg font-medium">{products.title}</h2>
                      <p class="mt-1">${products.price}</p>
                    </div>
                  </Link>
                  ))}
                  
                </div>
              </div>
            </section>
            )
            }
          </div>
              </div>
              {/* Product grid end */}
            </div>
          </section>

          {/* section of product and filters ends */}
          {/* <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
            filters={filters}
          ></Pagination> */}
        </main>
      </div>
      )}
      </div>

    )
  }

function DesktopFilter({ handleFilter ,filters}) {
  const products = useSelector(selectSearchedProducts)
  return (
    <div>
      {products && (
      <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
               
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        // onClick={() => setPage(1)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
    )
  }
    </div>

  );
}
  

export default Search