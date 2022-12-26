import HeaderNavigation from '@components/layouts/HeaderNavigation';
import Preloader from '@components/layouts/Preloader';
import { trpc } from '@shared/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const HomePage = () => {
  const queryClient = useQueryClient();
  const noteGet = trpc.note.get.useQuery();
  const noteCreate = trpc.note.create.useMutation();
  return (
    <main>
      <HeaderNavigation />
      <div className='h-10' />
      <div className='space-y-5 px-8'>
        <div className='flex flex-row justify-between items-center '>
          <h1 className='text-5xl'>Noties</h1>
          <button
            className='primary-button'
            onClick={() => {
              noteCreate.mutate({ name: 'hi' });
              queryClient.invalidateQueries(trpc.note.getQueryKey());
            }}
          >
            Create A Noty
          </button>
        </div>
        {noteGet.isFetching ? (
          <Preloader />
        ) : (
          <div className='flex flex-row flex-wrap -mx-5 '>
            {noteGet.data?.map((note) => (
              <div key={note.id} className='w-1/3 mb-5'>
                <div key={note.id} className='py-2 px-5 bg-black text-white rounded-md space-y-2 mx-4'>
                  <h2 className='primary-subheader'>{note.title}</h2>
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
