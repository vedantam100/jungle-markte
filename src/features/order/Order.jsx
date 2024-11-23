import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrderByIdAsync, selectallOrders } from './orderSlice';
import { selectCheckUser } from '../auth/authSlice';
import { Link } from 'react-router-dom';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
// import { useEffect } from 'react';

const Order = () => {
  const allOrders = useSelector(selectallOrders);
  const dispatch = useDispatch();
  const user = useSelector(selectCheckUser);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [check, setcheck] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await dispatch(fetchAllOrderByIdAsync(user.id));
      setLoading(false);
    };

    fetchOrders();
  }, [dispatch, user.id]);

  useEffect(() => {
    if(allOrders){

      if(allOrders.length > 0){
        setOrders(allOrders);
      }
    }
  }, [allOrders]);
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
useEffect(() => {
  if(allOrders){

    setcheck(allOrders?.length || 0)
  }
}, [allOrders])

console.log(check)

// console.log(check)
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        check ? (
          orders.map((order) => (
            <div key={order.id}>
              <Link to={`/orderSuccessfull/${order.id}`}>
              <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Order # {digitSum(order.id)}
            </h1>
             <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Order Status : {order.status}
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.title}</a>
                          </h3>
                          <p className="ml-4">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty :{item.quantity}
                          </label>

                        </div>

                        <div className="flex">

                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {(order.cost.totalprice).toFixed(0)}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{order.items.length} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping Address :
            </p>
            <div
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                  >
                    <div className="flex gap-x-4">

                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.addresses.firstName+ " "+ order.addresses.secondtName}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.addresses.Address}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.addresses.PostCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Email: {order.addresses.email}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {order.addresses.City}
                      </p>
                    </div>
                  </div>

          </div>
        </div>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center ">
          <div className="">
              <div className='flex items-center justify-center m-20'><MdOutlineRemoveShoppingCart size={200} /></div>
              <div className='flex items-center justify-center m-10 text-5xl font-mono'>No Pending Orders</div>
              <div className='flex items-center justify-center m-10'>
                <Link to={"/"} class="relative inline-flex w-5/6 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span class="relative px-5 py-2.5 w-full flex justify-center items-center  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl font-mono">
                    Continue Shopping
                  </span>
                </Link>
              </div>
          </div>
        </div>
        )
      )}
    </div>
  )
}


export default Order;