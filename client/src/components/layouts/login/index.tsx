import * as Toast from '@radix-ui/react-toast';
import React, { useState } from 'react';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const [isToastOpen, setIsToastOpen] = useState(true);
  return (
    <main className='bg-gray-50 min-h-screen flex items-center justify-center'>
      <LoginForm />
      <Toast.Provider duration={30000} swipeDirection='right'>
        <Toast.Root className='ToastRoot' open={isToastOpen} onOpenChange={setIsToastOpen}>
          <Toast.Title className='text-2xl font-bold mb-3 text-indigo-600'>Reminder</Toast.Title>
          <Toast.Description asChild>
            <div className='text-sm space-y-2 text-gray-700'>
              <p>
                I'm using a trial cloud hosting tier, which puts my app's api to sleep after a period of inactivity.
              </p>
              <p>
                Because of that the initial request can take a while. but you won't see any further delays after it.
              </p>
            </div>
          </Toast.Description>
          <Toast.Action className='ToastAction' asChild altText='Goto schedule to undo'>
            <div className='flex items-start h-full'>
              <button className='primary-button'>Undo</button>
            </div>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className='ToastViewport' />
      </Toast.Provider>
    </main>
  );
};

export default LoginPage;
