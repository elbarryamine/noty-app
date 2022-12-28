import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import AddNewNoteForm from './AddNewNoteForm';
import { FiFile } from 'react-icons/fi';

const NewNote = ({ isTask }: { isTask?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger
        onClick={onOpen}
        className='w-full min-h-[70px] rounded-md border-[3px] border-dashed group border-indigo-300 flex items-center justify-center hover:border-indigo-600'
        asChild
      >
        <div className='flex items-center space-x-2 '>
          <p className='group-hover:text-indigo-600 text-indigo-300'>Add new {isTask ? 'task' : 'note'}</p>
          <FiFile size='25px' className='group-hover:stroke-indigo-600 stroke-indigo-300 stroke-1' />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='bg-white border-gray-200 border-[1px] rounded-md w-[280px] md:w-[90%] md:mx-auto p-5 shadow-md'
          sideOffset={5}
        >
          <AddNewNoteForm onClose={onClose} isTask={isTask} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default NewNote;
