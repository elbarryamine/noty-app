import React from 'react';
import HeaderNavigation from '@components/layouts/HeaderNavigation';
import TrashedNotes from '../notes/TrashedNotes';
import NotesSection from '../notes/NotesSection';
import TasksSection from '../notes/TasksSection';

const HomePage = () => {
  return (
    <main className='h-screen'>
      <div className='space-y-10 px-8 max-w-7xl mx-auto flex flex-col h-full pb-5'>
        <HeaderNavigation />
        <div className='flex-1 grid grid-cols-[300px_1fr] space-x-2 mx-auto'>
          <TrashedNotes />
          <div className='w-full flex flex-row h-full overflow-x-scroll scroll-list space-x-2'>
            <NotesSection />
            <TasksSection />
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
