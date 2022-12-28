import React from 'react';
import HeaderNavigation from '@components/layouts/HeaderNavigation';
import dynamic from 'next/dynamic';
const TrashedNotes = dynamic(() => import('../notes/TrashedNotes'));
const NotesSection = dynamic(() => import('../notes/NotesSection'));
// const TasksSection = dynamic(() => import('../notes/TasksSection'));
// import TrashedNotes from '../notes/TrashedNotes';
// import NotesSection from '../notes/NotesSection';
// import TasksSection from '../notes/TasksSection';

const HomePage = () => {
  return (
    <main className='h-screen'>
      <div className='space-y-10 px-8 max-w-7xl mx-auto flex flex-col h-full pb-5'>
        <HeaderNavigation />
        <div className='w-full flex flex-row h-full overflow-x-scroll scroll-list space-x-2'>
          <div className='flex-1 grid grid-cols-[2fr_1fr] space-x-2 mx-auto'>
            <NotesSection />
            <TrashedNotes />
          </div>
        </div>
      </div>
    </main>
  );
};
{
  /* <Fragment>
<button className='min-w-[290px] h-full border-dashed group rounded-md border-[3px] flex items-center justify-center group border-indigo-300 hover:border-indigo-600'>
<p className='text-indigo-300 group-hover:text-indigo-600'>Add New Section</p>
</button>
</Fragment> */
}

export default HomePage;
