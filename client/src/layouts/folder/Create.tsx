import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  Input,
  Stack,
  Icon,
  Grid,
  SlideFade,
  Box,
  HStack,
} from '@chakra-ui/react';
import BaseContainer from '@components/containers/BaseContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { appIcons } from '@shared/constants/icons';
import useBreakpoints from '@shared/hooks/useBreakpoints';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IconType } from 'react-icons';
import z from 'zod';

const folderCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Folder name must be more than 3 letters')
    .max(255, 'Folder name must be less than 255 letters'),
});

type Folder = typeof folderCreateSchema._type;

export default function Create() {
  const { ltmd, ltlg } = useBreakpoints();
  const [search, setSearch] = useState('');
  const [icon, setIcon] = useState<{
    icon: IconType;
    name: string;
  }>({ icon: () => <></>, name: '' });
  const router = useRouter();
  const query = useQueryClient();
  const folderCreate = trpc.folder.create.useMutation({
    onSuccess: (res) => {
      query.invalidateQueries(trpc.folder.get.getQueryKey());
      router.push(`/folder/${res.id}`);
    },
  });
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(folderCreateSchema),
    defaultValues: { name: '' },
  });
  const handleSaveFolder = (values: Folder) => {
    folderCreate.mutate({ name: values.name, icon: icon.name });
  };
  return (
    <BaseContainer>
      <Stack>
        <Flex align="center" justify="space-between" flexDir="row" gap={2}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <FormControl isInvalid={!!fieldState.error}>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  variant="unstyled"
                  fontSize="7xl"
                  placeholder="Write your folder's name ..."
                  _placeholder={{ color: 'blackAlpha.200' }}
                />
                <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
          <Button
            variant="primary"
            isLoading={folderCreate.isLoading}
            isDisabled={folderCreate.isLoading}
            onClick={handleSubmit(handleSaveFolder)}
          >
            Create folder
          </Button>
        </Flex>

        <FormControl isInvalid={folderCreate.isError}>
          {folderCreate?.error instanceof TRPCClientError && (
            <FormErrorMessage>{folderCreate.error.message}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      <Stack spacing={5} w="full">
        <Text variant="display">Folder's icon</Text>
        <HStack spacing={3}>
          <Stack>
            <Input
              placeholder="Search for icon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Grid
              templateColumns={
                ltmd
                  ? 'repeat(5,1fr)'
                  : ltlg
                  ? 'repeat(10,1fr)'
                  : 'repeat(15,1fr)'
              }
              gridGap="10px"
              position="relative"
            >
              {appIcons
                .filter((el) =>
                  el.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((el) => (
                  <Button
                    key={el.name}
                    variant="unstyled"
                    borderWidth={el.name === icon.name ? '2px' : '0'}
                    borderColor="primary"
                    borderStyle="dashed"
                    onClick={() => setIcon(el)}
                  >
                    <Icon
                      strokeWidth="0.8px"
                      height="30px"
                      width="30px"
                      as={el.icon}
                    />
                  </Button>
                ))}
            </Grid>
          </Stack>
          <Box w="40px" />
          <Flex justify="center" pt="5%" flex="1" h="100%">
            <SlideFade in={true} delay={0.5} offsetX="-30px">
              <Flex justify="center" align="center">
                <Stack alignItems="center">
                  <Text textAlign="center" fontSize={ltmd ? 'body' : 'display'}>
                    {icon.name.replace('Fi', '')}
                  </Text>
                  <Icon
                    strokeWidth="0.8px"
                    height={ltmd ? '80px' : '200px'}
                    width={ltmd ? '80px' : '200px'}
                    as={icon.icon}
                  />
                </Stack>
              </Flex>
            </SlideFade>
          </Flex>
        </HStack>
      </Stack>
    </BaseContainer>
  );
}
