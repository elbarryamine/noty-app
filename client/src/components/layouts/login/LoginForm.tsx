import React from 'react';
import { trpc } from '@shared/utils/trpc';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { useUserStore } from '@store/user';

const userInput = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string(),
});

type User = typeof userInput._type;

const LoginForm = () => {
  const setToken = useUserStore((state) => state.setToken);
  const { mutate, isLoading, error } = trpc.user.login.useMutation({
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(userInput),
    defaultValues: { email: '', password: '' },
  });
  const handleLogin = (values: User) => {
    mutate({ ...values });
  };
  return (
    <form className='space-y-5 mx-auto flex-1 max-w-xl p-10 bg-slate-50 shadow-md rounded-md border-gray-200 border-[1px]'>
      <h1 className='primary-header-display text-center'>Noty</h1>
      <div className='space-y-2'>
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor='email' className='label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='input'
                required
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <div className='error-message'>{fieldState.error?.message}</div>
            </div>
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor='password' className='label'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='input'
                required
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <div className='error-message'>{fieldState.error?.message}</div>
            </div>
          )}
        />
      </div>
      <div className='error-message'>{error?.message}</div>
      <button className='primary-button' onClick={handleSubmit(handleLogin)}>
        {isLoading ? <span className='loader'></span> : 'Login'}
      </button>
      <div>
        <Link href='/signup'>
          <button disabled={isLoading} className='text-blue-700'>
            Dont have an account?
          </button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;