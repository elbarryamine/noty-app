import React, { Fragment } from 'react';
import { FiTrash } from 'react-icons/fi';

function TrashedNotes() {
  return (
    <Fragment>
      <div className='space-y-5 rounded-md p-2 bg-red-50 flex flex-col'>
        <div className='flex items-center space-x-2'>
          <h1 className='text-lg font-medium text-red-500'>Trash</h1>
          <FiTrash className='stroke-red-500' size='18px' />
        </div>
        <div className='flex items-center justify-center flex-1'>
          <p className='text-red-500 font-bold'>Trash is empty</p>
        </div>
      </div>
    </Fragment>
  );
}

export default TrashedNotes;
