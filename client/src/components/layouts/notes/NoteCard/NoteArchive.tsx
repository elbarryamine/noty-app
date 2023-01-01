import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import {
  CategoryGetByIdResponse,
  NoteGetResponse,
} from '@shared/utils/trpc/types';
import { Button } from '@chakra-ui/button';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Icon } from '@chakra-ui/icon';

const NoteArchive = ({ note }: { note: NoteGetResponse[number] }) => {
  const queryClient = useQueryClient();
  const archive = trpc.note.archive.useMutation({
    onMutate: () => {
      queryClient.setQueryData<NoteGetResponse>(
        trpc.note.getFavorite.getQueryKey(),
        (data) => [
          ...(data ?? []).filter((el) => el.id !== note.id),
          { ...note, isArchived: !note.isArchived },
        ],
      );
      queryClient.setQueryData<CategoryGetByIdResponse>(
        trpc.category.getById.getQueryKey({ id: note.categoryId }),
        (data) => {
          if (!data) return data;
          const notes = [
            ...(data?.notes ?? []).filter((el) => el.id !== note.id),
            { ...note, isArchived: !note.isArchived },
          ];
          return { ...data, notes: notes };
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.note.getFavorite.getQueryKey());
      queryClient.invalidateQueries(
        trpc.category.getById.getQueryKey({ id: note.categoryId }),
      );
    },
  });

  const handleArchive = () => {
    archive.mutate({ id: note.id, isArchived: !note.isArchived });
  };
  return (
    <Button
      variant="primary"
      w="40px"
      h="40px"
      borderRadius="full"
      p="0"
      m="0"
      fontWeight="900"
      onClick={handleArchive}
      isLoading={archive.isLoading}
      ml="auto"
    >
      {note.isArchived ? (
        <Icon fill="red.500" as={AiFillHeart} />
      ) : (
        <Icon fill="white" as={AiOutlineHeart} />
      )}
    </Button>
  );
};

export default NoteArchive;
