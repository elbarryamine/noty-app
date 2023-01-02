import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { useRouter } from 'next/router';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import Head from 'next/head';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please provide a valid email'),
    firstName: z
      .string()
      .min(3, 'First name must be at least 3 character')
      .max(18, 'First name must be at most 18 character'),
    lastName: z
      .string()
      .min(3, 'Last name must be at least 3 character')
      .max(18, 'Last name must be at most 18 character'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirm: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['password'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['passwordConfirm'],
      });
    }
  });
type User = typeof signupSchema._type;

const LoginForm = () => {
  const router = useRouter();
  const { mutate, isLoading, error, isError } = trpc.user.sigunp.useMutation({
    onSuccess: () => router.push('/login'),
  });
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const handleSignup = (values: User) => {
    mutate({ ...values });
  };
  return (
    <>
      <Head>
        <title>Signup Page</title>
        <meta name="description" content="signup page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        as="main"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          as="form"
          spacing={5}
          mx="auto"
          flex="1"
          maxW="xl"
          p="20px"
          bg="card"
          shadow="md"
          borderRadius="10px"
          borderColor="border"
          borderWidth="1px"
        >
          <Heading>Noty</Heading>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={!!fieldState.error}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    id="firstname"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={!!fieldState.error}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={!!fieldState.error}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={!!fieldState.error}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={!!fieldState.error}>
                  <FormLabel>Pssword Confirm</FormLabel>
                  <Input
                    type="password"
                    id="passwordConfirm"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
          </Stack>
          <FormControl isInvalid={isError}>
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
          <Button
            variant="primary"
            onClick={handleSubmit(handleSignup)}
            isLoading={isLoading}
          >
            Signup
          </Button>
          <Link href="/login">
            <Button variant="ghost" disabled={isLoading}>
              Already have an account?
            </Button>
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default LoginForm;
