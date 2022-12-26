import HeaderNavigation from '@components/layouts/HeaderNavigation';
import { trpc } from '@shared/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import NoteDelete from './NoteDelete';

const HomePage = () => {
  const queryClient = useQueryClient();
  const noteGet = trpc.note.get.useQuery();
  const noteCreate = trpc.note.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.note.get.getQueryKey());
    },
  });
  return (
    <main>
      <div className='space-y-10 px-8 max-w-7xl mx-auto'>
        <HeaderNavigation />
        <div className='flex flex-row justify-between items-center '>
          <h1 className='text-5xl'>Noties</h1>
          <button
            className='primary-button'
            onClick={() => {
              noteCreate.mutate({ name: 'hi' });
            }}
          >
            Create A Noty
          </button>
        </div>
        {noteGet.isError && <div className='error-message'>{noteGet.error.message}</div>}
        {noteGet.isFetching ? (
          <div className='flex py-40 items-center justify-center'>
            <div className='loader-dark' />
          </div>
        ) : (
          <div className='flex flex-row flex-wrap -mx-5'>
            {noteGet.data?.map((note) => (
              <div key={note.id} className='w-1/3 mb-5 min-w-[300px]'>
                <div key={note.id} className='py-2 px-5 bg-gray-200 text-black rounded-md space-y-2 mx-4'>
                  <div className='flex justify-between items-center'>
                    <h2 className='primary-subheader'>{note.title}</h2>
                    <NoteDelete noteId={note.id} />
                  </div>
                  <p>{note.text}</p>
                  <p>{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
