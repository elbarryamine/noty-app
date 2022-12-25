import Link from 'next/link';
import React from 'react';

const LoginForm = () => {
  return (
    <form
      className='space-y-5 mx-auto flex-1 max-w-xl p-10 bg-slate-50 shadow-md rounded-md border-gray-200 border-[1px]'
      method='POST'
    >
      <h1 className='text-2xl text-center'>Noty</h1>
      <div className='space-y-2'>
        <div>
          <label htmlFor='email' className='label'>
            Email
          </label>
          <input type='email' id='email' className='input' required />
        </div>

        <div>
          <label htmlFor='password' className='label'>
            Password
          </label>
          <input type='password' id='password' className='input' required />
        </div>
      </div>
      <button className='btn'>Login</button>
      <div>
        <Link href='/signup'>
          <button className='text-blue-700'>Dont have an account?</button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
