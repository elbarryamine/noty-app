import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { NoteResponse } from '@shared/utils/trpc/types';
import { Button } from '@chakra-ui/button';
import * as hexContrastColor from 'hex-contrast-color';

const NoteDelete = ({ note }: { note: NoteResponse[number] }) => {
  const invertedColor = hexContrastColor(note.color);
  const queryClient = useQueryClient();
  const moveToTrash = trpc.note.trash.useMutation({
    onSuccess: () => {
      queryClient.setQueryData<NoteResponse>(trpc.note.get.getQueryKey(), (data) =>
        (data ?? []).filter((el) => el.id !== note.id)
      );
      queryClient.invalidateQueries(trpc.note.get.getQueryKey());
      queryClient.invalidateQueries(trpc.note.getTrash.getQueryKey());
    },
  });
  const deleteNote = trpc.note.delete.useMutation({
    onSuccess: () => {
      queryClient.setQueryData<NoteResponse>(trpc.note.getTrash.getQueryKey(), (data) =>
        (data ?? []).filter((el) => el.id !== note.id)
      );
      queryClient.invalidateQueries(trpc.note.getTrash.getQueryKey());
    },
  });

  const handleDelete = () => {
    if (note.isTrashed) {
      deleteNote.mutate({ id: note.id });
    } else {
      moveToTrash.mutate({ id: note.id });
    }
  };
  return (
    <Button variant='ghost' color={invertedColor} fontWeight='900' onClick={handleDelete}>
      {note.isTrashed ? 'Delete Permanently' : 'Delete'}
    </Button>
  );
};

export default NoteDelete;
