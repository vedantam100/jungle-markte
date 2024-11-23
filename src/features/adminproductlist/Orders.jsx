import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrderAsync, fetchUpdatedOrderAsync, selectTotalOrders, selectupdateOrder } from '../order/orderSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { MdEdit } from "react-icons/md";

function Orders() {
  const [editView, setEditView] = useState(false)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  var orders = useSelector(selectTotalOrders)
  const [workingOrder, setWorkingOrder] = useState(null)
  const update = useSelector(selectupdateOrder)

  
  const handleEdit = (order) => {
  setEditView(!editView); 

  setWorkingOrder(order)
  if(editView==true){
    setWorkingOrder(null);
  }
  };
  
  // useEffect(() => {
  //   if(orders){
  //     // console.log(typeof(orders))
  //     orders=[...orders].reverse()
  //   }
  // }, [orders])
  


  useEffect(() => {
    dispatch(fetchAllOrderAsync())
  }, [dispatch,update])
  const handleID = (id)=>{
    Navigate(`/orderSuccessfull/${id}`)
  }
  const digitSum = (numberString) =>{ 
    if (typeof numberString !== 'string' || numberString.length === 0) {
        return 0; 
    }
    let sum = 0;
    for (let i = 0; i < numberString.length; i++) {
        const digit = parseInt(numberString[i]);
        if (!isNaN(digit)) {
            sum += digit;
        }
    }
    return sum;
}
const handleChange = (change) => {
  if (workingOrder) {
    console.log({"id": workingOrder.id});
    dispatch(fetchUpdatedOrderAsync({"id": workingOrder.id, "status": change}));
    setWorkingOrder(null);
  } else {
    console.error("workingOrder is null or undefined");
  }
}
// console.log(orders)

  return (
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Products Oder</h2>
            <span className="text-xs">All products item</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="search..."
              />
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-5 py-3 border-b-2 w-1/4 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Placed
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Shiping Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {orders?.map((order) => (
                  <tr key={order.id} >
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center" onClick={()=>handleID(order.id)}>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {digitSum(order.id)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    
                      {order.items.map(item =>(
                        <p className="text-gray-900 whitespace-no-wrap m-1">
                        {item.title}
                        </p>
                      ))}
                    
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">$ {(order.cost.totalprice).toFixed(0)} </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{order.timestamp} </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.addresses?.firstName+" "+order.addresses?.secondtName+", "+order.addresses?.email} </p>
                    <p className="text-gray-900 whitespace-no-wrap">{order.addresses?.Address+", "+order.addresses?.City+", "+order.addresses?.PostCode} </p>
                  </td>

                  {workingOrder==order ? (
                    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm z-50 absolute">
                    <div class="relative inline-block text-left">
                    <div>
                      <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
                        
                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div class="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu" tabindex="-1">
                      <div class="py-1 z-50" role="none">
                        <div onClick={()=>handleChange("Pending")} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Pending </div>
                        <div onClick={()=>handleChange("Arrived")} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Arrived</div>
                        <div  onClick={()=>handleChange("Dispatch")} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Dispatch</div>
                      </div>
                    </div>
                  </div>

                  </td>
                  ):(
                    <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden=""
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      />
                      <span className="relative">{order.status}</span>
                    </span>
                  </td>
                  )}
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" onClick={()=>handleEdit(order)}>
                      <span
                        aria-hidden=""
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      />
                      <span className="relative">
                      <MdEdit size={22} />
                      </span>
                    </span>
                  </td>
                </tr>
                ))}

                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
  )
}

export default Orders