import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@shared/utils/trpc/trpc';
import { NoteCreateInput } from '@shared/utils/trpc/types';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import * as hexContrastColor from 'hex-contrast-color';

const noteCreateSchema = z
  .object({
    text: z.string(),
    title: z.string(),
    color: z.string().min(1, 'Please select a valid color'),
    folderId: z.string().min(1, 'folderId is required'),
  })
  .superRefine(({ text, title }, ctx) => {
    if (!text && !title) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please please provide either the title or the content',
        path: ['title'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Please please provide either the title or the content',
        path: ['text'],
      });
    }
  });

const AddNewNoteForm = ({
  folderId,
  onClose,
  isTask = false,
}: {
  folderId: string;
  onClose?: () => void;
  isTask?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = trpc.note.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(
        trpc.folder.getById.getQueryKey({ id: folderId }),
      );
      onClose && onClose();
    },
  });

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(noteCreateSchema),
    defaultValues: {
      title: '',
      text: '',
      color: '#FFFFFF',
      folderId: folderId,
    },
  });
  const handleCreateNote = (values: NoteCreateInput) => {
    mutate(values);
  };

  useEffect(() => {
    setValue('folderId', folderId);
  }, [folderId]);
  return (
    <Stack
      spacing={5}
      p="10px"
      borderColor="border"
      borderWidth="1px"
      bg="card"
      borderRadius="md"
      shadow="md"
    >
      <Flex justify="space-between" align="center">
        <Text variant="subheader">Add new form</Text>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
      <Stack>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={Boolean(fieldState.error)}>
              <FormLabel>{isTask ? 'Task' : 'Note'} title</FormLabel>
              <Input
                id="note"
                type="text"
                placeholder={
                  isTask ? 'Work on Noty project' : 'Take out the dog ????'
                }
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
          name="text"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={Boolean(fieldState.error)}>
              <FormLabel>{isTask ? 'Task' : 'Note'} body</FormLabel>
              <Textarea
                placeholder={
                  isTask
                    ? 'Add new features to Noty project'
                    : 'Take my dog to the park its been too long since i walked him'
                }
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
          name="color"
          render={({ field, fieldState }) => (
            <FormControl isInvalid>
              <Flex justify="space-between" align="center">
                <FormLabel flex="1">Note Color</FormLabel>
                <Box
                  borderWidth="1px"
                  borderColor={hexContrastColor(field.value)}
                  style={{ background: field.value }}
                  borderRadius="10px"
                >
                  <Input
                    cursor="pointer"
                    opacity="0"
                    maxW="50%"
                    type="color"
                    placeholder="Take my dog to the park its been too long since i walked him"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Box>
              </Flex>
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
              <Text variant="sub">
                Note color will be determined automaticly based on background
                color
              </Text>
            </FormControl>
          )}
        />
        <FormControl isInvalid={isError}>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          variant="primary"
          onClick={handleSubmit(handleCreateNote)}
        >
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddNewNoteForm;
