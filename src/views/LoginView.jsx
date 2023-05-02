import React from 'react'
import LoginForms from '../components/LoginForms'

const LoginView = () => {
  return (
    <>
      <div className='bg-login'>
        <div className='flex flex-row items-center h-full'>
          <LoginForms />
        </div>
      </div>
    </>
  )
}

export default LoginView