import { SignIn, useUser } from '@clerk/react';

const Login = () => {
  return (
    <div className='w-full h-[95vh] flex items-center justify-center'>
       <SignIn />
    </div>
  )
}

export default Login
