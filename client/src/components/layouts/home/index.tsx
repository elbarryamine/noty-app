import HeaderNavigation from '@components/layouts/HeaderNavigation';
import { trpc } from '@shared/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import React, { Fragment } from 'react';
import NewNote from './NewNotePopup';
import { CiStickyNote } from 'react-icons/ci';
import { MdTaskAlt } from 'react-icons/md';
import TrashedNotes from './TrashedNotes';

const HomePage = () => {
  const queryClient = useQueryClient();
  const noteGet = trpc.note.get.useQuery();

  return (
    <main className='h-screen'>
      <div className='space-y-10 px-8 max-w-7xl mx-auto flex flex-col h-full pb-5'>
        <HeaderNavigation />
        <div className='flex-1 grid grid-cols-[300px_1fr] space-x-2 mx-auto'>
          <TrashedNotes />
          <div className='w-full flex flex-row h-full overflow-x-scroll scroll-list space-x-2'>
            <Fragment>
              <div className='min-w-[300px] space-y-5 rounded-md p-2 bg-white'>
                <div className='flex items-center space-x-2'>
                  <h1 className='text-lg font-medium'>Notes</h1>
                  <CiStickyNote size='18px' />
                </div>
                <div className='space-y-2'>
                  <NewNote />
                </div>
              </div>
            </Fragment>
            <Fragment>
              <div className='min-w-[300px] space-y-5 rounded-md p-2 bg-white'>
                <div className='flex items-center space-x-2'>
                  <h1 className='text-lg font-medium'>Tasks</h1>
                  <MdTaskAlt size='18px' />
                </div>
                <div className='space-y-2 flex'>
                  <NewNote isTask />
                </div>
              </div>
            </Fragment>

            {/* <Fragment>
              <button className='min-w-[290px] h-full border-dashed group rounded-md border-[3px] flex items-center justify-center group border-indigo-300 hover:border-indigo-600'>
                <p className='text-indigo-300 group-hover:text-indigo-600'>Add New Section</p>
              </button>
            </Fragment> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
