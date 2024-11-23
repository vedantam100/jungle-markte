import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { checkUserAsync, selectCheckUser } from '../authSlice';
import CryptoJS from 'crypto-js';
import logo from '../../../Assests/logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation(); 
  const redirect = location.state ? location.state.redirect : null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(checkUserAsync({email: data.email, password: CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex)}));
  };

  const user = useSelector(selectCheckUser);

  if (user?.email) {
    if (redirect && redirect !== "/Logout" && redirect !== "/Login"&& redirect !== "/login") {
      console.log("first",redirect)
      return <Navigate to={redirect} />;
    }
  
    else{
      console.log("why")
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* {user?.email && (
        <Navigate to="/" />
      )} */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
        <img
          className="mx-auto h-64 w-auto"
          src={logo}
          alt="Your Company"
        />
      </Link>
          <h2 className="-mt-16 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email", { 
                  required: "Email Is Required", 
                  pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address"
                  } 
                })}
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", { required: "Password Is Required" })}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
          </div>
        </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signup here
            </Link>
          </p>
          <p className="mt-1 text-center text-sm text-gray-500">
            For Get Password?{' '}
            <Link to="/forgetpassword" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Reset here
            </Link>
          </p>
        </div>
      </div>
  )
}

export default Login;
