import { NoteResponse } from '@shared/utils/trpc/types';
import React from 'react';

export default function NoteCard({ note }: { note: NoteResponse[number] }) {
  return (
    <div className='w-full p-5 rounded-md shadow-sm' style={{ background: note.color }}>
      <div className='space-y-2'>
        <h3 className='text-xl font-bold'>{note.title}</h3>
        <h3 className=''>{note.text}</h3>
      </div>
    </div>
  );
}
