import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { NoteResponse } from '@shared/utils/trpc/types';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const NoteDelete = ({ note }: { note: NoteResponse[number] }) => {
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
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className='primary-danger-button-ghost outline-none hover:outline-none opacity-0 group-hover:opacity-100 transition-all ease-in-out delay-150'>
          Delete {note.isTrashed ? 'Permanently' : ''}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='AlertDialogOverlay' />
        <AlertDialog.Content className='AlertDialogContent'>
          <AlertDialog.Title className='AlertDialogTitle'>
            {note.isTrashed ? 'Delete Note Permanently' : 'Move note to trash'}
          </AlertDialog.Title>
          {note.isTrashed && (
            <AlertDialog.Description className='AlertDialogDescription'>
              Are you sure you want to delete note ?
            </AlertDialog.Description>
          )}
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button type={undefined} className=''>
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button type={undefined} className='primary-danger-button' onClick={handleDelete}>
                {note.isTrashed ? 'Yes delete note permanently' : 'Yes move note to trash'}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default NoteDelete;
