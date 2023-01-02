import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { useUserStore } from '@store/user';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="login page" />
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
              name="email"
              render={({ field, fieldState }) => (
                <FormControl>
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
                <FormControl>
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
          </Stack>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
          <Button
            variant="primary"
            onClick={handleSubmit(handleLogin)}
            isLoading={isLoading}
          >
            Login
          </Button>
          <Link href="/signup">
            <Button variant="ghost" disabled={isLoading}>
              Dont have an account?
            </Button>
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default LoginForm;
