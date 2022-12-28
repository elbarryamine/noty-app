import React, { Fragment, useMemo } from 'react';
import NewNote from './NewNotePopup';
import { SlNote } from 'react-icons/sl';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from './NoteCard';

function NotesSection() {
  const { data, isLoading } = trpc.note.get.useQuery();
  const notes = useMemo(() => data?.filter((el) => el.categorie === 'note') ?? [], [data]);

  return (
    <Fragment>
      <div className='min-w-[300px] space-y-5 rounded-md p-2 bg-white overflow-y-scroll flex flex-col'>
        <Fragment>
          <div className='flex items-center space-x-2'>
            <h1 className='text-lg font-medium'>Notes</h1>
            <SlNote size='18px' />
          </div>
          <div className='space-y-2'>
            <NewNote />
          </div>
        </Fragment>
        <Fragment>
          <div className='flex-1 shadow-sm'>
            {isLoading ? (
              <div className='h-full flex items-center justify-center'>
                <span className='loader-dark' />
              </div>
            ) : (
              <div className='h-full p-2 space-y-2'>
                {notes.map((el) => (
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

export default NotesSection;
