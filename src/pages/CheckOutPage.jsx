import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUserCartAsync, fetchItemByUserIdAsync, selectItems, updateUserAsync } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectCheckUser } from '../features/auth/authSlice';
import { createOrderAsync, selectCurrentOrder, selectOrders} from '../features/order/orderSlice';
import { v4 as uuidv4 } from 'uuid';

function CheckOutPage() {
    const [checkedPerson, setCheckedPerson] = useState(null);
    const cartItems = useSelector(selectItems);
    const [totalCost, setTotalCost] = useState(0);
    const user = useSelector(selectCheckUser)
    const dispatch = useDispatch()
    const [TotalQuantity, setTotalQuantity] = useState(0);
    const [orderDetails, setOrderDetails] = useState({})
    const navigate = useNavigate();
    const [orderId, setorderId] = useState(1)
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const [MRP, setMRP] = useState(0)
    
    if (cartItems.length === 0) {
        navigate('/');
        }
    useEffect(() => {
      dispatch(fetchItemByUserIdAsync(user.id));
    }, [])
    

    // const orderId = uuidv4()
    
    useEffect(() => {
        let totalPrice = 0;
        let totalQuantity = 0;
        let mrp = 0;
        cartItems.forEach((item) => {
            const discountedPrice = item.price * (1 - item.discountPercentage / 100);
            mrp += item.price*item.quantity
            totalPrice += discountedPrice * item.quantity;
            totalQuantity += item.quantity;
        });

        setTotalCost(totalPrice);
        setTotalQuantity(TotalQuantity);
        setorderId(uuidv4())
        setMRP(mrp);
    }, [cartItems]);

    console.log(checkedPerson);
    // console.log(checkedPerson);
    const handleRadioClick = () => {
        setOrderDetails({"id":orderId,"user":user, "addresses":checkedPerson, "items":cartItems , "timestamp" : formattedDate , "cost": {"mrp":MRP , "totalprice": totalCost}, "status": "pending"})
    };

    const consolidateCartItems = (cartItems) => {
        const consolidatedItems = [];
        const titleMap = {};

        cartItems.forEach((item) => {
            if (titleMap[item.title]) {
                // If title already exists in map, update its quantity
                titleMap[item.title].quantity += item.quantity;
            } else {
                // If title doesn't exist, add it to map and push it to consolidatedItems
                titleMap[item.title] = { ...item };
                consolidatedItems.push(titleMap[item.title]);
            }
        });

        return consolidatedItems;
    };

    const cartItemsConsolidated = consolidateCartItems(cartItems);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        if(data.remember){
            dispatch(updateUserAsync({id: user.id , addresses:[...user.addresses,data]}));
        }
        dispatch(createOrderAsync({"id":orderId,"user":user, "addresses":data, "items":cartItems, "timestamp" : formattedDate, "cost": {"mrp":MRP , "totalprice": totalCost},"status": "pending"}))
        dispatch(deleteUserCartAsync(user.id));
        dispatch(fetchItemByUserIdAsync(user.id));
        navigate(`/orderSuccessfull/${orderId}`)
        reset(); 

    };

    const handleOutsideSubmit = () => {
        if (checkedPerson){
            setOrderDetails({"id":orderId,"user":user, "addresses":checkedPerson, "items":cartItems , "timestamp" : formattedDate , "cost": {"mrp":MRP , "totalprice": totalCost}, "status": "pending"})
            dispatch(createOrderAsync({"id":orderId,"user":user, "addresses":checkedPerson, "items":cartItems , "timestamp" : formattedDate , "cost": {"mrp":MRP , "totalprice": totalCost}, "status": "pending"}))
            dispatch(deleteUserCartAsync(user.id));
            navigate(`/orderSuccessfull/${orderId}`)
        }
        else{
            
            handleSubmit(onSubmit)();
           
        }
    };  
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }


    
  return (

    <div class="container p-12 mx-auto">
            <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div class="flex flex-col md:w-full">
                    <h2 class="mb-4 font-bold md:text-xl text-heading ">Shipping Address
                    </h2>
                    <form class="justify-center w-full mx-auto" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div class="">
                            <div class="space-x-0 lg:flex lg:space-x-4">
                            <div class="w-full lg:w-1/2">
                                <label for="firstName" class="block mb-3 text-sm font-semibold text-gray-500">First Name</label>
                                <input 
                                id='firstname'
                                    {...register("firstName", { 
                                        required: "First Name Is Required", 
                                    })}
                                    type="text" 
                                    placeholder="First Name" 
                                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                            </div>

                                <div class="w-full lg:w-1/2 ">
                                    <label for="firstName" class="block mb-3 text-sm font-semibold text-gray-500">Last
                                        Name</label>
                                        <input 
                                        id='secondname'
                                    {...register("secondtName", { 
                                        required: "Second Name Is Required", 
                                    })}
                                    type="text" 
                                    placeholder="Second Name" 
                                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-full">
                                    <label for="Email" class="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                    <input
                                        id="email"
                                        {...register("email", { 
                                        required: "Email Is Required", 
                                        pattern: {
                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Invalid email address"
                                        } 
                                        })}
                                        placeholder='Email'
                                        type="email"/>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-full">
                                    <label for="Address" class="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                    <textarea
                                        class="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                         cols="20" rows="4" placeholder="Address"
                                         {...register("Address", { 
                                            required: "Address Is Required", 
                                            })}
                                        
                                    ></textarea>
                                </div>
                            </div>
                            <div class="space-x-0 lg:flex lg:space-x-4">
                                <div class="w-full lg:w-1/2">
                                    <label for="city" class="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                    <input 
                                        type="text" 
                                        {...register("City", { 
                                            required: "City Is Required", 
                                        })}
                                        placeholder="City"
                                        class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    />
                                </div>
                                <div class="w-full lg:w-1/2 ">
                                    <label for="postcode" class="block mb-3 text-sm font-semibold text-gray-500">
                                        Postcode</label>
                                    <input 
                                        type="text" 
                                        {...register("PostCode", { 
                                            required: "PostCode Name Is Required", 
                                        })}
                                        placeholder="Post Code"
                                        class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                            <div class="flex items-center mt-4">
                                <label class="flex items-center text-sm group text-heading">
                                    <input type="checkbox"
                                    {...register("remember")}
                                        class="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                                    />
                                    <span class="ml-2">Save this information for next time</span>
                                </label>
                            </div>
                            <div class="relative pt-3 xl:pt-6">
                                <label for="note" class="block mb-3 text-sm font-semibold text-gray-500"> Notes (Optional)</label>
                                <textarea 
                                    class="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    rows="4" 
                                    placeholder="Notes for delivery"
                                    {...register("Message")}
                                ></textarea>
                            </div>
                            <ul role="list" className="divide-y divide-gray-100">
                                {user.addresses.map((person) => (
                                    <label key={person.email} className="flex items-center justify-between gap-x-6 py-5">
                                        <input
                                            type="radio"
                                            id={person.email} // Use a unique identifier for each person
                                            name="radioGroup"
                                            defaultChecked={false}
                                            // checked={checkedPerson === person} // Check if the current person is checked
                                            onClick={(e) => {
                                                if (e.target.checked) {
                                                    // console.log("hola");
                                                    setCheckedPerson(person);
                                                }
                                                else{
                                                    setCheckedPerson(null);
                                                }
                                                handleRadioClick();
                                            }} 
                                        />
                                        <div className="flex min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.firstName +" "+ person.secondtName}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-center w-1/2">
                                            <p className="text-sm leading-6 text-gray-900">{person.Address}</p>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">{person.City}</p>
                                            <p className="text-sm leading-6 text-gray-900">{person.PostCode}</p>
                                        </div>
                                    </label>
                                ))}
                            </ul>
                        </div>
                </form>

                </div>
                <div class="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                    <div class="pt-12 md:pt-0 2xl:ps-4">
                        <h2 class="text-xl font-bold">Order Summary
                        </h2>
                        <div class="mt-8">
                            <div class="flex flex-col space-y-4">
                                {cartItems.map((item) =>
                                <div class="flex space-x-4">
                                <div className='w-60 h-30'>
                                    <img src={item.thumbnail} alt=""
                                        />
                                </div>
                                <div>
                                    <h2 class="text-xl font-bold">{item.title}</h2>
                                    <p class="text-sm">Quantity {item.quantity} </p>
                                    <span class="text-red-600">Price</span> ${item.price * (1 - item.discountPercentage / 100).toFixed(0)}
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            )

                                }
                                
                            </div>
                        </div>
                        <div class="flex p-4 mt-4">
                            <h2 class="text-xl font-bold">ITEMS {TotalQuantity}</h2>
                        </div>
                        <div
                            class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Subtotal<span class="ml-2">${totalCost.toFixed(0)} </span></div>
                        <div
                            class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Shipping Tax<span class="ml-2">$10</span></div>
                        <div
                            class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Total<span class="ml-2">${(totalCost+10).toFixed(0)}</span></div>
                    </div>
                    <div class="mt-4">
                                <button
                                    class="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900" type='submit' onClick={handleOutsideSubmit} >Pay Now</button>
                            </div>
                            <Link to="/" class="flex font-semibold text-indigo-600 text-sm mt-10">
        
                                <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                                Continue Shopping
                            </Link>
                </div>
            </div>
    
            
  
    </div>
  )
}

export default CheckOutPage