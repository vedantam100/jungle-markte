import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemFromCartAsync, selectItems } from './cartSlice';
import { selectCheckUser } from '../auth/authSlice';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  var cartItems = useSelector(selectItems);
  const user = useSelector(selectCheckUser);

  if (cartItems === undefined) {
    cartItems = [];
  }

  const [totalCost, setTotalCost] = useState(0);
  const [TotalQunatity, setTotalQunatity] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100);
      totalPrice += discountedPrice * item.quantity;
      totalQuantity += item.quantity;
    });

    // Set the total cost state
    setTotalCost(totalPrice);
    setTotalQunatity(totalQuantity);
  }, [cartItems]);

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync({ itemId: id, user: user.id }));
  };


  const consolidateCartItems = (cartItems) => {
    const consolidatedItems = [];
    const titleMap = {};
  
    cartItems.forEach((item) => {
      if (titleMap[item.title]) {
        // If title already exists in map, update its quantity
        titleMap[item.title].quantity = item.quantity;
      } else {
        titleMap[item.title] = { ...item };
        consolidatedItems.push(titleMap[item.title]);
      }
    });
  
    return consolidatedItems;
  };
  cartItems = consolidateCartItems(cartItems);
  


  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100);
      totalPrice += discountedPrice * item.quantity;
      totalQuantity += item.quantity;
    });

    // Set the total cost state
    setTotalCost(totalPrice);
    setTotalQunatity(totalQuantity);
  }, [cartItems]);
  
  return (
    <>
      {cartItems?.length > 0 ? (
        <div class="container mx-auto mt-10">
          <div class="flex shadow-md my-10">
        <div class="w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-2xl">Shopping Cart</h1>
            <h2 class="font-semibold text-2xl">{cartItems.length} Products</h2>
          </div>
          <div class="flex mt-10 mb-5">
            <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Quantity</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Price</h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Total</h3>
          </div>
          {cartItems.map((item) => (
            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img class="h-24" src={item.thumbnail} alt=""/>
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">{item.title}</span>
                  <span class="text-red-500 text-xs">{item.brand}</span>
                  <a 
                  onClick={e=>{handleRemove(e, item.id)}}
                  class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <input class="mx-2 border text-center w-1/3" type="text" value={item.quantity}/>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">${(item.price * (1 - (item.discountPercentage / 100))).toFixed(0)}</span>
              <span class="text-center w-1/5 font-semibold text-sm">${(item.price * (1 - (item.discountPercentage / 100))).toFixed(0)*item.quantity}</span>
            </div>
          ))}

          <Link to="/" class="flex font-semibold text-indigo-600 text-sm mt-10">
        
            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" class="w-1/4 px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-sm uppercase">Quantity {TotalQunatity} </span>
            <span class="font-semibold text-sm">${totalCost.toFixed(0)}</span>
          </div>
          <div>
            <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select class="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div class="py-10">
            <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full"/>
          </div>
          <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
          <div class="border-t mt-8">
            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${totalCost.toFixed(0)}</span>
            </div>
            <Link to="/checkout">
            <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
         
            </Link>
             </div>
        </div>

      </div>
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          <div className="">
              <div className='flex items-center justify-center m-20'><MdOutlineRemoveShoppingCart size={200} /></div>
              <div className='flex items-center justify-center m-10 text-5xl font-mono'>Nothing In Cart</div>
              <div className='flex items-center justify-center m-10'>
                <Link to={"/"} class="relative inline-flex w-5/6 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span class="relative px-5 py-2.5 w-full flex justify-center items-center  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-xl font-mono">
                    Continue Shopping
                  </span>
                </Link>
              </div>
          </div>
      </div>
      )}
    </>
  );
};

export default Cart;

