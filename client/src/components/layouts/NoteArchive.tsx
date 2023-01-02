import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import {
  FolderGetByIdResponse,
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
      queryClient.setQueryData<NoteGetResponse>(
        trpc.note.get.getQueryKey({ limit: 10 }),
        (data) => [
          ...(data ?? []).filter((el) => el.id !== note.id),
          { ...note, isArchived: !note.isArchived },
        ],
      );
      queryClient.setQueryData<FolderGetByIdResponse>(
        trpc.folder.getById.getQueryKey({ id: note.folderId }),
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
      queryClient.invalidateQueries(trpc.note.get.getQueryKey({ limit: 10 }));
      queryClient.invalidateQueries(trpc.note.getFavorite.getQueryKey());
      queryClient.invalidateQueries(
        trpc.folder.getById.getQueryKey({ id: note.folderId }),
      );
    },
  });

  const handleArchive = () => {
    archive.mutate({ id: note.id, isArchived: !note.isArchived });
  };
  return (
    <Button
      variant="unstyled"
      w="30px"
      h="30px"
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
        <Icon fill="black" as={AiOutlineHeart} />
      )}
    </Button>
  );
};

export default NoteArchive;
