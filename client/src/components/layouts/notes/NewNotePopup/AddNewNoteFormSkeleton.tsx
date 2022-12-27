import React from 'react';

function AddNewNoteFormSkeleton() {
  return (
    <div className='space-y-5 animate-pulse'>
      <div className='flex justify-between'>
        <div className='skeleton h-3 w-[50%]' />
        <div className='skeleton h-3 w-[20%]' />
      </div>
      <div className='space-y-2'>
        <fieldset>
          <label className='label'>
            <div className='skeleton h-3 w-[20%]' />
          </label>
          <input className='input skeleton' disabled />
        </fieldset>
        <fieldset>
          <label className='label'>
            <div className='skeleton h-3 w-[20%]' />
          </label>
          <input className='input skeleton h-[62px]' disabled />
        </fieldset>
        <section className='space-y-3'>
          <div className='flex items-center justify-between w-full'>
            <div className='skeleton h-3 w-[20%]' />
            <div className='skeleton h-3 w-3' />
          </div>
          <div className='skeleton h-2 w-[100%]' />
          <div className='skeleton h-2 w-[40%]' />
        </section>
        <button className='skeleton-button ml-auto'>
          <div className='h-2 w-[40px]' />
        </button>
      </div>
    </div>
  );
}

export default AddNewNoteFormSkeleton;
