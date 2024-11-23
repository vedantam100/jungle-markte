import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSelectedProductAsync } from '../productListSlice'; // Import the thunk action creator
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { selectSelectedProduct } from '../productListSlice';
import { selectCheckUser } from '../../auth/authSlice';
import { addToCartAsync, selectItems } from '../../cart/cartSlice';

const ProductOverview = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectItems);
    const product = useSelector(selectSelectedProduct);
    const user = useSelector(selectCheckUser) 
    // console.log(user)
    // console.log(product);
    const { id } = useParams();
    // const [totalQuantity, settotalQuantity] = useState(0)

  // useEffect(() => {
    
  // }, [cartItems])
  
 
    useEffect(() => {
      dispatch(fetchSelectedProductAsync(id));
    }, [dispatch, id]);
  
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      if (product) {
        setLoading(false);
      }
    }, [product]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  // console.log(product);
  let img1 = product.thumbnail;
  let img2 = product.thumbnail;
  let img3 = product.thumbnail;
  let img4 = product.thumbnail;
  
  if (product.images && product.images[0]) {
    img1 = product.images[0];
  }
  
  if (product.images && product.images[1]) {
    img2 = product.images[1];
  }
  
  if (product.images && product.images[2]) {
    img3 = product.images[2];
  }
  
  if (product.images && product.images[3]) {
    img4 = product.images[3];
  }
  const handleCart = (e) => {
    // console.log("gyo");
    e.preventDefault();
    if (user && user?.id) {
      dispatch(addToCartAsync({ ...product, quantity: 1, userId: user.id }));
      console.log("here")
    } else {
      console.error('User or user ID is null or undefined.');
    }
  };
  if(cartItems){
    // console.log(cartItems.filter(item => item.title === product.title));
    console.log(cartItems)
    const item =  cartItems.filter(item => {
      // Check if both item and product have _id properties
      if (item?._id && product?._id) {
          return item._id === product._id;
      }
      return false;
  });
    if(item.length>0){
      // console.log("here again")
      var cartIt = item[0].quantity+item.length-1;
      // console.log(cartItems)
      
    }
    else{
      // console.log("here again1")
      var cartIt = 0;
    }
  }

  return (
    
        <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div class="flex justify-center items-center lg:flex-row flex-col gap-8">
       
                <div class="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                    <p class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600  dark:text-gray-600">Home / {product.category} / {product.title} </p>
                    <h2 class="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-gray-600 mt-4">{product.title}</h2>
      
                    <div class="flex flex-row justify-between mt-5">
                       <img class="" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg1.svg" alt="stars"/>
                       <img class="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg1dark.svg" alt="stars"/>
                        <div class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 text-gray-700 hover:underline hover:text-gray-800  duration-100 cursor-pointer font-extrabold flex gap-2">{product.rating} <FaStar /> </div>
                    </div>
      
                    <p class="font-normal text-base leading-6 text-gray-600  mt-7"> {product.description} </p>
                    <div className='flex justify-between'>
                    <p class="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 dark:text-gray-600">$ {Math.round(product.price*(1-(product.discountPercentage/100)))} </p>
                    <p class="font-semibold lg:text-lg text-lg lg:leading-6 leading-5 mt-6 dark:text-red-900"> Off {product.discountPercentage}%</p>
                    </div>
                    <p class="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 dark:text-gray-600 line-through">$ {product.price} </p>

      
                    <div class="lg:mt-11 mt-10">
                        <div class="flex flex-row justify-between">
                            <p class="font-medium text-base leading-4 text-gray-600 ">Cart quantity</p>
                            <div class="flex">
                                {/* <div onclick="minus()" class="focus:outline-none dark:text-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center m-auto ">-</div> */}
                                <input id="counter" aria-label="input" class="border dark:text-gray-600 border-gray-300 dark:bg-transparent h-full text-center w-14 pb-1" type="text" value={cartIt} />
                                {/* <div onclick="plus()" class="focus:outline-none dark:text-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center m-auto ">+</div> */}
                            </div>
                        </div>
                        <hr class="bg-gray-200 w-full my-2" />
                        <div class="flex flex-row justify-between items-center mt-4">
                            <p class="font-medium text-base leading-4 text-gray-600 ">In Stock</p>
                            <p> {product.stock} </p>
                            </div>
                        <hr class="bg-gray-200 w-full mt-4" />
                    </div>
      
                    <button 
                    onClick={handleCart}
                    class="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6">Add to shopping bag</button>
                </div>
      
                <div class="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                    <div class="w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
                        <img src={img1} alt="Wooden Chair Previw" />
                    </div>
                    <div class="w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                        <div class="bg-gray-100 flex justify-center items-center py-4">
                            <img src={img2} alt="Wooden chair - preview 1" />
                        </div>
                        <div class="bg-gray-100 flex justify-center items-center py-4">
                            <img src={img3} alt="Wooden chair - preview 2" />
                        </div>
                        <div class="bg-gray-100 flex justify-center items-center py-4">
                            <img src={img4} alt="Wooden chair- preview 3" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      
      
    
  );
};

export default ProductOverview;