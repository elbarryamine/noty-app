import React from 'react';
import { trpc } from '@shared/utils/trpc';
import { NoteResponse } from '@shared/utils/trpc/types';
import { useQueryClient } from '@tanstack/react-query';

const NoteRestore = ({ note }: { note: NoteResponse[number] }) => {
  const queryClient = useQueryClient();
  const { mutate } = trpc.note.trash.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.note.get.getQueryKey());
      queryClient.invalidateQueries(trpc.note.getTrash.getQueryKey());
    },
  });

  const handleRestore = () => {
    mutate({ id: note.id, isRestore: true });
  };
  return (
    <>
      {note.isTrashed && (
        <button
          onClick={handleRestore}
          className='primary-button outline-none hover:outline-none opacity-0 group-hover:opacity-100 transition-all ease-in-out delay-150'
        >
          Restore
        </button>
      )}
    </>
  );
};

export default NoteRestore;
