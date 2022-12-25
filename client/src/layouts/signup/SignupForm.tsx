import React from 'react';
import { trpc } from '@shared/utils/trpc';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { useRouter } from 'next/router';

const userInput = z
  .object({
    email: z.string().email('Please provide a valid email'),
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 character')
      .max(18, 'First name must be at most 18 character'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 character')
      .max(18, 'Last name must be at most 18 character'),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({ code: 'custom', message: 'The passwords did not match', path: ['password'] });
      ctx.addIssue({ code: 'custom', message: 'The passwords did not match', path: ['passwordConfirm'] });
    }
  });
type User = typeof userInput._type;

const LoginForm = () => {
  const router = useRouter();
  const { mutate, isLoading, error } = trpc.user.sigunp.useMutation({
    onSuccess: () => router.push('/login'),
  });
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(userInput),
    defaultValues: { email: '', firstName: '', lastName: '', password: '', passwordConfirm: '' },
  });
  const handleSignup = (values: User) => {
    mutate({ ...values });
  };
  return (
    <form className='space-y-5 mx-auto flex-1 max-w-xl p-10 bg-slate-50 shadow-md rounded-md border-gray-200 border-[1px]'>
      <h1 className='text-2xl text-center'>Noty</h1>
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
          name='firstName'
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor='fname' className='label'>
                First Name
              </label>
              <input
                type='text'
                name='fname'
                id='fname'
                className='input'
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
          name='lastName'
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor='lname' className='label'>
                Last Name
              </label>
              <input
                id='lname'
                name='lname'
                type='text'
                className='input'
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
        <Controller
          control={control}
          name='passwordConfirm'
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor='passwordConfirm' className='label'>
                Password Confirm
              </label>
              <input
                type='password'
                id='passwordConfirm'
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
      <button className='btn' onClick={handleSubmit(handleSignup)}>
        {isLoading ? <span className='loader'></span> : 'Signup'}
      </button>
      <div>
        <Link href='/login'>
          <button disabled={isLoading} className='text-blue-700'>
            Already have an account?
          </button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
