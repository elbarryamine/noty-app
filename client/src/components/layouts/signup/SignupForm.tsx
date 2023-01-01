import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { useRouter } from 'next/router';
import { Heading, Stack } from '@chakra-ui/layout';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

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
    <Stack
      as='form'
      spacing={5}
      mx='auto'
      flex='1'
      maxW='xl'
      p='20px'
      bg='card'
      shadow='md'
      borderRadius='10px'
      borderColor='border'
      borderWidth='1px'
    >
      <Heading>Noty</Heading>
      <Stack spacing={2}>
        <Controller
          control={control}
          name='firstName'
          render={({ field, fieldState }) => (
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type='text'
                name='firstname'
                id='firstname'
                required
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type='text'
                name='lastname'
                id='lastname'
                required
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                name='email'
                id='email'
                required
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                type='password'
                id='password'
                required
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='passwordConfirm'
          render={({ field, fieldState }) => (
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                id='password'
                required
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </Stack>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
      <Button variant='primary' onClick={handleSubmit(handleSignup)} isLoading={isLoading}>
        Login
      </Button>
      <Link href='/login'>
        <Button variant='ghost' disabled={isLoading}>
          Already have an account?
        </Button>
      </Link>
    </Stack>
  );
};

export default LoginForm;
