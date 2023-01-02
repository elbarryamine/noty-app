import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { NoteGetResponse } from '@shared/utils/trpc/types';
import { ButtonProps } from '@chakra-ui/button';
import * as hexContrastColor from 'hex-contrast-color';
import { MenuItem, Text } from '@chakra-ui/react';

const NoteDelete = ({
  note,
  ...props
}: { note: NoteGetResponse[number] } & ButtonProps) => {
  const invertedColor = hexContrastColor(note.color);
  const queryClient = useQueryClient();
  const moveToTrash = trpc.note.trash.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(
        trpc.folder.getById.getQueryKey({ id: note.folderId }),
      );
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
    <MenuItem variant="unstyled" onClick={handleDelete} {...props}>
      <Text fontWeight={400} color={invertedColor}>
        {note.isTrashed ? 'Delete Permanently' : 'Delete'}
      </Text>
    </MenuItem>
  );
};

export default NoteDelete;
