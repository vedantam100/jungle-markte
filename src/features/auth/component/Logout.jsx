import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogOutUserAsync, selectCheckUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

function Logout() {
    const dispatch = useDispatch()

    const user = useSelector(selectCheckUser)
    useEffect(() => {
      dispatch(LogOutUserAsync(user.id))
    }, [])
    
  if(user==null){
    return (
        <div>
            <Navigate to={"/"}/>
        </div>
      )
  }
}

export default Logout