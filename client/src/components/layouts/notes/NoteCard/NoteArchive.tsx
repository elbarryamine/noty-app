import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { NoteGetResponse } from '@shared/utils/trpc/types';
import { Button } from '@chakra-ui/button';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Icon } from '@chakra-ui/icon';

const NoteArchive = ({
  note,
  onArchive,
}: {
  note: NoteGetResponse[number];
  onArchive: (archived: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const archive = trpc.note.archive.useMutation({
    onSuccess: (res) => {
      onArchive(res.note.isArchived);
      queryClient.invalidateQueries(trpc.note.getFavorite.getQueryKey());
      queryClient.setQueryData<NoteGetResponse>(trpc.note.get.getQueryKey(), (data) => [
        ...(data ?? []).filter((el) => el.id !== note.id),
        { ...note, isArchived: res.note.isArchived },
      ]);
    },
  });

  const handleArchive = () => {
    archive.mutate({ id: note.id, isArchived: !note.isArchived });
  };
  return (
    <Button
      variant='primary'
      w='40px'
      h='40px'
      borderRadius='full'
      p='0'
      m='0'
      fontWeight='900'
      onClick={handleArchive}
      isLoading={archive.isLoading}
      ml='auto'
    >
      {note.isArchived ? <Icon fill='red.500' as={AiFillHeart} /> : <Icon fill='white' as={AiOutlineHeart} />}
    </Button>
  );
};

export default NoteArchive;
