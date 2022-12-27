import React from 'react';
import { trpc } from '@shared/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { NoteGet } from '@shared/utils/trpc/types';

const NoteDelete = ({ noteId }: { noteId: number }) => {
  const query = useQueryClient();
  const noteDelete = trpc.note.delete.useMutation({
    onMutate: () => {
      // optimistic update
      query.setQueryData(trpc.note.get.getQueryKey(), (data) =>
        ((data ?? []) as NoteGet).filter((el) => el.id === noteId)
      );
    },
    onSuccess: () => {
      query.invalidateQueries(trpc.note.get.getQueryKey());
    },
  });

  return (
    <button className='primary-button' onClick={() => noteDelete.mutate({ id: noteId })}>
      delete
    </button>
  );
};

export default NoteDelete;
