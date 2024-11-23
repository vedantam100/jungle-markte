import React from 'react'
import Signup from '../features/auth/component/Signup'
import Navbar from '../features/navbar/Navbar'


function SignupPage() {
  return (
    <div>
       
       <Navbar >
        <Signup />
       </Navbar>

    </div>
  )
}

export default SignupPage