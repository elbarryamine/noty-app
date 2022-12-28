import { trpc } from '@shared/utils/trpc/trpc';
import React, { Fragment, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import NoteCard from './NoteCard';

function TrashedNotes() {
  const { data, isLoading } = trpc.note.getTrash.useQuery();
  const [isTrashHidden, setIsTrashHidden] = useState(false);

  if (isTrashHidden)
    return (
      <div className='min-w-[300px] space-y-5 rounded-md p-2 overflow-y-scroll flex justify-end self-start'>
        <button className='flex space-x-2 items-center' onClick={() => setIsTrashHidden(!isTrashHidden)}>
          <p className='text-red-500 font-bold'>Open the trash</p>
          <FiTrash className='stroke-red-500 cursor-pointer' size='20px' />
        </button>
      </div>
    );
  return (
    <Fragment>
      <div className='min-w-[300px] space-y-5 rounded-md p-2 bg-red-100 overflow-y-scroll flex flex-col'>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-lg font-medium text-red-500'>Trash</h1>
            <FiTrash className='stroke-red-500' size='18px' />
          </div>

          <button onClick={() => setIsTrashHidden(!isTrashHidden)} className='primary-danger-button'>
            Hide Trash
          </button>
        </div>
        <Fragment>
          <div className='flex-1 shadow-sm'>
            {isLoading ? (
              <div className='h-full flex items-center justify-center'>
                <span className='loader-dark' />
              </div>
            ) : (
              <div className='h-full p-2 space-y-2'>
                {(data ?? []).map((el) => (
                  <NoteCard key={el.id} note={el} />
                ))}
              </div>
            )}
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}

export default TrashedNotes;
