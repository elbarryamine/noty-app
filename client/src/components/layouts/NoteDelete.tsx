import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { NoteGetResponse } from '@shared/utils/trpc/types';
import { MenuItem } from '@chakra-ui/react';

const NoteDelete = ({ note }: { note: NoteGetResponse[number] }) => {
  const queryClient = useQueryClient();
  const moveToTrash = trpc.note.trash.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(
        trpc.folder.getById.getQueryKey({ id: note.folderId }),
      );
      queryClient.invalidateQueries(trpc.note.get.getQueryKey({ limit: 10 }));
      queryClient.invalidateQueries(trpc.note.getFavorite.getQueryKey());
      queryClient.invalidateQueries(trpc.note.getTrash.getQueryKey());
    },
  });
  const deleteNote = trpc.note.delete.useMutation({
    onSuccess: () => {
      queryClient.setQueryData<NoteGetResponse>(
        trpc.note.getTrash.getQueryKey(),
        (data) => (data ?? []).filter((el) => el.id !== note.id),
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
    <MenuItem onClick={handleDelete} color="red.600">
      {note.isTrashed ? 'Delete Permanently' : 'Delete'}
    </MenuItem>
  );
};

export default NoteDelete;
