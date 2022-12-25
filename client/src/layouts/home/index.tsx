import { trpc } from '@shared/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const HomePage = () => {
  const queryClient = useQueryClient();
  const note = trpc.note.get.useQuery();
  const { mutate } = trpc.note.create.useMutation();
  return (
    <div>
      {note.data?.map((n) => (
        <div>{n.title}</div>
      ))}
      <button
        className='btn'
        onClick={() => {
          mutate({ name: 'hi' });
          queryClient.invalidateQueries(trpc.note.getQueryKey());
        }}
      >
        Create Note
      </button>
    </div>
  );
};

export default HomePage;
