import React, { Fragment, useMemo } from 'react';
import NewNote from './NewNotePopup';
import { MdTaskAlt } from 'react-icons/md';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from './NoteCard';

function TasksSection() {
  const { data, isLoading } = trpc.note.get.useQuery();
  const notes = useMemo(() => data?.filter((el) => el.categorie === 'task') ?? [], [data]);

  return (
    <Fragment>
      <div className='min-w-[300px] space-y-5 rounded-md p-2 bg-white overflow-y-scroll flex flex-col'>
        <Fragment>
          <div className='flex items-center space-x-2'>
            <h1 className='text-lg font-medium'>Tasks</h1>
            <MdTaskAlt size='18px' />
          </div>
          <div className='space-y-2'>
            <NewNote isTask />
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

export default TasksSection;
